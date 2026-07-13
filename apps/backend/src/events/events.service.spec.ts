import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotificationsService } from '../notifications/notifications.service';
import { CacheVersionService } from '../common/cache/cache-version.service';

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
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
    upsert: jest.fn(),
  },
  eventReport: { upsert: jest.fn() },
  expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
  salaryRecord: { deleteMany: jest.fn(), createMany: jest.fn() },
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
};

const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = {
  create: jest.fn().mockResolvedValue(undefined),
  sendTelegramNotification: jest.fn().mockResolvedValue(undefined),
  getAdminIds: jest.fn().mockResolvedValue([]),
  sendTelegramToUsers: jest.fn().mockResolvedValue(undefined),
};

const mockUser = {
  sub: 'user-1',
  name: 'Менеджер',
  email: 'manager@example.com',
  role: 'MANAGER',
} as const;

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
        { provide: NotificationsService, useValue: mockNotifications },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(undefined),
            del: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: CacheVersionService,
          useValue: {
            getVersion: jest.fn().mockResolvedValue(0),
            bumpVersion: jest.fn().mockResolvedValue(undefined),
          },
        },
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

      const result = await service.updateStatus(
        'ev-1',
        'FIRST_CONTACT',
        'Знайомство',
        'коментар',
        mockUser,
      );

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
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'FIRST_CONTACT',
        crew: null,
        history: [],
      });

      await service.updateStatus(
        'ev-1',
        'FIRST_CONTACT',
        'Дія',
        undefined,
        mockUser,
      );

      const callData = mockPrisma.event.update.mock.calls[0][0];
      expect(callData.data.history.create.comment).toBeNull();
    });

    it('записує правильного userId з токена', async () => {
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'BASE',
        crew: null,
        history: [],
      });

      await service.updateStatus('ev-1', 'BASE', 'Дія', undefined, {
        sub: 'driver-99',
        name: 'Водій',
        email: 'driver@example.com',
        role: 'DRIVER',
      });

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

  describe('findAllForUser', () => {
    it('MANAGER — без фільтру по crew (порожній where)', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findAllForUser({
        sub: 'mgr-1',
        name: 'Менеджер',
        email: 'manager@example.com',
        role: 'MANAGER',
      });
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where).toEqual({});
    });

    it('HOST — фільтрує за hostId', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findAllForUser({
        sub: 'host-1',
        name: 'Ведучий',
        email: 'host@example.com',
        role: 'HOST',
      });
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where).toEqual({
        crew: { OR: [{ hostId: 'host-1' }, { driverId: 'host-1' }] },
      });
    });

    it('DRIVER — фільтрує за driverId', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findAllForUser({
        sub: 'driver-1',
        name: 'Водій',
        email: 'driver@example.com',
        role: 'DRIVER',
      });
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where).toEqual({
        crew: { OR: [{ hostId: 'driver-1' }, { driverId: 'driver-1' }] },
      });
    });

    it('з пагінацією — повертає data + meta', async () => {
      const fakeEvents = [{ id: 'ev-1' }, { id: 'ev-2' }];
      mockPrisma.event.findMany.mockResolvedValueOnce(fakeEvents);
      mockPrisma.event.count = jest.fn().mockResolvedValueOnce(10);

      const result = await service.findAllForUser(
        {
          sub: 'mgr-1',
          name: 'М',
          email: 'manager@example.com',
          role: 'MANAGER',
        },
        { page: 2, take: 2 } as any,
      );

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect((result as any).data).toHaveLength(2);
      expect((result as any).meta.page).toBe(2);
    });

    it('без пагінації — повертає масив', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([{ id: 'ev-1' }]);
      const result = await service.findAllForUser({
        sub: 'mgr-1',
        name: 'М',
        email: 'manager@example.com',
        role: 'MANAGER',
      });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('create', () => {
    it('створює подію зі статусом BASE та записом в history', async () => {
      const dto = {
        schoolId: 'school-1',
        cityId: 'city-1',
        project: 'Голограма',
        date: '2025-09-01',
        price: 5000,
      };
      mockPrisma.event.create.mockResolvedValueOnce({
        id: 'ev-new',
        schoolId: 'school-1',
        status: 'BASE',
        history: [{ id: 'h-1' }],
      });

      const result = await service.create(dto, mockUser);

      expect(mockPrisma.event.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'BASE',
            history: {
              create: expect.objectContaining({
                userId: 'user-1',
                role: 'MANAGER',
              }),
            },
          }),
        }),
      );
      expect(result.id).toBe('ev-new');
    });

    it("конвертує date рядок у Date об'єкт", async () => {
      mockPrisma.event.create.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 's-1',
        history: [],
      });
      const dto = {
        schoolId: 's-1',
        cityId: 'c-1',
        project: 'Test',
        date: '2025-12-25',
        price: 100,
      };

      await service.create(dto, mockUser);

      const callData = mockPrisma.event.create.mock.calls[0][0].data;
      expect(callData.date).toBeInstanceOf(Date);
      expect(callData.date.getFullYear()).toBe(2025);
    });

    it('інвалідує кеш школи після створення події', async () => {
      mockPrisma.event.create.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-99',
        history: [],
      });
      const cacheDelSpy = jest.spyOn((service as any).cacheManager, 'del');

      await service.create(
        {
          schoolId: 'school-99',
          date: '2025-01-01',
          project: 'T',
          price: 0,
        } as any,
        mockUser,
      );

      expect(cacheDelSpy).toHaveBeenCalledWith(
        'events:school:school-99:minimal',
      );
      expect(cacheDelSpy).toHaveBeenCalledWith('events:school:school-99:full');
    });
  });

  describe('findOne', () => {
    it('повертає подію якщо знайдено', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        id: 'ev-1',
        school: {},
        city: {},
      });
      const result = await service.findOne('ev-1');
      expect(result.id).toBe('ev-1');
    });

    it('кидає AppException EVENT_NOT_FOUND якщо подія не існує', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne('nonexistent')).rejects.toMatchObject({
        message: 'EVENT_NOT_FOUND',
      });
    });
  });

  describe('remove', () => {
    it('видаляє подію разом з history та preparation', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-1',
        crew: null,
        city: { managerId: 'mgr-1' },
        school: { name: 'Школа №1' },
        project: 'Голограма',
        date: new Date('2025-09-01'),
      });
      mockPrisma.eventHistory.deleteMany.mockResolvedValueOnce({ count: 2 });
      mockPrisma.eventPreparation.deleteMany.mockResolvedValueOnce({
        count: 1,
      });
      mockPrisma.salaryRecord.deleteMany.mockResolvedValueOnce({ count: 0 });
      mockPrisma.event.delete.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-1',
      });

      await service.remove('ev-1');

      expect(mockPrisma.eventHistory.deleteMany).toHaveBeenCalledWith({
        where: { eventId: 'ev-1' },
      });
      expect(mockPrisma.eventPreparation.deleteMany).toHaveBeenCalledWith({
        where: { eventId: 'ev-1' },
      });
      expect(mockPrisma.event.delete).toHaveBeenCalledWith({
        where: { id: 'ev-1' },
      });
    });

    it('кидає AppException EVENT_NOT_FOUND якщо подія не існує', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce(null);
      await expect(service.remove('ghost')).rejects.toMatchObject({
        message: 'EVENT_NOT_FOUND',
      });
    });
  });

  describe('getChatIdForUser', () => {
    it('повертає telegramChatId якщо є', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        telegramChatId: '123456',
        telegramId: null,
      });
      const result = await service.getChatIdForUser('user-1');
      expect(result).toBe('123456');
    });

    it('повертає telegramId якщо chatId відсутній і telegramId є числом', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        telegramChatId: null,
        telegramId: '987654321',
      });
      const result = await service.getChatIdForUser('user-1');
      expect(result).toBe('987654321');
    });

    it('повертає null якщо telegramId є username (@handle)', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        telegramChatId: null,
        telegramId: '@myhandle',
      });
      const result = await service.getChatIdForUser('user-1');
      expect(result).toBeNull();
    });

    it('повертає null якщо user не знайдено', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      const result = await service.getChatIdForUser('ghost-id');
      expect(result).toBeNull();
    });
  });

  describe('updatePreparationStatus', () => {
    it('upsert EventPreparation та інвалідує кеш школи', async () => {
      mockPrisma.eventPreparation.upsert = jest
        .fn()
        .mockResolvedValueOnce({ eventId: 'ev-1' });
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        schoolId: 'school-1',
      });
      const cacheDelSpy = jest.spyOn((service as any).cacheManager, 'del');

      await service.updatePreparationStatus('ev-1', 'equipment' as any, 'DONE');

      expect(mockPrisma.eventPreparation.upsert).toHaveBeenCalledWith({
        where: { eventId: 'ev-1' },
        update: { equipment: 'DONE' },
        create: { eventId: 'ev-1', equipment: 'DONE' },
      });
      expect(cacheDelSpy).toHaveBeenCalled();
    });
  });
});
