import { HttpStatus, HttpException } from '@nestjs/common';

export const httpStatus = (exception: HttpException): number => {
  return exception.getStatus
    ? exception.getStatus()
    : extractStatusCode(exception.stack ?? exception.message);
};

const extractStatusCode = (stack: string) => {
  const statusCode = stack.match(/(?:302|404)/g);

  return statusCode
    ? parseInt(<string>(<unknown>statusCode))
    : HttpStatus.INTERNAL_SERVER_ERROR;
};
