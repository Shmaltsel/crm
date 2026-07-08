import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: {
    name: string;
    sku?: string;
    unit?: string;
    minStock?: number;
    currentStock?: number;
  }) {
    return this.prisma.inventoryItem.create({
      data: {
        name: dto.name,
        sku: dto.sku,
        unit: dto.unit ?? 'шт',
        minStock: dto.minStock ?? 5,
        currentStock: dto.currentStock ?? 0,
      },
    });
  }

  async findAll() {
    return this.prisma.inventoryItem.findMany({ orderBy: { name: 'asc' } });
  }

  async update(
    id: string,
    dto: { name?: string; sku?: string; unit?: string; minStock?: number },
  ) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Товар не знайдено');

    return this.prisma.inventoryItem.update({
      where: { id },
      data: dto,
    });
  }

  async addStock(id: string, quantity: number) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Товар не знайдено');
    if (quantity <= 0)
      throw new BadRequestException('Кількість має бути більше 0');

    return this.prisma.inventoryItem.update({
      where: { id },
      data: { currentStock: { increment: quantity } },
    });
  }
}
