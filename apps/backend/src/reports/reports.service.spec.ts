import { ReportsService } from './reports.service';
import { NotificationsService } from '../notifications/notifications.service';
import { TelegramService } from '../telegram/telegram.service';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const mockUser = {
  sub: 'mgr-1',
  name: 'Менеджер',
  email: 'manager@example.com',
  role: 'MANAGER',
} as const;

function buildPrisma() {
  const mockTx: any = {
    salaryRecord: {
      findUnique: jest.fn().mockResolvedValue({ employeeId: 'emp-1' }),
      update: jest.fn().mockResolvedValue({}),
      updateMany: jest.fn().mockResolvedValue({}),
      findMany: jest.fn(),
    },
    eventReport: {
      findUnique: jest.fn(),
      update: jest.fn().mockResolvedValue({}),
    },
    event: { update: jest.fn().mockResolvedValue({}) },
    user: { update: jest.fn().mockResolvedValue({}) },
  };

  const prisma: any = {
    salaryRecord: mockTx.salaryRecord,
    eventReport: mockTx.eventReport,
    event: mockTx.event,
    user: mockTx.user,
    $transaction: jest.fn(async (arg: unknown) => {
      if (typeof arg === 'function') return arg(mockTx);
      const ops = arg as unknown[];
      for (const op of ops) await (op as Promise<unknown>);
      return ops;
    }),
  };

  return { prisma, mockTx };
}

describe('ReportsService', () => {
  let service: ReportsService;
  let prisma: any;
  let mockTx: any;

  beforeEach(() => {
    const built = buildPrisma();
    prisma = built.prisma;
    mockTx = built.mockTx;
    service = new ReportsService(
      prisma,
      {
        create: jest.fn(),
        sendTelegramNotification: jest.fn().mockResolvedValue(undefined),
        sendTelegramToUsers: jest.fn().mockResolvedValue(undefined),
        getAdminIds: jest.fn().mockResolvedValue([]),
      } as unknown as NotificationsService,
      { sendMessage: jest.fn() } as unknown as TelegramService,
      { bumpVersion: jest.fn().mockResolvedValue(undefined) } as any,
      { assertCityManager: jest.fn().mockResolvedValue(undefined) } as any,
    );
  });

  describe('approve', () => {
    const setupReport = (overrides = {}) => {
      mockTx.eventReport.findUnique.mockResolvedValueOnce({
        status: 'SUBMITTED',
        eventId: 'ev-1',
        totalSum: 5000,
        schoolSum: 1000,
        remainderSum: 4000,
        expenseItems: [],
        event: { cityId: 'city-1', crew: true, school: {}, city: {} },
        approvedBy: undefined,
        ...overrides,
      });
    };

    it('оновлює суми PENDING-записів і переводить звіт у APPROVED без payout', async () => {
      mockTx.salaryRecord.findMany.mockResolvedValueOnce([
        { id: 's1' },
        { id: 's2' },
      ]);
      setupReport();
      mockTx.eventReport.findUnique.mockResolvedValueOnce({
        status: 'SUBMITTED',
      });

      await service.approve(
        'r-1',
        {
          salaries: [
            { id: 's1', amount: 1200 },
            { id: 's2', amount: 900 },
          ],
        },
        mockUser,
      );

      expect(mockTx.salaryRecord.update).toHaveBeenCalledTimes(2);
      expect(mockTx.salaryRecord.update).toHaveBeenCalledWith({
        where: { id: 's1' },
        data: { amount: new Prisma.Decimal(1200) },
      });
      expect(mockTx.salaryRecord.update).toHaveBeenCalledWith({
        where: { id: 's2' },
        data: { amount: new Prisma.Decimal(900) },
      });
      expect(mockTx.user.update).not.toHaveBeenCalled();
      expect(mockTx.eventReport.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'r-1' },
          data: expect.objectContaining({
            status: 'APPROVED',
            remainderSum: new Prisma.Decimal(1900),
          }),
        }),
      );
      expect(mockTx.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: { status: 'RE_SALE' },
        }),
      );
    });

    it('кидає BadRequest, якщо масив salaries не покриває всі PENDING-записи', async () => {
      mockTx.salaryRecord.findMany.mockResolvedValueOnce([
        { id: 's1' },
        { id: 's2' },
      ]);
      setupReport();

      await expect(
        service.approve(
          'r-1',
          { salaries: [{ id: 's1', amount: 100 }] },
          mockUser as any,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(mockTx.user.update).not.toHaveBeenCalled();
    });

    it('кидає BadRequest, якщо суми зарплат перевищують залишок', async () => {
      mockTx.salaryRecord.findMany.mockResolvedValueOnce([{ id: 's1' }]);
      // totalSum=5000, schoolSum=1000, expenses=0 → available=4000; salary=5000 > 4000
      setupReport({ expenseItems: [] });

      await expect(
        service.approve(
          'r-1',
          { salaries: [{ id: 's1', amount: 5000 }] },
          mockUser as any,
        ),
      ).rejects.toThrow('report.salariesExceedRemainder');
    });

    it('кидає BadRequest, якщо суми зарплат перевищують залишок з урахуванням витрат', async () => {
      mockTx.salaryRecord.findMany.mockResolvedValueOnce([{ id: 's1' }]);
      // totalSum=5000, schoolSum=1000, expenses=2000 → available=2000; salary=2500 > 2000
      setupReport({
        expenseItems: [{ amount: 2000 }],
      });

      await expect(
        service.approve(
          'r-1',
          { salaries: [{ id: 's1', amount: 2500 }] },
          mockUser as any,
        ),
      ).rejects.toThrow('report.salariesExceedRemainder');
    });

    it('допускає порожній salaries, якщо PENDING-записів немає', async () => {
      mockTx.salaryRecord.findMany.mockResolvedValueOnce([]);
      setupReport();
      mockTx.eventReport.findUnique.mockResolvedValueOnce({
        status: 'SUBMITTED',
      });

      await service.approve('r-1', { salaries: [] }, mockUser);

      expect(mockTx.salaryRecord.update).not.toHaveBeenCalled();
      expect(mockTx.user.update).not.toHaveBeenCalled();
    });
  });

  describe('reject / requestRevision', () => {
    const eventWithSchoolAndCity = {
      crew: true,
      school: { name: 'Тестова школа' },
      city: { managerId: 'mgr-1' },
    };

    it('reject переводить PENDING SalaryRecord у CANCELLED', async () => {
      mockTx.eventReport.findUnique.mockResolvedValueOnce({
        status: 'SUBMITTED',
        eventId: 'ev-1',
        event: eventWithSchoolAndCity,
      });

      await service.reject('r-1', { comment: 'причина' }, mockUser);

      expect(mockTx.salaryRecord.updateMany).toHaveBeenCalledWith({
        where: { reportId: 'r-1', status: 'PENDING' },
        data: { status: 'CANCELLED' },
      });
    });

    it('requestRevision переводить PENDING SalaryRecord у CANCELLED', async () => {
      mockTx.eventReport.findUnique.mockResolvedValueOnce({
        status: 'SUBMITTED',
        eventId: 'ev-1',
        event: eventWithSchoolAndCity,
      });

      await service.requestRevision(
        'r-1',
        { comment: 'доопрацювати' },
        mockUser,
      );

      expect(mockTx.salaryRecord.updateMany).toHaveBeenCalledWith({
        where: { reportId: 'r-1', status: 'PENDING' },
        data: { status: 'CANCELLED' },
      });
    });
  });
});
