import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { DaysOffService } from './days-off.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateDayOffDto } from './dto/create-day-off.dto';

@ApiTags('DaysOff')
@ApiCookieAuth('access_token')
@Controller('days-off')
@UseGuards(AuthGuard)
export class DaysOffController {
  constructor(private readonly daysOffService: DaysOffService) {}

  @ApiOperation({ summary: 'Список вихідних' })
  @Get()
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('cityId') cityId?: string,
  ) {
    return this.daysOffService.findAll(from, to, cityId);
  }

  @ApiOperation({ summary: 'Призначити вихідний' })
  @Post()
  create(@Body() body: CreateDayOffDto, @CurrentUser() user: JwtUser) {
    return this.daysOffService.create(body, user);
  }

  @ApiOperation({ summary: 'Скасувати вихідний' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.daysOffService.remove(id, user);
  }
}
