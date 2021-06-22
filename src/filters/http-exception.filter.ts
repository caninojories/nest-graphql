import {
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): HttpException {
    const ctx = GqlArgumentsHost.create(host);
    const context = ctx.getContext();
    if (!context.req) {
      return context();
    }

    const response = context.res;
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    /*
     * Below will be used when there is a way to send
     * custom response without the error
     * "HTTP_HEADER are already sent"
      const request = context.req;
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception.message || null
            : 'Internal Server Error',
      };
      return response.status(status).json(errorResponse);
    */

    exception['code'] = Object.keys(HttpStatus).find(
      (key) => HttpStatus[key] === status,
    );
    response.statusCode = status;
    return exception;
  }
}
