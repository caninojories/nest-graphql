import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { DatabaseModule } from '@modules/database/database.module';
import { UserService } from '@modules/user/user.service';
import { AuthService } from '@modules/auth/auth.service';
import { ContactModel, UserModel } from '@models';
import { ListFindManyService } from './seeder.service';
import { TestE2EServer } from '../../test-e2e.server';
import { AuthenticatedUserService } from '../authenticated-user.service';

describe('[List] FindManyResolver', () => {
  let fixtureModule: TestingModule;
  let listFindManyService: ListFindManyService;
  let authenticatedUserService: AuthenticatedUserService;
  let authService: AuthService;
  let user: UserModel;
  let contacts: ContactModel[];
  let token: string;
  let App: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const { moduleFixture, app } = await TestE2EServer({
      imports: [DatabaseModule],
      providers: [ListFindManyService, UserService, AuthService, AuthenticatedUserService],
    });
    App = app;
    fixtureModule = moduleFixture;
  });

  beforeEach(async () => {
    listFindManyService =
      fixtureModule.get<ListFindManyService>(ListFindManyService);
    authenticatedUserService = fixtureModule.get<AuthenticatedUserService>(
      AuthenticatedUserService,
    );
    authService = fixtureModule.get<AuthService>(AuthService);

    user = await authenticatedUserService.createAuthenticatedUser();
    token = await authService.signPayload({
      email: user.email
    })
    request = supertest(App.getHttpServer())
    contacts = await listFindManyService.seed();
  });

  afterAll(async () => {
    await listFindManyService.remove();
    await App.close();
  });

  describe('findMany', () => {
    let findManyQuery: string;

    beforeEach(() => {
      findManyQuery = `
        query {
          findMany(
            filters: [{
              name: "Industry",
              subFilter: {
                category: ["Mining", "Construction"],
                naics: ["11"],
                sic: ["21"]
              }
            }]
          ) {
            _id
            firstName
            lastName
  	        company {
              name
            }
          }
        }
     `;
    });

    it('should return queried contacts', async () => {
      return request
        .post('/graphql/api')
        .auth(token, { type: 'bearer' })
        .send({
          query: findManyQuery,
        })
        .expect(({ body }) => {
          expect(body.data.findMany).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ _id: contacts[0]._id.toHexString() }),
              expect.objectContaining({ _id: contacts[1]._id.toHexString() })
            ])
          );
        })
        .expect(200)
    });
  });
});
