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
      throw new ConflictException(`\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F "${dto.name}" \u0432\u0436\u0435 \u0456\u0441\u043D\u0443\u0454 \u0434\u043B\u044F \u0442\u0438\u043F\u0443 ${dto.type}`);
    }
    return this.prisma.category.create({ data: dto });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E');

    if (category.type === 'INVENTORY') {
      const count = await this.prisma.inventoryItem.count({ where: { category: category.name } });
      if (count > 0) {
        throw new BadRequestException(`\u041D\u0435\u043C\u043E\u0436\u043B\u0438\u0432\u043E \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438: \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F \u0432 ${count} \u0442\u043E\u0432\u0430\u0440\u0430\u0445`);
      }
    } else if (category.type === 'EXPENSE') {
      const [expenseCount, manualCount] = await Promise.all([
        this.prisma.expenseItem.count({ where: { category: category.name } }),
        this.prisma.manualExpense.count({ where: { category: category.name } }),
      ]);
      if (expenseCount + manualCount > 0) {
        throw new BadRequestException(`\u041D\u0435\u043C\u043E\u0436\u043B\u0438\u0432\u043E \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438: \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F \u0432 ${expenseCount + manualCount} \u0432\u0438\u0442\u0440\u0430\u0442\u0430\u0445`);
      }
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
