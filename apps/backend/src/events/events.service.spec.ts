import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheVersionService } from '../common/cache/cache-version.service';

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
  expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
  salaryItem: { deleteMany: jest.fn(), createMany: jest.fn() },
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
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

  describe('submitReport', () => {
    let mockTx: any;

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
        { userId: 'host-1', name: 'Ведучий Тест', amount: 1500 },
        { userId: 'driver-1', name: 'Водій Тест', amount: 1000 },
      ],
    };

    const setupTx = () => {
      mockTx = {
        eventReport: { upsert: jest.fn() },
        expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
        salaryItem: { deleteMany: jest.fn(), createMany: jest.fn() },
        user: { update: jest.fn() },
        event: { update: jest.fn() },
      };
      mockPrisma.$transaction.mockImplementation(
        async (fn: (tx: any) => unknown, _opts?: unknown) => fn(mockTx),
      );
    };

    beforeEach(() => {
      setupTx();
    });

    it('зберігає звіт через upsert', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({ eventId: 'ev-1' });
      mockTx.user.update.mockResolvedValue({ id: 'host-1', balance: 1500 });
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.eventReport.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { eventId: 'ev-1' },
          update: expect.objectContaining({
            totalSum: expect.any(Prisma.Decimal),
            remainderSum: expect.any(Prisma.Decimal),
          }),
          create: expect.objectContaining({
            totalSum: expect.any(Prisma.Decimal),
            remainderSum: expect.any(Prisma.Decimal),
          }),
        }),
      );
    });

    it('нараховує зарплату користувачам', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.user.update).toHaveBeenCalledTimes(2);
      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: { id: 'host-1' },
        data: { balance: { increment: 1500 } },
      });
      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: { id: 'driver-1' },
        data: { balance: { increment: 1000 } },
      });
    });

    it('не нараховує зарплату якщо amount = 0', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          salaries: [{ userId: 'host-1', amount: 0 }],
        },
        mockUser,
      );

      expect(mockTx.user.update).not.toHaveBeenCalled();
    });

    it('змінює статус на REPORT після збереження звіту', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      const result = await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: expect.objectContaining({ status: 'REPORT' }),
        }),
      );
      expect(result.status).toBe('REPORT');
    });

    it('не нараховує зарплату якщо salaries порожній', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        { ...reportData, salaries: [] },
        mockUser,
      );

      expect(mockTx.user.update).not.toHaveBeenCalled();
    });

    it('очищує попередні expense/salary записи перед кожною подачею звіту (ідемпотентність редагування)', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({ id: 'report-1' });
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.expenseItem.deleteMany).toHaveBeenCalledWith({
        where: { reportId: 'report-1' },
      });
      expect(mockTx.salaryItem.deleteMany).toHaveBeenCalledWith({
        where: { reportId: 'report-1' },
      });
    });

    it('deleteMany викликається завжди, навіть якщо expenses і salaries порожні', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        { ...reportData, expenses: [], salaries: [] },
        mockUser,
      );

      expect(mockTx.expenseItem.deleteMany).toHaveBeenCalled();
      expect(mockTx.salaryItem.deleteMany).toHaveBeenCalled();
      expect(mockTx.expenseItem.createMany).not.toHaveBeenCalled();
      expect(mockTx.salaryItem.createMany).not.toHaveBeenCalled();
    });

    it('підставляє категорію "Інше" для витрати без вказаної категорії', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        { ...reportData, expenses: [{ name: 'Бензин', amount: 300 }] },
        mockUser,
      );

      const call = mockTx.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].category).toBe('Інше');
    });

    it('конвертує суми витрат у Prisma.Decimal з точністю до копійок', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          expenses: [{ category: 'Транспорт', name: 'Бензин', amount: 349.99 }],
        },
        mockUser,
      );

      const call = mockTx.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].amount).toBeInstanceOf(Prisma.Decimal);
      expect(call.data[0].amount.toString()).toBe('349.99');
    });

    it('обробляє відсутність суми витрати (amount undefined -> 0)', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          expenses: [
            {
              category: 'Інше',
              name: 'Без суми',
              amount: undefined as unknown as number,
            },
          ],
        },
        mockUser,
      );

      const call = mockTx.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].amount.toString()).toBe('0');
    });

    it("не нараховує баланс якщо сума зарплати від'ємна, але запис зберігається", async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          salaries: [{ userId: 'host-1', name: 'Ведучий Тест', amount: 0 }],
        },
        mockUser,
      );

      expect(mockTx.salaryItem.createMany).toHaveBeenCalled();
      expect(mockTx.user.update).not.toHaveBeenCalled();
    });

    it('створює всі salary items одним викликом createMany', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.salaryItem.createMany).toHaveBeenCalledTimes(1);
      const call = mockTx.salaryItem.createMany.mock.calls[0][0];
      expect(call.data).toHaveLength(2);
    });

    it('зберігає totalSum/schoolSum/remainderSum саме такими, як прийшли з фронтенду — бекенд НЕ перераховує арифметику', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          totalSum: 15000,
          schoolSum: 3000,
          remainderSum: 11500,
        },
        mockUser,
      );

      const call = mockTx.eventReport.upsert.mock.calls[0][0];
      expect(Number(call.update.remainderSum)).toBe(11500);
    });

    it('коректно обробляє відсутній rating', async () => {
      const { rating, ...withoutRating } = reportData;
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', withoutRating, mockUser);

      const call = mockTx.eventReport.upsert.mock.calls[0][0];
      expect(call.update.rating).toBeUndefined();
    });

    it('транзакція відкочується при помилці — event.update не виконується', async () => {
      mockTx.eventReport.upsert.mockRejectedValueOnce(new Error('DB error'));
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await expect(
        service.submitReport('ev-1', reportData, mockUser),
      ).rejects.toThrow('DB error');

      expect(mockTx.event.update).not.toHaveBeenCalled();
      expect(mockPrisma.$transaction).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ timeout: 15000 }),
      );
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
        { sub: 'mgr-1', name: 'М', role: 'MANAGER' },
        { page: 2, take: 2 },
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
      });
      mockPrisma.eventHistory.deleteMany.mockResolvedValueOnce({ count: 2 });
      mockPrisma.eventPreparation.deleteMany.mockResolvedValueOnce({
        count: 1,
      });
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
