import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  private readonly logger = new Logger(UserThrottlerGuard.name);
  private lastWarnAt = 0;

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const token = req.cookies?.access_token;
    if (token) {
      try {
        const payload = JSON.parse(
          Buffer.from(token.split('.')[1], 'base64url').toString('utf8'),
        ) as { sub?: string };
        if (payload?.sub) return `user-${payload.sub}`;
      } catch {
        return req.ip;
      }
    }
    return req.ip;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return await super.canActivate(context);
    } catch (e) {
      if (e instanceof Error && e.constructor.name === 'ThrottlerException')
        throw e;
      const now = Date.now();
      if (now - this.lastWarnAt > 10_000) {
        this.logger.warn(
          `Throttler storage unavailable, allowing request: ${e.message}`,
        );
        this.lastWarnAt = now;
      }
      return true;
    }
  }
}
