import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { join } from 'path';
import { UserModule } from '@modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { SignupInput } from '@modules/auth/dto/sign-up.input';
import { AuthModule } from '@modules/auth/auth.module';
import { EmailScalar } from '@src/scalars/email.scalar';

describe('Users (e2e)', () => {
  let app: INestApplication;
  const host = process.env.DATABASE_HOST || 'localhost';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AuthModule,
        MongooseModule.forRoot(`mongodb://${host}/nestgraphqltesting`),
        GraphQLModule.forRoot({
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          path: '/graphql/api',
          context: ({ req, res }) => ({ req, res }),
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
            outputAs: 'interface',
          },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const user: SignupInput = {
    email: 'test@test.com' as unknown as EmailScalar,
    password: '!somepassword123!',
    firstName: 'Jo-Ries',
    lastName: 'Canino',
  };

  const signupQuery = `
    mutation {
      signup(user: {
        email: "${user.email}",
        password: "${user.password}",
        firstName: "${user.firstName}",
        lastName: "${user.lastName}"
      }) {
        email,
        token
      }
    }
  `;

  it('signup', () => {
    return request(app.getHttpServer())
      .post('/graphql/api')
      .send({
        operationName: null,
        query: signupQuery,
      })
      .expect(({ body }) => {
        const data = body.data.signup;
        expect(data.email).toBe(user.email);
        expect(data.token).not.toBeNull();
      })
      .expect(200);
  });
});
