import { HttpException } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import { PayLoad } from '@shared/interfaces';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Auth, LinkedIn } from './models';
import { User } from '../user/models/user.model';
import { SignupArgs } from './dto';
import { ILinkedIn } from '@shared/interfaces';
import { httpStatus } from '@shared/utils';

const linkedIn: ILinkedIn = config.get('linkedIn');

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => Auth)
  async signup(
    @Args({ type: () => SignupArgs }) { user }: SignupArgs,
  ): Promise<Auth> {
    const userModel: User = new User();
    userModel.assimilate(user);

    try {
      const response: User = await this.userService.insertOne(userModel);
      const payLoad: PayLoad = {
        email: response.email,
      };

      const token = await this.authService.signPayload(payLoad);
      return { email: response.email, token };
    } catch (exception) {
      throw exception;
    }
  }

  @Query(() => LinkedIn)
  async getLinkedinURL(): Promise<LinkedIn> {
    const linkedin: LinkedIn = new LinkedIn();
    linkedin.URL = `${linkedIn.baseURL}?response_type=code&client_id=${
      linkedIn.clientId
    }&redirect_uri=${linkedIn.redirectURL}&state=${uuidv4()}&scope=${
      linkedIn.scope
    }`;

    return linkedin;
  }

  @Mutation(() => Boolean)
  async accessToken(@Args('code') code: string): Promise<boolean> {
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

      await this.userService.linkedInMe(response.data.access_token);
      await this.userService.linkedInEmailAddress(response.data.access_token);

      return true;
    } catch (exception) {
      throw new HttpException(exception, httpStatus(exception));
    }
  }
}
