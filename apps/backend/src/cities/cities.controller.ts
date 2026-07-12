import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateCrewDto } from './dto/create-crew.dto';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';

@ApiTags('Cities')
@ApiCookieAuth('access_token')
@Controller('cities')
@UseGuards(AuthGuard, RolesGuard)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({ summary: 'Створити місто' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateCityDto) {
    return this.citiesService.create(body.name);
  }

  @ApiOperation({ summary: 'Список міст зі статистикою' })
  @Get()
  @Roles('SUPERADMIN', 'OWNER')
  findAll() {
    return this.citiesService.findAll();
  }

  @ApiOperation({ summary: 'Отримати місто за ID' })
  @Get(':id')
  @Roles('SUPERADMIN', 'OWNER')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Список екіпажів міста' })
  @Get(':id/crews')
  findCrews(@Param('id') id: string) {
    return this.citiesService.findCrews(id);
  }

  @ApiOperation({ summary: 'Створити екіпаж у місті' })
  @Post(':id/crews')
  @Roles('SUPERADMIN', 'MANAGER')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('city')
  createCrew(@Param('id') id: string, @Body() body: CreateCrewDto) {
    return this.citiesService.createCrew(id, body);
  }

  @ApiOperation({ summary: 'Видалити екіпаж' })
  @Delete('crews/:crewId')
  @Roles('SUPERADMIN', 'MANAGER')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('crew')
  deleteCrew(@Param('crewId') crewId: string) {
    return this.citiesService.deleteCrew(crewId);
  }
}
