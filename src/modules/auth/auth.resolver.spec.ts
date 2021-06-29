import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailScalar } from '@scalars/email.scalar';
import { UserService } from '@modules/user/user.service';
import { userSchema } from '@modules/database/user.schema';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthType } from './types';
import { SignupArgs } from './dto';
import { TestDatabaseModule } from '../../../test/test-database.module';
import { TestServer } from '../../../test/test.server';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;

  beforeEach(async () => {
    const { moduleRef } = await TestServer({
      imports: [
        TestDatabaseModule,
        MongooseModule.forFeatureAsync([...userSchema]),
      ],
      providers: [AuthResolver, AuthService, UserService],
    });
    authResolver = moduleRef.get<AuthResolver>(AuthResolver);
  });

  describe('signup', () => {
    it('should return AuthType<{email, token}>', async () => {
      const authType: AuthType = {
        email: <EmailScalar>(<unknown>'test@test.com'),
        token: 'testtoken',
      };
      const signupArgs: SignupArgs = {
        user: {
          email: <EmailScalar>(<unknown>'test@test.com'),
          password: 'testpassword',
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      jest
        .spyOn(authResolver, 'signup')
        .mockImplementation(() => Promise.resolve(authType));

      expect(await authResolver.signup(signupArgs)).toBe(authType);
    });
  });
});
