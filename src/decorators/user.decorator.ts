// import { createParamDecorator } from '@nestjs/common';

// export const CurrentUser = createParamDecorator(
//   (data, [_root, _args, ctx, _info]) => ctx.req.user,
// );

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
