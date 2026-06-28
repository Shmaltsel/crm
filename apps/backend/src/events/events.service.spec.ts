import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  eventHistory: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  eventPreparation: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  eventReport: { upsert: jest.fn() },
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

const mockTelegram = { sendMessage: jest.fn() };

const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' };

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
      ],
    }).compile();
    service = module.get<EventsService>(EventsService);
  });

  describe('updateStatus', () => {
    it('змінює статус і створює запис в історії', async () => {
      const updatedEvent = {
        id: 'ev-1',
        status: 'FIRST_CONTACT',
        crew: null,
        history: [{ id: 'h-1', action: 'Знайомство', userId: 'user-1' }],
      };
      mockPrisma.event.update.mockResolvedValueOnce(updatedEvent);

      const result = await service.updateStatus('ev-1', 'FIRST_CONTACT', 'Знайомство', 'коментар', mockUser);

      expect(mockPrisma.event.update).toHaveBeenCalledWith({
        where: { id: 'ev-1' },
        data: {
          status: 'FIRST_CONTACT',
          history: {
            create: {
              action: 'Знайомство',
              comment: 'коментар',
              userId: 'user-1',
              userName: 'Менеджер',
              role: 'MANAGER',
            },
          },
        },
        include: expect.any(Object),
      });
      expect(result.status).toBe('FIRST_CONTACT');
    });

    it('зберігає null comment якщо коментар порожній', async () => {
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'FIRST_CONTACT', crew: null, history: [] });

      await service.updateStatus('ev-1', 'FIRST_CONTACT', 'Дія', undefined, mockUser);

      const callData = mockPrisma.event.update.mock.calls[0][0];
      expect(callData.data.history.create.comment).toBeNull();
    });

    it('записує правильного userId з токена', async () => {
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'BASE', crew: null, history: [] });

      await service.updateStatus('ev-1', 'BASE', 'Дія', undefined, { sub: 'driver-99', name: 'Водій', role: 'DRIVER' });

      const callData = mockPrisma.event.update.mock.calls[0][0];
      expect(callData.data.history.create.userId).toBe('driver-99');
      expect(callData.data.history.create.role).toBe('DRIVER');
    });
  });

  describe('addHistoryComment', () => {
    it('створює коментар і повертає подію з оновленою історією', async () => {
      mockPrisma.eventHistory.create.mockResolvedValueOnce({ id: 'h-new' });
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        id: 'ev-1',
        history: [{ id: 'h-new', action: 'Коментар', comment: 'тест' }],
      });

      const result = await service.addHistoryComment('ev-1', 'тест', mockUser);

      expect(mockPrisma.eventHistory.create).toHaveBeenCalledWith({
        data: {
          eventId: 'ev-1',
          action: 'Коментар',
          comment: 'тест',
          userId: 'user-1',
          userName: 'Менеджер',
          role: 'MANAGER',
        },
      });
      expect(result?.history).toHaveLength(1);
    });
  });

  describe('submitReport', () => {
    const reportData = {
      announcementDone: true,
      materialShown: true,
      childrenCount: 100,
      classesCount: 4,
      privilegedCount: 5,
      showingsCount: 2,
      totalSum: 10000,
      schoolSum: 2000,
      remainderSum: 8000,
      rating: 9,
      expenses: [],
      salaries: [
        { userId: 'host-1', amount: 1500 },
        { userId: 'driver-1', amount: 1000 },
      ],
    };

    it('зберігає звіт через upsert', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({ eventId: 'ev-1' });
      mockPrisma.user.update.mockResolvedValue({ id: 'host-1', balance: 1500 });
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1', status: 'REPORT', report: {}, history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.eventReport.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { eventId: 'ev-1' },
          update: expect.objectContaining({ totalSum: 10000, remainderSum: 8000 }),
          create: expect.objectContaining({ totalSum: 10000, remainderSum: 8000 }),
        })
      );
    });

    it('нараховує зарплату користувачам', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.user.update).toHaveBeenCalledTimes(2);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'host-1' },
        data: { balance: { increment: 1500 } },
      });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'driver-1' },
        data: { balance: { increment: 1000 } },
      });
    });

    it('не нараховує зарплату якщо amount = 0', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      await service.submitReport('ev-1', {
        ...reportData,
        salaries: [{ userId: 'host-1', amount: 0 }],
      }, mockUser);

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('змінює статус на REPORT після збереження звіту', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      const result = await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: expect.objectContaining({ status: 'REPORT' }),
        })
      );
      expect(result.status).toBe('REPORT');
    });

    it('не нараховує зарплату якщо salaries порожній', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      await service.submitReport('ev-1', { ...reportData, salaries: [] }, mockUser);

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });

  describe('findBySchool', () => {
    it('minimal=true — використовує select без history/preparation', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findBySchool('school-1', true);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.select).toBeDefined();
      expect(call.include).toBeUndefined();
    });

    it('minimal=false — використовує include з history та preparation', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findBySchool('school-1', false);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.include).toBeDefined();
      expect(call.select).toBeUndefined();
    });
  });
});