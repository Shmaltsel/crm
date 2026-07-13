import { Module } from '@nestjs/common';
import { DayOffRequestsService } from './day-off-requests.service';
import { DayOffRequestsController } from './day-off-requests.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TelegramModule, NotificationsModule],
  controllers: [DayOffRequestsController],
  providers: [DayOffRequestsService],
  exports: [DayOffRequestsService],
})
export class DayOffRequestsModule {}
