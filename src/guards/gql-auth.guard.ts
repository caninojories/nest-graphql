import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }

  // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
  handleRequest(err: any, user: any, _info: any) {
    if (err || !user) {
      throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
