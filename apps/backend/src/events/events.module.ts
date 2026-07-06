import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsReportService } from './events-report.service';
import { EventsSchedulingService } from './events-scheduling.service';
import { EventsController } from './events.controller';
import { SchoolsModule } from '../schools/schools.module';
import { TelegramModule } from '../telegram/telegram.module';
import { RedisCacheModule } from '../common/cache/redis-cache.module';
import { EventsSchedulerService } from './events-scheduler.service';

@Module({
  imports: [forwardRef(() => SchoolsModule), TelegramModule, RedisCacheModule],
  controllers: [EventsController],
  providers: [
    EventsService,
    EventsReportService,
    EventsSchedulingService,
    EventsSchedulerService,
  ],
  exports: [EventsService, EventsReportService, EventsSchedulingService],
})
export class EventsModule {}
