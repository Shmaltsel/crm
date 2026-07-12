import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { timingSafeEqual } from 'crypto';
import { SKIP_CSRF_KEY } from './decorators/skip-csrf.decorator';

@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly exemptPaths = ['/auth/login'];

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const skipCsrf = this.reflector.getAllAndOverride<boolean>(SKIP_CSRF_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipCsrf) return true;

    const req = context.switchToHttp().getRequest();
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;
    if (this.exemptPaths.includes(req.path)) return true;

    const cookieToken = req.cookies?.csrf_token as string | undefined;
    const headerToken = req.headers['x-csrf-token'] as string | undefined;
    if (!cookieToken || !headerToken) {
      throw new ForbiddenException('CSRF token invalid');
    }
    const a = Buffer.from(cookieToken);
    const b = Buffer.from(headerToken);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new ForbiddenException('CSRF token invalid');
    }
    return true;
  }
}
