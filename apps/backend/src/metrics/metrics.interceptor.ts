import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { httpRequestDuration } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        const durationSec = Number(process.hrtime.bigint() - start) / 1e9;
        const route = req.route?.path ?? req.url;
        httpRequestDuration.observe(
          { method: req.method, route, status_code: res.statusCode },
          durationSec,
        );
      }),
    );
  }
}
