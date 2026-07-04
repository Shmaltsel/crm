import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly exemptPaths = ['/auth/login'];

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;
    if (this.exemptPaths.includes(req.path)) return true;

    const cookieToken = req.cookies?.csrf_token;
    const headerToken = req.headers['x-csrf-token'];
    console.log('CSRF DEBUG', {
      path: req.path,
      cookieToken,
      headerToken,
      allCookies: Object.keys(req.cookies || {}),
    });
    if (!cookieToken || cookieToken !== headerToken) {
      throw new ForbiddenException('CSRF token invalid');
    }
    return true;
  }
}
