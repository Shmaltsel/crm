import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
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
}
