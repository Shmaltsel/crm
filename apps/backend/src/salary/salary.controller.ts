import {
  Controller,
  Get,
  Post,
  Patch,
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
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';

@ApiTags('salary')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Створити записи нарахувань за звітом' })
  create(@Body() dto: CreateSalaryDto, @CurrentUser() user: JwtUser) {
    return this.salaryService.create(dto, user);
  }

  @Get('mine')
  @ApiOperation({ summary: 'Мої нарахування' })
  findMine(@CurrentUser() user: JwtUser, @Query('cityId') cityId?: string) {
    return this.salaryService.findMine(user, cityId);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Фінансовий підсумок користувача' })
  getSummary(@CurrentUser() user: JwtUser) {
    return this.salaryService.getSummary(user.sub);
  }

  @Get()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Всі нарахування (менеджер/адмін)' })
  findAll(@CurrentUser() user: JwtUser, @Query('cityId') cityId?: string) {
    return this.salaryService.findAll(user, cityId);
  }

  @Patch(':id/mark-paid')
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Позначити нарахування як виплачене' })
  markPaid(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.salaryService.markPaid(id, user);
  }
}
