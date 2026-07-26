import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { MileageReportsService } from './mileage-reports.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateMileageReportDto } from './dto/create-mileage-report.dto';
import { ReviewMileageReportDto } from './dto/review-mileage-report.dto';

@ApiTags('MileageReports')
@ApiCookieAuth('access_token')
@Controller('mileage-reports')
@UseGuards(AuthGuard, RolesGuard)
export class MileageReportsController {
  constructor(private readonly service: MileageReportsService) {}

  @ApiOperation({ summary: 'Створити заявку на кілометраж' })
  @Post()
  create(@Body() body: CreateMileageReportDto, @CurrentUser() user: JwtUser) {
    return this.service.create(body, user);
  }

  @ApiOperation({ summary: 'Мої заявки на кілометраж' })
  @Get('mine')
  findMine(@CurrentUser() user: JwtUser) {
    return this.service.findMine(user);
  }

  @ApiOperation({ summary: 'Всі заявки на кілометраж (менеджер)' })
  @Get()
  @Roles('MANAGER', 'SUPERADMIN')
  findAll(@CurrentUser() user: JwtUser) {
    return this.service.findAll(user);
  }

  @ApiOperation({ summary: 'Затвердити заявку кілометражу' })
  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @Roles('MANAGER', 'SUPERADMIN')
  approve(
    @Param('id') id: string,
    @Body() body: ReviewMileageReportDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.service.approve(id, user.sub, body.managerNote);
  }

  @ApiOperation({ summary: 'Відхилити заявку кілометражу' })
  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @Roles('MANAGER', 'SUPERADMIN')
  reject(
    @Param('id') id: string,
    @Body() body: ReviewMileageReportDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.service.reject(id, user.sub, body.managerNote);
  }
}
