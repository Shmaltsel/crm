import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { dbQueryDuration } from '../metrics/metrics.service';

export function convertDecimalsDeep(value: unknown): unknown {
  if (value == null) return value;
  if (value instanceof Prisma.Decimal) return value.toNumber();
  if (value instanceof Date) return value;
  if (Array.isArray(value))
    return value.map((item) => convertDecimalsDeep(item));
  if (typeof value === 'object') {
    const source = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(source)) {
      out[key] = convertDecimalsDeep(source[key]);
    }
    return out;
  }
  return value;
}

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
            return convertDecimalsDeep(result);
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
