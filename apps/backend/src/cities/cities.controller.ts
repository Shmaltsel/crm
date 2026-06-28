import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.citiesService.create(body.name);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }
  @Post(':id/crews')
  createCrew(@Param('id') id: string, @Body() body: { name: string; hostId: string; driverId: string }) {
    return this.citiesService.createCrew(id, body);
  }

  @Delete('crews/:crewId')
  deleteCrew(@Param('crewId') crewId: string) {
    return this.citiesService.deleteCrew(crewId);
  }
}
