import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
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
  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @ApiOperation({ summary: 'Створити товар' })
  @Post()
  @Roles('SUPERADMIN', 'OWNER')
  create(
    @Body()
    dto: {
      name: string;
      sku?: string;
      unit?: string;
      minStock?: number;
      currentStock?: number;
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
    dto: { name?: string; sku?: string; unit?: string; minStock?: number },
  ) {
    return this.inventoryService.update(id, dto);
  }

  @ApiOperation({ summary: 'Поповнити склад' })
  @Post(':id/add-stock')
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  addStock(@Param('id') id: string, @Body() dto: { quantity: number }) {
    return this.inventoryService.addStock(id, dto.quantity);
  }
}
