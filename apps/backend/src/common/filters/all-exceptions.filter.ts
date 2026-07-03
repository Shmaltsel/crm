import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/nestjs';
import { I18nService } from '../i18n/i18n.service';
import { AppException } from '../exceptions/app.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly i18n: I18nService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const lang = this.i18n.detectLang(request.headers['accept-language']);

    const isHttp = exception instanceof HttpException;
    const statusCode = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: unknown;
    if (exception instanceof AppException) {
      message = this.i18n.translate(exception.messageKey, lang);
    } else if (isHttp) {
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as any)?.message ?? exception.message);
    } else {
      message = this.i18n.translate('INTERNAL_ERROR', lang);
    }

    const exceptionResponse =
      isHttp && !(exception instanceof AppException)
        ? exception.getResponse()
        : null;

    const details =
      isHttp && typeof exceptionResponse === 'object'
        ? ((exceptionResponse as any)?.error ?? undefined)
        : undefined;

    if (!isHttp) {
      this.logger.error(
        exception instanceof Error ? exception.stack : exception,
      );
      Sentry.captureException(exception);
    } else if (statusCode >= 500) {
      Sentry.captureException(exception);
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
