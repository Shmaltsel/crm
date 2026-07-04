import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
  }

  create(data: { name: string; color?: string; pricePerChild?: number }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        color: data.color ?? '#3b82f6',
        pricePerChild: data.pricePerChild ?? 0,
      },
    });
  }

  update(
    id: string,
    data: { name?: string; color?: string; pricePerChild?: number },
  ) {
    return this.prisma.project.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
