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
    category?: string;
    unit?: string;
    project?: string;
    minStock?: number;
    currentStock?: number;
    notes?: string;
    cityId?: string;
    schoolId?: string;
  }) {
    return this.prisma.inventoryItem.create({
      data: {
        name: dto.name,
        sku: dto.sku,
        category: dto.category ?? 'Інше',
        unit: dto.unit ?? 'шт',
        project: dto.project,
        minStock: dto.minStock ?? 5,
        currentStock: dto.currentStock ?? 0,
        notes: dto.notes,
        cityId: dto.cityId,
        schoolId: dto.schoolId,
      },
      include: { city: true, school: true },
    });
  }

  async findAll(filters?: {
    category?: string;
    cityId?: string;
    lowStock?: string;
    search?: string;
  }) {
    const where: Record<string, unknown> = {};

    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.cityId) {
      where.cityId = filters.cityId;
    }
    if (filters?.lowStock === 'true') {
      const lowIds = await this.prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM "InventoryItem" WHERE "currentStock" <= "minStock"
      `;
      where.id = { in: lowIds.map((i) => i.id) };
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { sku: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.inventoryItem.findMany({
      where,
      orderBy: { name: 'asc' },
      include: { city: true, school: true },
    });
  }

  async findLowStock() {
    return this.prisma.inventoryItem.findMany({
      where: {
        currentStock: { lte: this.prisma.inventoryItem.fields.minStock },
      },
      orderBy: { currentStock: 'asc' },
      include: { city: true, school: true },
    });
  }

  async update(
    id: string,
    dto: {
      name?: string;
      sku?: string;
      category?: string;
      unit?: string;
      project?: string;
      minStock?: number;
      currentStock?: number;
      notes?: string;
      cityId?: string;
      schoolId?: string;
    },
  ) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Товар не знайдено');

    return this.prisma.inventoryItem.update({
      where: { id },
      data: dto,
      include: { city: true, school: true },
    });
  }

  async delete(id: string) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Товар не знайдено');

    await this.prisma.inventoryUsage.deleteMany({ where: { itemId: id } });
    return this.prisma.inventoryItem.delete({ where: { id } });
  }

  async findByProject(project: string) {
    return this.prisma.inventoryItem.findMany({
      where: { project },
      orderBy: { name: 'asc' },
      include: { city: true, school: true },
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
