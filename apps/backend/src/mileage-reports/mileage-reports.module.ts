import { Module } from '@nestjs/common';
import { MileageReportsService } from './mileage-reports.service';
import { MileageReportsController } from './mileage-reports.controller';
import { SalaryModule } from '../salary/salary.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [SalaryModule, NotificationsModule],
  controllers: [MileageReportsController],
  providers: [MileageReportsService],
  exports: [MileageReportsService],
})
export class MileageReportsModule {}
