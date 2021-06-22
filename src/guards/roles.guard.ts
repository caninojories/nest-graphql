import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { Reflector } from '@nestjs/core';
import { User } from '@modules/user/models/user.model';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  roles = [];
  user: User;

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    this.roles = this.reflector.get<string[]>('roles', context.getHandler());
    return request;
  }

  handleRequest(
    err: Record<string, unknown>,
    user: any,
    _info: Record<string, unknown>,
  ) {
    if (!this.roles) {
      return true;
    }

    if (err || !user || !this.roles.includes(user.userRole)) {
      throw (
        err || new AuthenticationError('Wrong permissions for this request')
      );
    }
    this.user = user;
    return user;
  }
}
