import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class MetricsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const token = process.env.METRICS_TOKEN;
    if (!token) return true;

    const req = context.switchToHttp().getRequest();
    const headerToken = req.headers['x-metrics-token'];

    if (headerToken !== token) {
      throw new ForbiddenException('Invalid metrics token');
    }
    return true;
  }
}
