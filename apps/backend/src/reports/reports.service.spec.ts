import { ReportsService } from './reports.service';
import { SalaryPayoutService } from '../salary/salary-payout.service';
import { NotificationsService } from '../notifications/notifications.service';
import { TelegramService } from '../telegram/telegram.service';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const mockUser = { sub: 'mgr-1', name: 'Менеджер', role: 'MANAGER' } as const;

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
  let payout: SalaryPayoutService;

  beforeEach(() => {
    const built = buildPrisma();
    prisma = built.prisma;
    mockTx = built.mockTx;
    payout = new SalaryPayoutService();
    service = new ReportsService(
      prisma,
      { create: jest.fn() } as unknown as NotificationsService,
      { sendMessage: jest.fn() } as unknown as TelegramService,
      payout,
    );
  });

  describe('approve', () => {
    const setupReport = () => {
      mockTx.eventReport.findUnique.mockResolvedValueOnce({
        status: 'SUBMITTED',
        eventId: 'ev-1',
        event: { crew: true, school: {}, city: {} },
        approvedBy: undefined,
      });
    };

    it('інкрементує balance працівника рівно один раз на фінальну (відредаговану) суму', async () => {
      mockTx.salaryRecord.findMany.mockResolvedValueOnce([
        { id: 's1' },
        { id: 's2' },
      ]);
      setupReport();

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

      expect(mockTx.user.update).toHaveBeenCalledTimes(2);
      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: { id: 'emp-1' },
        data: { balance: { increment: new Prisma.Decimal(1200) } },
      });
      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: { id: 'emp-1' },
        data: { balance: { increment: new Prisma.Decimal(900) } },
      });
      expect(mockTx.salaryRecord.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 's1' },
          data: expect.objectContaining({ status: 'PAID' }),
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

    it('допускає порожній salaries, якщо PENDING-записів немає', async () => {
      mockTx.salaryRecord.findMany.mockResolvedValueOnce([]);
      setupReport();

      await service.approve('r-1', { salaries: [] }, mockUser);

      expect(mockTx.user.update).not.toHaveBeenCalled();
    });
  });

  describe('reject / requestRevision', () => {
    it('reject переводить PENDING SalaryRecord у CANCELLED', async () => {
      mockTx.eventReport.findUnique.mockResolvedValueOnce({
        status: 'SUBMITTED',
        eventId: 'ev-1',
        event: { crew: true },
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
        event: { crew: true },
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
