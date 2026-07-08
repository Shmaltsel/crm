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

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }

  async getStats(projectId: string, cityId?: string) {
    const where: Record<string, unknown> = { project: projectId };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      include: {
        report: {
          select: {
            totalSum: true,
            schoolSum: true,
            remainderSum: true,
            rating: true,
          },
        },
      },
    });

    const totalEvents = events.length;
    const completedEvents = events.filter(
      (e) => e.status === 'REPORT' || e.status === 'DONE',
    ).length;
    const totalRevenue = events.reduce(
      (sum, e) => sum + Number(e.report?.totalSum ?? 0),
      0,
    );
    const totalProfit = events.reduce(
      (sum, e) => sum + Number(e.report?.remainderSum ?? 0),
      0,
    );
    const totalSchoolSum = events.reduce(
      (sum, e) => sum + Number(e.report?.schoolSum ?? 0),
      0,
    );
    const rated = events.filter((e) => e.report?.rating);
    const avgRating = rated.length
      ? rated.reduce((sum, e) => sum + Number(e.report!.rating!), 0) /
        rated.length
      : 0;

    return {
      totalEvents,
      completedEvents,
      totalRevenue,
      totalProfit,
      totalSchoolSum,
      avgRating: Math.round(avgRating * 10) / 10,
    };
  }
}
