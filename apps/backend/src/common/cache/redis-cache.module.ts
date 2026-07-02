import { Logger, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

const logger = new Logger('RedisCacheModule');

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        try {
          const store = await redisStore({
            url: process.env.REDIS_URL ?? 'redis://localhost:6379',
            ttl: 60_000,
            socket: {
              reconnectStrategy: (retries) => Math.min(retries * 200, 5000),
            },
          });
          store.client.on('error', (err: Error) =>
            logger.warn(`Redis error: ${err.message}`),
          );
          return { store };
        } catch (err) {
          logger.warn(
            `Redis unavailable at boot, falling back to in-memory cache: ${(err as Error).message}`,
          );
          return {};
        }
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
