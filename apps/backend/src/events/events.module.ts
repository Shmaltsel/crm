import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SchoolsModule } from '../schools/schools.module'; // Імпорт SchoolsModule

@Module({
  imports: [forwardRef(() => SchoolsModule)], // Теж використовуємо forwardRef
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService], // Експортуємо сервіс, щоб SchoolsService міг його бачити
})
export class EventsModule {}
