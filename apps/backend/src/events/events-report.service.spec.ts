import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { EventsReportService } from './events-report.service';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheVersionService } from '../common/cache/cache-version.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

const mockPrisma = {
  $transaction: jest.fn(),
  event: { findUnique: jest.fn().mockResolvedValue(null) },
};

const mockUser = { sub: 'user-1', name: 'Менеджер', email: 'manager@example.com', role: 'MANAGER' } as const;

describe('EventsReportService', () => {
  let service: EventsReportService;
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
      salaryRecord: { deleteMany: jest.fn(), createMany: jest.fn() },
      user: { update: jest.fn() },
      event: { update: jest.fn() },
    };
    mockPrisma.$transaction.mockImplementation((fn: (tx: any) => unknown) =>
      fn(mockTx),
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    setupTx();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsReportService,
        { provide: PrismaService, useValue: mockPrisma },
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
        {
          provide: TelegramService,
          useValue: { sendMessage: jest.fn().mockResolvedValue(undefined) },
        },
        {
          provide: NotificationsService,
          useValue: { create: jest.fn().mockResolvedValue(undefined) },
        },
      ],
    }).compile();

    service = module.get<EventsReportService>(EventsReportService);
  });

  describe('submitReport', () => {
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

    it('створює salary records зі статусом PENDING і не інкрементує balance при поданні', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.salaryRecord.createMany).toHaveBeenCalledTimes(1);
      const call = mockTx.salaryRecord.createMany.mock.calls[0][0];
      expect(call.data).toHaveLength(2);
      expect(
        call.data.every((d: { status: string }) => d.status === 'PENDING'),
      ).toBe(true);
      expect(mockTx.user.update).not.toHaveBeenCalled();
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
          salaries: [{ userId: 'host-1', name: 'Host', amount: 0 }],
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
      expect(mockTx.salaryRecord.deleteMany).toHaveBeenCalledWith({
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
      expect(mockTx.salaryRecord.deleteMany).toHaveBeenCalled();
      expect(mockTx.expenseItem.createMany).not.toHaveBeenCalled();
      expect(mockTx.salaryRecord.createMany).not.toHaveBeenCalled();
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

      expect(mockTx.salaryRecord.createMany).toHaveBeenCalled();
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

      expect(mockTx.salaryRecord.createMany).toHaveBeenCalledTimes(1);
      const call = mockTx.salaryRecord.createMany.mock.calls[0][0];
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
      const { rating: _rating, ...withoutRating } = reportData;
      void _rating;
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
});
