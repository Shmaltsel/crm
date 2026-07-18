import { Controller, Get, Post, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth, ApiQuery } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Categories')
@ApiCookieAuth('access_token')
@Controller('categories')
@UseGuards(AuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '?????? ?????????' })
  @ApiQuery({ name: 'type', required: false, enum: ['INVENTORY', 'EXPENSE'] })
  @Get()
  findAll(@Query('type') type?: string) {
    return this.categoriesService.findAll(type);
  }

  @ApiOperation({ summary: '???????? ?????????' })
  @Post()
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @ApiOperation({ summary: '???????? ?????????' })
  @Delete(':id')
  @Roles('SUPERADMIN', 'OWNER')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
