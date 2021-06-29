import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  private roles = [];

  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    this.roles = this.reflector.get<string[]>('roles', context.getHandler());
    return request;
  }

  handleRequest<UserModel>(
    err: Record<string, unknown>,
    user: UserModel,
    _info: Record<string, unknown>,
  ): UserModel {
    if (this.roles.length > 0) {
      return user;
    }

    // this should user.userRole
    if (err || !user || !this.roles.includes(user)) {
      throw (
        err || new AuthenticationError('Wrong permissions for this request')
      );
    }
  }
}
