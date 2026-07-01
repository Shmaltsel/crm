import { Module, forwardRef } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { EventsModule } from '../events/events.module';
import { ParserService } from './parser.service';

@Module({
  imports: [forwardRef(() => EventsModule)],
  controllers: [SchoolsController],
  providers: [SchoolsService, ParserService],
  exports: [SchoolsService, ParserService],
})
export class SchoolsModule {}
