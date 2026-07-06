import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import {
  OWNERSHIP_KEY,
  OwnedResourceType,
} from '../decorators/check-ownership.decorator';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resourceType = this.reflector.getAllAndOverride<OwnedResourceType>(
      OWNERSHIP_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!resourceType) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // SUPERADMIN бачить усе — перевірка не потрібна
    if (user?.role === 'SUPERADMIN') return true;

    let paramId: string | undefined =
      request.params.id ??
      request.params.schoolId ??
      request.params.eventId ??
      request.params.crewId;

    if (!paramId && request.params.historyId && resourceType === 'event') {
      const history = await this.prisma.eventHistory.findUnique({
        where: { id: request.params.historyId },
        select: { eventId: true },
      });
      if (!history) throw new NotFoundException('Запис історії не знайдено');
      paramId = history.eventId;
    }

    if (!paramId) return true;

    if (user?.role === 'HOST' || user?.role === 'DRIVER') {
      if (resourceType !== 'event') {
        throw new ForbiddenException('Немає доступу до цього типу ресурсу');
      }
      const event = await this.prisma.event.findUnique({
        where: { id: paramId },
        select: { crew: { select: { hostId: true, driverId: true } } },
      });
      if (!event) throw new NotFoundException('Подію не знайдено');
      const isAssigned =
        event.crew?.hostId === user.sub || event.crew?.driverId === user.sub;
      if (!isAssigned) {
        throw new ForbiddenException('Немає доступу до цієї події');
      }
      return true;
    }

    if (user?.role !== 'MANAGER') {
      throw new ForbiddenException('Немає доступу до ресурсу');
    }

    const manager = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    if (!manager?.cityId) {
      throw new ForbiddenException('Менеджер не прив’язаний до міста');
    }

    let resourceCityId: string | null | undefined;

    switch (resourceType) {
      case 'school': {
        const school = await this.prisma.school.findUnique({
          where: { id: paramId },
          select: { cityId: true },
        });
        if (!school) throw new NotFoundException('Заклад не знайдено');
        resourceCityId = school.cityId;
        break;
      }
      case 'event': {
        const event = await this.prisma.event.findUnique({
          where: { id: paramId },
          select: { cityId: true },
        });
        if (!event) throw new NotFoundException('Подію не знайдено');
        resourceCityId = event.cityId;
        break;
      }
      case 'crew': {
        const crew = await this.prisma.crew.findUnique({
          where: { id: paramId },
          select: { cityId: true },
        });
        if (!crew) throw new NotFoundException('Екіпаж не знайдено');
        resourceCityId = crew.cityId;
        break;
      }
      case 'city': {
        resourceCityId = paramId; // сам :id і є cityId
        break;
      }
    }

    if (resourceCityId !== manager.cityId) {
      throw new ForbiddenException('Немає доступу до ресурсу іншого міста');
    }
    return true;
  }
}
