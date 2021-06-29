import { HttpException } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import { PayLoad } from '@shared/interfaces';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthType, LinkedInType } from './types';
import { UserModel } from '@models';
import { SignupArgs } from './dto';
import { ILinkedIn } from '@shared/interfaces';
import { httpStatus } from '@shared/utils';
import { EmailScalar } from '@src/scalars/email.scalar';

const linkedIn: ILinkedIn = config.get('linkedIn');

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => AuthType)
  async signup(
    @Args({ type: () => SignupArgs }) { user }: SignupArgs,
  ): Promise<AuthType> {
    const userModel: UserModel = new UserModel();
    userModel.assimilate(user);

    try {
      const response: UserModel = await this.userService.insertOne(userModel);
      const payLoad: PayLoad = {
        email: response.email,
      };

      const token = await this.authService.signPayload(payLoad);
      return { email: response.email, token };
    } catch (exception) {
      throw exception;
    }
  }

  @Query(() => LinkedInType)
  async getLinkedinURL(): Promise<LinkedInType> {
    const linkedin: LinkedInType = new LinkedInType();
    linkedin.URL = `${linkedIn.baseURL}?response_type=code&client_id=${
      linkedIn.clientId
    }&redirect_uri=${linkedIn.redirectURL}&state=${uuidv4()}&scope=${
      linkedIn.scope
    }`;

    return linkedin;
  }

  @Mutation(() => AuthType)
  async accessToken(@Args('code') code: string): Promise<{ token: string }> {
    try {
      const response: AxiosResponse<{
        access_token: string;
        expires_in: number;
      }> = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        querystring.stringify({
          grant_type: 'authorization_code',
          code,
          client_id: linkedIn.clientId,
          client_secret: linkedIn.clientSecret,
          redirect_uri: linkedIn.redirectURL,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const profile = await this.userService.linkedInMe(
        response.data.access_token,
      );
      const emailAddress = await this.userService.linkedInEmailAddress(
        response.data.access_token,
      );

      const user = new UserModel();
      user.assimilate({
        firstName: profile.firstName.localized.en_US,
        lastName: profile.lastName.localized.en_US,
        email: <EmailScalar>(
          (<unknown>emailAddress.elements[0]['handle~'].emailAddress)
        ),
        linkedin: {
          accessToken: response.data.access_token,
          expiresIn: response.data.expires_in,
        },
      });

      await this.userService.insertOne(user);
      const payLoad: PayLoad = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payLoad);

      return {
        token,
      };
    } catch (exception) {
      throw new HttpException(exception, httpStatus(exception));
    }
  }
}
