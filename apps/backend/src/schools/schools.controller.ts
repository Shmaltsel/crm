import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BulkImportDto } from './dto/bulk-import.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { FindSchoolsQueryDto } from './dto/find-schools-query.dto';
import { FindContactsQueryDto } from './dto/find-contacts-query.dto';
@ApiTags('Schools')
@ApiCookieAuth('access_token')
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @ApiOperation({
    summary: 'Масовий імпорт шкіл/садочків із зовнішнього джерела',
  })
  @Post('bulk-import')
  @Throttle({ default: { ttl: 300000, limit: 2 } })
  @Roles('SUPERADMIN', 'MANAGER')
  bulkImport(@Body() body: BulkImportDto) {
    return this.schoolsService.bulkImport(body.cityId, body.type || 'Школа');
  }

  @ApiOperation({ summary: 'Список міст, підтримуваних парсером' })
  @Get('supported-cities')
  getSupportedCities() {
    return this.parserService.getSupportedCities();
  }

  @ApiOperation({ summary: 'Створити школу/садочок' })
  @Post()
  @Roles('SUPERADMIN', 'MANAGER')
  create(@Body() body: CreateSchoolDto) {
    return this.schoolsService.create(body);
  }

  @ApiOperation({ summary: 'Список закладів з фільтрами та пагінацією' })
  @Get()
  findAll(@Query() query: SchoolQueryDto) {
    return this.schoolsService.findAll(query);
  }

  @ApiOperation({ summary: 'Статистика закладів за стадією та розміром' })
  @Get('stats')
  getStats(
    @Query('cityId') cityId?: string,
    @Query('type') type?: 'Школа' | 'Садочок',
    @Query('stage') stage?: 'new' | 'planned' | 'inProgress' | 'done',
  ) {
    return this.schoolsService.getStats({ cityId, type, stage });
  }

  @ApiOperation({ summary: 'Пошук закладів у зовнішньому джерелі' })
  @Get('search')
  search(@Query() query: FindSchoolsQueryDto) {
    return this.parserService.searchSchools(query.q ?? '', query.type);
  }

  @ApiOperation({ summary: 'Отримати заклад за ID' })
  @Get(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @ApiOperation({ summary: 'Оновити заклад' })
  @Patch(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
    return this.schoolsService.update(id, body);
  }

  @ApiOperation({ summary: 'Видалити заклад' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  @ApiOperation({ summary: 'Пошук контактів закладу' })
  @Get('contacts/search')
  searchContacts(@Query() query: FindContactsQueryDto) {
    return this.schoolsService.searchContacts(query.q ?? '', query.city);
  }
}
