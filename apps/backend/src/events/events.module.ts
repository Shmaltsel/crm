import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SchoolsModule } from '../schools/schools.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [forwardRef(() => SchoolsModule), TelegramModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
