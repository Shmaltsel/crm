import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { DaysOffService } from './days-off.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { AppException } from '../common/exceptions/app.exception';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

const mockPrisma = {
  dayOff: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
  },
};

const mockTelegram = {
  sendMessage: jest.fn(),
};

const hostUser: JwtUser = {
  sub: 'host-1',
  name: 'Host One',
  role: 'HOST',
  cityId: 'city-1',
};

const driverUser: JwtUser = {
  sub: 'driver-1',
  name: 'Driver One',
  role: 'DRIVER',
  cityId: 'city-1',
};

const managerUser: JwtUser = {
  sub: 'manager-1',
  name: 'Manager One',
  role: 'MANAGER',
  cityId: 'city-1',
};

const superAdminUser: JwtUser = {
  sub: 'admin-1',
  name: 'Admin One',
  role: 'SUPERADMIN',
  cityId: null,
};

describe('DaysOffService', () => {
  let service: DaysOffService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DaysOffService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
      ],
    }).compile();

    service = module.get<DaysOffService>(DaysOffService);
  });

  describe('findAll', () => {
    it('без фільтрів формує базовий findMany include+orderBy', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll();

      expect(mockPrisma.dayOff.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          user: { select: { id: true, name: true, role: true, cityId: true } },
        },
        orderBy: { date: 'asc' },
      });
    });

    it('лише from додає where.date.gte', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll('2026-07-01');

      const call = mockPrisma.dayOff.findMany.mock.calls[0][0];
      expect(call.where.date.gte).toEqual(new Date('2026-07-01'));
      expect(call.where.date.lte).toBeUndefined();
    });

    it('лише to додає where.date.lte', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll(undefined, '2026-07-31');

      const call = mockPrisma.dayOff.findMany.mock.calls[0][0];
      expect(call.where.date.lte).toEqual(new Date('2026-07-31'));
      expect(call.where.date.gte).toBeUndefined();
    });

    it('from+to+cityId комбінує всі фільтри', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll('2026-07-01', '2026-07-31', 'city-1');

      expect(mockPrisma.dayOff.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            date: {
              gte: new Date('2026-07-01'),
              lte: new Date('2026-07-31'),
            },
            user: { cityId: 'city-1' },
          },
        }),
      );
    });
  });

  describe('create', () => {
    it('HOST ігнорує dto.userId та використовує currentUser.sub', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd1',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await service.create(
        { date: '2026-07-10', userId: 'another-user' },
        hostUser,
      );

      const upsertArg = mockPrisma.dayOff.upsert.mock.calls[0][0];
      expect(upsertArg.where.userId_date.userId).toBe(hostUser.sub);
      expect(upsertArg.create.userId).toBe(hostUser.sub);
      expect(upsertArg.create.createdBy).toBe(hostUser.sub);
    });

    it('DRIVER також використовує currentUser.sub', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd1',
        userId: driverUser.sub,
        user: {
          id: driverUser.sub,
          name: 'Driver One',
          role: 'DRIVER',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await service.create({ date: '2026-07-11' }, driverUser);

      const upsertArg = mockPrisma.dayOff.upsert.mock.calls[0][0];
      expect(upsertArg.where.userId_date.userId).toBe(driverUser.sub);
      expect(upsertArg.update).toEqual({});
    });

    it('MANAGER без userId отримує USER_ID_REQUIRED', async () => {
      await expect(
        service.create({ date: '2026-07-10' }, managerUser),
      ).rejects.toMatchObject({
        messageKey: 'USER_ID_REQUIRED',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('SUPERADMIN без userId отримує USER_ID_REQUIRED', async () => {
      await expect(
        service.create({ date: '2026-07-10' }, superAdminUser),
      ).rejects.toMatchObject({
        messageKey: 'USER_ID_REQUIRED',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('MANAGER не може призначити вихідний staff з іншого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'host-2',
        role: 'HOST',
        cityId: 'city-2',
      });

      await expect(
        service.create({ date: '2026-07-10', userId: 'host-2' }, managerUser),
      ).rejects.toBeInstanceOf(AppException);
    });

    it('MANAGER може призначити staff свого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'host-2',
        role: 'HOST',
        cityId: 'city-1',
      });
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd2',
        userId: 'host-2',
        user: {
          id: 'host-2',
          name: 'Host Two',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.create(
        { date: '2026-07-10', userId: 'host-2' },
        managerUser,
      );

      expect(result.id).toBe('d2');
    });

    it('SUPERADMIN може призначити staff з будь-якого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'driver-2',
        role: 'DRIVER',
        cityId: 'city-9',
      });
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd3',
        userId: 'driver-2',
        user: {
          id: 'driver-2',
          name: 'Driver Two',
          role: 'DRIVER',
          cityId: 'city-9',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.create(
        { date: '2026-07-10', userId: 'driver-2' },
        superAdminUser,
      );

      expect(result.id).toBe('d3');
    });

    it('цільовий користувач не STAFF -> INVALID_STAFF_USER', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'manager-2',
        role: 'MANAGER',
        cityId: 'city-1',
      });

      await expect(
        service.create(
          { date: '2026-07-10', userId: 'manager-2' },
          superAdminUser,
        ),
      ).rejects.toMatchObject({
        messageKey: 'INVALID_STAFF_USER',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('цільовий користувач не знайдений -> INVALID_STAFF_USER', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.create(
          { date: '2026-07-10', userId: 'missing-user' },
          managerUser,
        ),
      ).rejects.toMatchObject({
        messageKey: 'INVALID_STAFF_USER',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('для role поза whitelist -> AppException', async () => {
      const outsider = { ...hostUser, role: 'ACCOUNTANT' as any };

      await expect(
        service.create({ date: '2026-07-10', userId: 'host-2' }, outsider),
      ).rejects.toBeInstanceOf(AppException);
    });

    it('якщо existing відсутній -> викликає notifyManager(action=created)', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd4',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await service.create({ date: '2026-07-10' }, hostUser);

      expect(notifySpy).toHaveBeenCalledWith(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );
    });

    it('якщо existing є -> notifyManager не викликається (anti-spam)', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'existing-1',
        userId: hostUser.sub,
      });
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'existing-1',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });

      await service.create({ date: '2026-07-10' }, hostUser);

      expect(notifySpy).not.toHaveBeenCalled();
    });

    it('поточна поведінка: минула дата дозволена (без серверної валідації past-date)', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'past-1',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.create({ date: '2000-01-01' }, hostUser);

      expect(result.id).toBe('past-1');
      const upsertArg = mockPrisma.dayOff.upsert.mock.calls[0][0];
      expect(upsertArg.where.userId_date.date).toEqual(new Date('2000-01-01'));
    });

    it('STAFF двічі поспіль на ту саму дату: upsert повертає той самий запис, дубліката не очікується', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: 'same-1', userId: hostUser.sub });
      mockPrisma.dayOff.upsert
        .mockResolvedValueOnce({
          id: 'same-1',
          userId: hostUser.sub,
          user: {
            id: hostUser.sub,
            name: 'Host One',
            role: 'HOST',
            cityId: 'city-1',
          },
        })
        .mockResolvedValueOnce({
          id: 'same-1',
          userId: hostUser.sub,
          user: {
            id: hostUser.sub,
            name: 'Host One',
            role: 'HOST',
            cityId: 'city-1',
          },
        });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const first = await service.create({ date: '2026-07-10' }, hostUser);
      const second = await service.create({ date: '2026-07-10' }, hostUser);

      expect(first.id).toBe('same-1');
      expect(second.id).toBe('same-1');
      expect(mockPrisma.dayOff.upsert).toHaveBeenCalledTimes(2);
      expect(notifySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('якщо dayOff не знайдено -> DAY_OFF_NOT_FOUND', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);

      await expect(service.remove('missing', hostUser)).rejects.toMatchObject({
        messageKey: 'DAY_OFF_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
      });
    });

    it('owner STAFF може видалити свій вихідний', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd10',
        userId: hostUser.sub,
        date: new Date('2026-07-10'),
        user: { name: 'Host One', cityId: 'city-1' },
      });
      mockPrisma.dayOff.delete.mockResolvedValueOnce({});
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.remove('d10', hostUser);

      expect(result).toEqual({ success: true });
      expect(mockPrisma.dayOff.delete).toHaveBeenCalledWith({
        where: { id: 'd10' },
      });
      expect(notifySpy).toHaveBeenCalledWith(
        'city-1',
        'Host One',
        new Date('2026-07-10').toISOString(),
        'removed',
      );
    });

    it('MANAGER (не owner) може видалити тільки у межах свого міста', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd11',
        userId: 'host-2',
        date: new Date('2026-07-12'),
        user: { name: 'Host Two', cityId: 'city-1' },
      });
      mockPrisma.dayOff.delete.mockResolvedValueOnce({});
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.remove('d11', managerUser);

      expect(result).toEqual({ success: true });
    });

    it('MANAGER (не owner) не може видалити у чужому місті', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd12',
        userId: 'host-2',
        date: new Date('2026-07-12'),
        user: { name: 'Host Two', cityId: 'city-9' },
      });

      await expect(service.remove('d12', managerUser)).rejects.toBeInstanceOf(
        AppException,
      );
      expect(mockPrisma.dayOff.delete).not.toHaveBeenCalled();
    });

    it('не owner і не manager/admin -> AppException', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd13',
        userId: 'host-2',
        date: new Date('2026-07-12'),
        user: { name: 'Host Two', cityId: 'city-1' },
      });

      await expect(service.remove('d13', driverUser)).rejects.toBeInstanceOf(
        AppException,
      );
    });
  });

  describe('notifyManager (private)', () => {
    it('cityId=null -> ранній вихід без запитів', async () => {
      await (service as any).notifyManager(
        null,
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockPrisma.user.findFirst).not.toHaveBeenCalled();
      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('менеджера не знайдено -> без telegram', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('пріоритет telegramChatId над telegramId', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm1',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: 'chat-123',
        telegramId: '999999',
      });
      mockTelegram.sendMessage.mockResolvedValueOnce(undefined);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        'chat-123',
        expect.stringContaining('Призначено вихідний'),
      );
    });

    it('fallback на numeric telegramId, якщо telegramChatId відсутній', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm2',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: null,
        telegramId: '123456789',
      });
      mockTelegram.sendMessage.mockResolvedValueOnce(undefined);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'removed',
      );

      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        '123456789',
        expect.stringContaining('Скасовано вихідний'),
      );
    });

    it('не numeric telegramId -> не відправляє', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm3',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: null,
        telegramId: 'abc123',
      });

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('помилка telegramService.sendMessage пробрасывається', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm4',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: 'chat-err',
        telegramId: null,
      });
      mockTelegram.sendMessage.mockRejectedValueOnce(
        new Error('telegram failed'),
      );

      await expect(
        (service as any).notifyManager(
          'city-1',
          'Host One',
          '2026-07-10',
          'created',
        ),
      ).rejects.toThrow('telegram failed');
    });
  });
});
