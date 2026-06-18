import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EventsService {
  async create(data: any) {
    return prisma.event.create({
      data: {
        ...data,
        status: 'BASE',
        date: new Date(data.date),
        history: {
          create: {
            action: 'Створено подію. Етап: База',
            userId: 'superadmin-123',
            userName: 'Андрій (Суперадмін)',
            role: 'SUPERADMIN'
          }
        }
      },
      include: { history: true }
    });
  }

  // Додайте цей метод до існуючих в EventsService
  async updatePreparationStatus(eventId: string, field: string, status: string) {
    const existing = await prisma.eventPreparation.findUnique({ where: { eventId } });
    
    if (existing) {
      return prisma.eventPreparation.update({
        where: { eventId },
        data: { [field]: status }
      });
    } else {
      return prisma.eventPreparation.create({
        data: { eventId, [field]: status }
      });
    }
  }
  async assignCrewToEvent(eventId: string, cityId: string, hostId: string, driverId: string) {
    // Створюємо екіпаж під цю подію
    const crew = await prisma.crew.create({
      data: {
        name: 'Екіпаж події',
        cityId: cityId,
        hostId: hostId,
        driverId: driverId
      }
    });

    // Оновлюємо подію, додаючи ID створеного екіпажу
    return prisma.event.update({
      where: { id: eventId },
      data: { crewId: crew.id },
      include: { 
        crew: true, 
        preparation: true, 
        history: { orderBy: { createdAt: 'desc' } } 
      }
    });
  }
  
  async findBySchool(schoolId: string) {
    return prisma.event.findMany({
      where: { schoolId },
      include: { 
        crew: true,
        history: { orderBy: { createdAt: 'desc' } },
        preparation: true // Включаємо підготовку, якщо вона є
      },
      orderBy: { date: 'desc' },
    });
  }

  async updateStatus(eventId: string, newStatus: string, actionName: string, comment?: string) {
    return prisma.event.update({
      where: { id: eventId },
      data: {
        status: newStatus,
        history: {
          create: {
            action: actionName,
            comment: comment || null,
            userId: 'superadmin-123',
            userName: 'Андрій (Суперадмін)',
            role: 'SUPERADMIN'
          }
        }
      },
      include: { crew: true, history: { orderBy: { createdAt: 'desc' } } }
    });
  }

  async updateHistoryComment(historyId: string, comment: string) {
    return prisma.eventHistory.update({
      where: { id: historyId },
      data: { comment: comment || null }
    });
  }
  
  // ОНОВЛЕНО: Тепер метод видалення безпечно видаляє зв'язані дані
  async remove(id: string) {
    // 1. Видаляємо історію події
    await prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    // 2. Видаляємо підготовку події (якщо вона існує)
    await prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    // 3. Тепер спокійно видаляємо саму подію
    return prisma.event.delete({
      where: { id },
    });
  }
}