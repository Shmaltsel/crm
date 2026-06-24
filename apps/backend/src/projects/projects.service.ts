import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
  }

  create(data: { name: string; color: string }) {
    return this.prisma.project.create({ data });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
