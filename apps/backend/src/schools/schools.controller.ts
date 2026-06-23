import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';

@Controller('schools')
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @Post('bulk-import')
  bulkImport(@Body() body: { cityId: string; type?: string }) {
    return this.schoolsService.bulkImport(
      body.cityId,
      (body.type as 'Школа' | 'Садочок') || 'Школа',
    );
  }

  @Get('supported-cities')
  getSupportedCities() {
    return this.parserService.getSupportedCities();
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      type: string;
      cityId: string;
      sourceUrl?: string;
    },
  ) {
    return this.schoolsService.create(body);
  }

  @Get()
  findAll() {
    return this.schoolsService.findAll();
  }

  // ⚠️ ВАЖЛИВО: цей маршрут МАЄ стояти ДО @Get(':id')
  @Get('search')
  search(@Query('q') q: string, @Query('type') type: string) {
    return this.parserService.searchSchools(q, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.schoolsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  @Get('contacts/search')
  searchContacts(@Query('q') q: string, @Query('city') city: string) {
    return this.schoolsService.searchContacts(q, city);
  }
}
