import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { DaysOffService } from './days-off.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { DayOffRequestsService } from '../day-off-requests/day-off-requests.service';
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

const mockNotifications = {
  create: jest.fn().mockResolvedValue(undefined),
  sendTelegramNotification: jest.fn().mockResolvedValue(undefined),
};

const mockDayOffRequests = {
  create: jest.fn(),
};

const hostUser: JwtUser = {
  sub: 'host-1',
  name: 'Host One',
  email: 'host@example.com',
  role: 'HOST',
  cityId: 'city-1',
};

const driverUser: JwtUser = {
  sub: 'driver-1',
  name: 'Driver One',
  email: 'driver@example.com',
  role: 'DRIVER',
  cityId: 'city-1',
};

const managerUser: JwtUser = {
  sub: 'manager-1',
  name: 'Manager One',
  email: 'manager@example.com',
  role: 'MANAGER',
  cityId: 'city-1',
};

const superAdminUser: JwtUser = {
  sub: 'admin-1',
  name: 'Admin One',
  email: 'admin@example.com',
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
        { provide: NotificationsService, useValue: mockNotifications },
        { provide: DayOffRequestsService, useValue: mockDayOffRequests },
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
      expect(call.where.date.lt).toBeUndefined();
    });

    it('лише to додає where.date.lt (наступний день)', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll(undefined, '2026-07-31');

      const call = mockPrisma.dayOff.findMany.mock.calls[0][0];
      expect(call.where.date.lt).toEqual(new Date(new Date('2026-07-31').getTime() + 86400000));
      expect(call.where.date.lte).toBeUndefined();
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
              lt: new Date(new Date('2026-07-31').getTime() + 86400000),
            },
            user: { cityId: 'city-1' },
          },
        }),
      );
    });
  });

  describe('create', () => {
    it('HOST делегує DayOffRequestsService.create замість прямого створення', async () => {
      mockDayOffRequests.create.mockResolvedValueOnce({
        id: 'req-1',
        status: 'PENDING',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });

      const result = await service.create(
        { date: '2026-07-10', userId: 'another-user' },
        hostUser,
      );

      expect(mockDayOffRequests.create).toHaveBeenCalledWith(
        { date: '2026-07-10' },
        hostUser,
      );
      expect(result.id).toBe('req-1');
    });

    it('DRIVER делегує DayOffRequestsService.create', async () => {
      mockDayOffRequests.create.mockResolvedValueOnce({
        id: 'req-2',
        status: 'PENDING',
        userId: driverUser.sub,
      });

      const result = await service.create({ date: '2026-07-11' }, driverUser);

      expect(mockDayOffRequests.create).toHaveBeenCalledWith(
        { date: '2026-07-11' },
        driverUser,
      );
      expect(result.id).toBe('req-2');
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

    it('для MANAGER/SUPERADMIN не викликає DayOffRequestsService', async () => {
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

      await service.create(
        { date: '2026-07-10', userId: 'host-2' },
        managerUser,
      );

      expect(mockDayOffRequests.create).not.toHaveBeenCalled();
      expect(mockPrisma.dayOff.upsert).toHaveBeenCalled();
    });

    it('HOST делегує DayOffRequestsService.create', async () => {
      mockDayOffRequests.create.mockResolvedValueOnce({
        id: 'req-3',
        status: 'PENDING',
        userId: hostUser.sub,
      });

      const result = await service.create({ date: '2026-07-10' }, hostUser);

      expect(mockDayOffRequests.create).toHaveBeenCalledWith(
        { date: '2026-07-10' },
        hostUser,
      );
      expect(result.id).toBe('req-3');
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
      expect(mockNotifications.sendTelegramNotification).not.toHaveBeenCalled();
    });

    it('менеджера не знайдено -> без telegram', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockNotifications.sendTelegramNotification).not.toHaveBeenCalled();
    });

    it('created -> DAY_OFF_ASSIGNED шаблон', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm1',
        role: 'MANAGER',
        cityId: 'city-1',
      });
      mockNotifications.sendTelegramNotification.mockResolvedValueOnce(undefined);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
        'm1',
        'DAY_OFF_ASSIGNED',
        expect.objectContaining({ staffName: 'Host One' }),
      );
    });

    it('removed -> DAY_OFF_CANCELLED шаблон', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm2',
        role: 'MANAGER',
        cityId: 'city-1',
      });

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'removed',
      );

      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
        'm2',
        'DAY_OFF_CANCELLED',
        expect.objectContaining({ staffName: 'Host One' }),
      );
    });
  });
});
