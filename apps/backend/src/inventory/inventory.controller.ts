import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@ApiCookieAuth('access_token')
@Controller('inventory')
@UseGuards(AuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Список товарів на складі' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'cityId', required: false })
  @ApiQuery({
    name: 'lowStock',
    required: false,
    description: 'true — тільки товари з недостатньою кількістю',
  })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('cityId') cityId?: string,
    @Query('lowStock') lowStock?: string,
    @Query('search') search?: string,
  ) {
    return this.inventoryService.findAll({
      category,
      cityId,
      lowStock,
      search,
    });
  }

  @ApiOperation({
    summary: 'Товари з низьким запасом (currentStock <= minStock)',
  })
  @Get('low-stock')
  findLowStock() {
    return this.inventoryService.findLowStock();
  }

  @ApiOperation({ summary: 'Створити товар' })
  @Post()
  @Roles('SUPERADMIN', 'OWNER')
  create(
    @Body()
    dto: {
      name: string;
      sku?: string;
      category?: string;
      unit?: string;
      minStock?: number;
      currentStock?: number;
      notes?: string;
      cityId?: string;
      schoolId?: string;
    },
  ) {
    return this.inventoryService.create(dto);
  }

  @ApiOperation({ summary: 'Оновити товар' })
  @Patch(':id')
  @Roles('SUPERADMIN', 'OWNER')
  update(
    @Param('id') id: string,
    @Body()
    dto: {
      name?: string;
      sku?: string;
      category?: string;
      unit?: string;
      minStock?: number;
      currentStock?: number;
      notes?: string;
      cityId?: string;
      schoolId?: string;
    },
  ) {
    return this.inventoryService.update(id, dto);
  }

  @ApiOperation({ summary: 'Видалити товар' })
  @Delete(':id')
  @Roles('SUPERADMIN', 'OWNER')
  delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }

  @ApiOperation({ summary: 'Поповнити склад' })
  @Post(':id/add-stock')
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  addStock(@Param('id') id: string, @Body() dto: { quantity: number }) {
    return this.inventoryService.addStock(id, dto.quantity);
  }
}
