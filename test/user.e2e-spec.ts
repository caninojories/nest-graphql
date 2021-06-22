import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserModule } from '@modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { InsertUserInput } from '@modules/user/dto/insert-user.input';
import { AuthModule } from '../src/modules/auth/auth.module';
import { EmailScalar } from '@src/scalars/email.scalar';

describe('Users (e2e)', () => {
  let app;
  const host = process.env.DATABASE_HOST || 'localhost';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AuthModule,
        MongooseModule.forRoot(`mongodb://${host}/nestgraphqltesting`),
        GraphQLModule.forRoot({
          typePaths: ['./**/*.graphql'],
          context: ({ req }) => ({ req }),
          playground: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const user: InsertUserInput = {
    email: 'test@test.com' as unknown as EmailScalar,
    password: '!somepassword123!',
    firstName: 'Jo-Ries',
    lastName: 'Canino',
  };

  const createUserQuery = `
    mutation{
        register(email: "${user.email}", password: "${user.password}"){
          email,
          token
        }
      }
  `;

  it('register', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createUserQuery,
      })
      .expect(({ body }) => {
        const data = body.data.register;
        expect(data.email).toBe(user.email);
        expect(data.token).not.toBeNull();
      })
      .expect(200);
  });
});
