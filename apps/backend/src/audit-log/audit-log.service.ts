import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PageMetaDto } from '../common/dto/page-meta.dto';

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    userId?: string;
    entity?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    take?: number;
  }) {
    const page = params.page ?? 1;
    const take = params.take ?? 10;
    const skip = (page - 1) * take;

    const where: Record<string, unknown> = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.entity) {
      where.entity = params.entity;
    }

    if (params.dateFrom || params.dateTo) {
      const createdAt: Record<string, Date> = {};
      if (params.dateFrom) createdAt.gte = new Date(params.dateFrom);
      if (params.dateTo) {
        const end = new Date(params.dateTo);
        end.setHours(23, 59, 59, 999);
        createdAt.lte = end;
      }
      where.createdAt = createdAt;
    }

    const [items, totalItems] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    const meta = new PageMetaDto(totalItems, page, take);

    return { items, meta };
  }

  async findEntityTypes(): Promise<string[]> {
    const result = await this.prisma.auditLog.findMany({
      select: { entity: true },
      where: { entity: { not: null } },
      distinct: ['entity'],
      orderBy: { entity: 'asc' },
    });

    return result.map((r) => r.entity as string);
  }
}
