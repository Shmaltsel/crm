import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TelegramModule } from '../telegram/telegram.module';
import { FeatureFlagsModule } from '../common/feature-flags/feature-flags.module';

@Module({
  imports: [TelegramModule, FeatureFlagsModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
