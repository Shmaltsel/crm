import { Module } from '@nestjs/common';
import { DaysOffService } from './days-off.service';
import { DaysOffController } from './days-off.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { DayOffRequestsModule } from '../day-off-requests/day-off-requests.module';

@Module({
  imports: [TelegramModule, NotificationsModule, DayOffRequestsModule],
  controllers: [DaysOffController],
  providers: [DaysOffService],
})
export class DaysOffModule {}
