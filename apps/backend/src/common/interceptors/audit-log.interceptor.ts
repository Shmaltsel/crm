import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

const MUTATING_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);
const EXCLUDED_PATHS = ['/auth/login', '/auth/refresh', '/auth/logout'];

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger('AuditLog');

  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (
      !MUTATING_METHODS.has(req.method) ||
      EXCLUDED_PATHS.some((p) => req.path.startsWith(p))
    ) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(() => {
        const user = req.user as { sub?: string; name?: string } | undefined;
        const entity = context
          .getClass()
          .name.replace(/Controller$/, '')
          .toLowerCase();
        const entityId =
          (Object.values(req.params ?? {}).find(
            (v) => typeof v === 'string' && /^\d+$/.test(v),
          ) as string | undefined) ?? undefined;

        this.prisma.auditLog
          .create({
            data: {
              userId: user?.sub,
              userName: user?.name,
              action: `${req.method} ${entity || req.path}`,
              entity: entity || undefined,
              entityId,
              ip: req.ip,
              userAgent: req.headers['user-agent'],
            },
          })
          .catch((err: Error) =>
            this.logger.warn(`Не вдалось записати audit log: ${err.message}`),
          );
      }),
    );
  }
}
