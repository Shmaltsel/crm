import { PrismaService } from '../prisma/prisma.service';
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(type?: string) {
    const where = type ? { type: type as 'INVENTORY' | 'EXPENSE' } : {};
    return this.prisma.category.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { name_type: { name: dto.name, type: dto.type } },
    });
    if (existing) {
      throw new ConflictException(`Категорія "${dto.name}" вже існує для типу ${dto.type}`);
    }
    return this.prisma.category.create({ data: dto });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Категорію не знайдено');

    if (category.type === 'INVENTORY') {
      const count = await this.prisma.inventoryItem.count({ where: { category: category.name } });
      if (count > 0) {
        throw new BadRequestException(`Неможливо видалити: категорія використовується в ${count} товарах`);
      }
    } else if (category.type === 'EXPENSE') {
      const [expenseCount, manualCount] = await Promise.all([
        this.prisma.expenseItem.count({ where: { category: category.name } }),
        this.prisma.manualExpense.count({ where: { category: category.name } }),
      ]);
      if (expenseCount + manualCount > 0) {
        throw new BadRequestException(`Неможливо видалити: категорія використовується в ${expenseCount + manualCount} витратах`);
      }
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
