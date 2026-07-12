import { SalaryService } from './salary.service';
import { SalaryPayoutService } from './salary-payout.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const mockUser = {
  sub: 'mgr-1',
  name: 'Менеджер',
  email: 'manager@example.com',
  role: 'SUPERADMIN',
} as const;

const mockCityAccess = {
  getManagedCityIds: jest.fn().mockResolvedValue([]),
  assertCityManager: jest.fn().mockResolvedValue(undefined),
};

const mockNotifications = {
  create: jest.fn().mockResolvedValue({}),
};

const mockTelegram = {
  sendMessage: jest.fn().mockResolvedValue(undefined),
};

describe('SalaryService', () => {
  let service: SalaryService;
  let prisma: any;
  let mockTx: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTx = {
      salaryRecord: {
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      user: { update: jest.fn().mockResolvedValue({}) },
    };
    prisma = {
      salaryRecord: mockTx.salaryRecord,
      user: { ...mockTx.user, findUnique: jest.fn().mockResolvedValue({ telegramChatId: null, name: 'Test' }) },
      $transaction: jest.fn((fn: (tx: any) => unknown) => fn(mockTx)),
    };

    service = new SalaryService(prisma, new SalaryPayoutService(), mockCityAccess as any, mockNotifications as any, mockTelegram as any);
  });

  describe('markPaid', () => {
    it('інкрементує balance працівника при позначенні виплаченим', async () => {
      mockTx.salaryRecord.findUnique.mockResolvedValueOnce({
        id: 's1',
        status: 'PENDING',
        amount: new Prisma.Decimal(1500),
        event: { cityId: 'city-1' },
      });
      mockTx.salaryRecord.findUnique.mockResolvedValueOnce({
        employeeId: 'emp-1',
        amount: new Prisma.Decimal(1500),
        status: 'PENDING',
      });

      await service.markPaid('s1', mockUser);

      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: { id: 'emp-1' },
        data: { balance: { increment: new Prisma.Decimal(1500) } },
      });
      expect(mockTx.salaryRecord.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 's1' },
          data: expect.objectContaining({ status: 'PAID' }),
        }),
      );
    });

    it('кидає NotFound, якщо запис не знайдено', async () => {
      mockTx.salaryRecord.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.markPaid('s1', mockUser as any),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('кидає BadRequest, якщо запис не PENDING', async () => {
      mockTx.salaryRecord.findUnique.mockResolvedValueOnce({
        id: 's1',
        status: 'PAID',
        amount: new Prisma.Decimal(1500),
        event: { cityId: 'city-1' },
      });

      await expect(
        service.markPaid('s1', mockUser as any),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
