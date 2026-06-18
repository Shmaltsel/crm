import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
