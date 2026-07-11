import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { TelegramModule } from '../telegram/telegram.module';
import { SalaryModule } from '../salary/salary.module';

@Module({
  imports: [NotificationsModule, TelegramModule, SalaryModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
