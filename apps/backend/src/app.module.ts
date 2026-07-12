import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SanitizeInterceptor } from './common/interceptors/sanitize.interceptor';
import { ErrorAlertInterceptor } from './common/interceptors/error-alert.interceptor';
import { ErrorAlertService } from './common/interceptors/error-alert.service';
import { CsrfGuard } from './auth/csrf.guard';
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
import { HealthModule } from './health/health.module';
import { InventoryModule } from './inventory/inventory.module';
import { DaysOffModule } from './days-off/days-off.module';
import { ReportsModule } from './reports/reports.module';
import { SalaryModule } from './salary/salary.module';
import { SchoolCommentsModule } from './school-comments/school-comments.module';
import { MetricsModule } from './metrics/metrics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { FeatureFlagsModule } from './common/feature-flags/feature-flags.module';
import { ScheduleModule } from '@nestjs/schedule';
import { I18nModule } from './common/i18n/i18n.module';
import { LocalizedValidationPipe } from './common/pipes/localized-validation.pipe';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    HealthModule,
    MetricsModule,
    FeatureFlagsModule,
    I18nModule,
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
          new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
            maxRetriesPerRequest: 1,
            connectTimeout: 3000,
            retryStrategy: (times) =>
              times > 3 ? null : Math.min(times * 200, 2000),
          }),
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
    DaysOffModule,
    InventoryModule,
    ReportsModule,
    SalaryModule,
    SchoolCommentsModule,
    NotificationsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AllExceptionsFilter,
    ErrorAlertService,
    {
      provide: APP_PIPE,
      useClass: LocalizedValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: UserThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CsrfGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SanitizeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorAlertInterceptor,
    },
  ],
})
export class AppModule {}
