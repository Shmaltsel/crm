import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { SanitizeInterceptor } from './common/interceptors/sanitize.interceptor';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import Redis from 'ioredis';
import { UserThrottlerGuard } from './common/guards/user-throttler.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './common/logger/logger.module';
import { RedisCacheModule } from './common/cache/redis-cache.module';
import { envValidationSchema } from './config/env.validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { CitiesModule } from './cities/cities.module';
import { SchoolsModule } from './schools/schools.module';
import { FinanceModule } from './finance/finance.module';
import { TelegramModule } from './telegram/telegram.module';
import { IssuesModule } from './issues/issues.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjectsModule } from './projects/projects.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    LoggerModule,
    RedisCacheModule,
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [{ name: 'default', ttl: 60000, limit: 100 }],
        storage: new ThrottlerStorageRedisService(
          new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379'),
        ),
      }),
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    EventsModule,
    CitiesModule,
    SchoolsModule,
    FinanceModule,
    TelegramModule,
    IssuesModule,
    DashboardModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SanitizeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}
