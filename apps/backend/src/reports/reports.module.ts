import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { TelegramModule } from '../telegram/telegram.module';
import { SalaryModule } from '../salary/salary.module';
import { RedisCacheModule } from '../common/cache/redis-cache.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    NotificationsModule,
    TelegramModule,
    SalaryModule,
    RedisCacheModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
