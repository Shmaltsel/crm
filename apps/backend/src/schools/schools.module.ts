import { Module, forwardRef } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { EventsModule } from '../events/events.module';
import { ParserService } from './parser.service'; // Переконайся, що цей шлях правильний

@Module({
  imports: [forwardRef(() => EventsModule)],
  controllers: [SchoolsController],
  providers: [SchoolsService, ParserService], // ParserService має бути ТУТ
  exports: [SchoolsService, ParserService],   // І ТУТ
})
export class SchoolsModule {}