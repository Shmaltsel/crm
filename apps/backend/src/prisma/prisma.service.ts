import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { dbQueryDuration } from '../metrics/metrics.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const start = process.hrtime.bigint();
            const result = await query(args);
            const durationSec = Number(process.hrtime.bigint() - start) / 1e9;
            dbQueryDuration.observe(
              { model: model ?? 'unknown', action: operation },
              durationSec,
            );
            return result;
          },
        },
      },
    }) as unknown as PrismaService;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
