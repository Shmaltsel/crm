import { Module } from '@nestjs/common';
import { SchoolCommentsController } from './school-comments.controller';
import { SchoolCommentsService } from './school-comments.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SchoolCommentsController],
  providers: [SchoolCommentsService],
  exports: [SchoolCommentsService],
})
export class SchoolCommentsModule {}
