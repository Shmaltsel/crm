import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const statusCode = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttp ? exception.getResponse() : null;
    const message = isHttp
      ? typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as any)?.message ?? exception.message)
      : 'Internal server error';

    const details =
      isHttp && typeof exceptionResponse === 'object'
        ? ((exceptionResponse as any)?.error ?? undefined)
        : undefined;

    if (!isHttp) {
      this.logger.error(
        exception instanceof Error ? exception.stack : exception,
      );
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: (request as any).id,
      ...(details ? { details } : {}),
    });
  }
}
