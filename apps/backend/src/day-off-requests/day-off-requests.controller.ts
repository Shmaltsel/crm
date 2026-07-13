import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { DayOffRequestsService } from './day-off-requests.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateDayOffRequestDto } from './dto/create-day-off-request.dto';
import { ReviewDayOffRequestDto } from './dto/review-day-off-request.dto';

@ApiTags('DayOffRequests')
@ApiCookieAuth('access_token')
@Controller('day-off-requests')
@UseGuards(AuthGuard, RolesGuard)
export class DayOffRequestsController {
  constructor(private readonly service: DayOffRequestsService) {}

  @ApiOperation({ summary: 'Створити запит на вихідний' })
  @Post()
  create(@Body() body: CreateDayOffRequestDto, @CurrentUser() user: JwtUser) {
    return this.service.create(body, user);
  }

  @ApiOperation({ summary: 'Список запитів на вихідні' })
  @Get()
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('cityId') cityId?: string,
  ) {
    return this.service.findAll(from, to, cityId);
  }

  @ApiOperation({ summary: 'Затвердити запит' })
  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @Roles('MANAGER', 'SUPERADMIN')
  approve(
    @Param('id') id: string,
    @Body() body: ReviewDayOffRequestDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.service.approve(id, user.sub, body.managerNote);
  }

  @ApiOperation({ summary: 'Відхилити запит' })
  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @Roles('MANAGER', 'SUPERADMIN')
  reject(
    @Param('id') id: string,
    @Body() body: ReviewDayOffRequestDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.service.reject(id, user.sub, body.managerNote);
  }
}
