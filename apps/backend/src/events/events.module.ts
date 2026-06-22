import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SchoolsModule } from '../schools/schools.module';
import { TelegramModule } from '../telegram/telegram.module';
import { EventsSchedulerService } from './events-scheduler.service';

@Module({
  imports: [forwardRef(() => SchoolsModule), TelegramModule],
  controllers: [EventsController],
  providers: [EventsService, EventsSchedulerService],
  exports: [EventsService],
})
export class EventsModule {}
