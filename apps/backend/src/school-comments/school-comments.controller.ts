import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SchoolCommentsService } from './school-comments.service';
import type { CommentType } from '@prisma/client';

@ApiTags('school-comments')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('schools/:schoolId/comments')
export class SchoolCommentsController {
  constructor(private readonly service: SchoolCommentsService) {}

  @Post()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Додати коментар до школи' })
  create(
    @Param('schoolId') schoolId: string,
    @Body() body: { type: CommentType; text: string },
    @CurrentUser() user: JwtUser,
  ) {
    return this.service.create(schoolId, body.type, body.text, user);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати коментарі школи' })
  findAll(
    @Param('schoolId') schoolId: string,
    @Query('type') type?: CommentType,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ) {
    return this.service.findAll(schoolId, type, page ?? 1, take ?? 20);
  }

  @Delete(':id')
  @Roles('SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Мʼяко видалити коментар' })
  softDelete(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.service.softDelete(id, user);
  }
}
