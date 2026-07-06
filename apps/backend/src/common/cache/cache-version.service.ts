import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheVersionService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getVersion(namespace: string): Promise<number> {
    const key = `cache:version:${namespace}`;
    const version = await this.cacheManager.get<number>(key);
    return version ?? 0;
  }

  async bumpVersion(namespace: string): Promise<void> {
    const key = `cache:version:${namespace}`;
    const current = await this.cacheManager.get<number>(key);
    await this.cacheManager.set(key, (current ?? 0) + 1, 0);
  }
}
