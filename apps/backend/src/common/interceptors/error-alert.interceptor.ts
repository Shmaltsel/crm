import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ErrorAlertService } from './error-alert.service';

@Injectable()
export class ErrorAlertInterceptor implements NestInterceptor {
  constructor(private readonly errorAlert: ErrorAlertService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap({
        error: () => {
          this.errorAlert.recordError(res.statusCode);
        },
      }),
    );
  }
}
