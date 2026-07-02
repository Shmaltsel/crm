import { Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerStorage,
  THROTTLER_OPTIONS,
} from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  constructor(
    @Inject(THROTTLER_OPTIONS) options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super(options, storageService, reflector);
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const token = req.cookies?.access_token;
    if (token) {
      const payload = this.jwtService.decode(token) as { sub?: string } | null;
      if (payload?.sub) return `user-${payload.sub}`;
    }
    return req.ip;
  }
}
