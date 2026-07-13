import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { JwtUser } from '../interfaces/jwt-user.interface';

@Injectable()
export class CityAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async getManagedCityIds(userId: string): Promise<string[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { cityId: true },
    });
    return user?.cityId ? [user.cityId] : [];
  }

  async assertCityManager(user: JwtUser, cityId: string): Promise<void> {
    if (user.role !== 'MANAGER') return;
    if (user.cityId !== cityId) {
      throw new ForbiddenException('salary.notCityManager');
    }
  }
}
