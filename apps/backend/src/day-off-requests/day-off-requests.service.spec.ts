import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { DayOffRequestsService } from './day-off-requests.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AppException } from '../common/exceptions/app.exception';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { DayOffRequestStatus } from '@prisma/client';

const mockPrisma = {
  dayOffRequest: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  dayOff: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
  },
};

const mockTelegram = {
  sendMessage: jest.fn().mockResolvedValue(undefined),
  sendWithInlineKeyboard: jest.fn(),
  editMessageText: jest.fn(),
  answerCallbackQuery: jest.fn(),
};

const mockNotifications = {
  create: jest.fn().mockResolvedValue(undefined),
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

describe('DayOffRequestsService', () => {
  let service: DayOffRequestsService;

  beforeEach(async () => {
    jest.restoreAllMocks();
    mockTelegram.sendMessage.mockResolvedValue(undefined);
    mockNotifications.create.mockResolvedValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DayOffRequestsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
        { provide: NotificationsService, useValue: mockNotifications },
      ],
    }).compile();

    service = module.get<DayOffRequestsService>(DayOffRequestsService);
  });

  describe('create', () => {
    it('HOST створює запит для себе', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue(null);
      mockPrisma.dayOff.findUnique.mockResolvedValue(null);
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 'manager-1',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: 'chat-mgr',
        telegramId: null,
      });
      mockPrisma.dayOffRequest.create.mockResolvedValue({
        id: 'req-1',
        userId: 'host-1',
        date: new Date('2026-07-15'),
        reason: null,
        status: 'PENDING',
        user: {
          id: 'host-1',
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });

      const result = await service.create({ date: '2026-07-15' }, hostUser);

      expect(mockPrisma.dayOffRequest.create).toHaveBeenCalled();
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        'chat-mgr',
        expect.stringContaining('Запит на вихідний'),
      );
      expect(mockTelegram.sendWithInlineKeyboard).not.toHaveBeenCalled();
      expect(result.id).toBe('req-1');
    });

    it('MANAGER створює запит для staff свого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'host-2',
        role: 'HOST',
        cityId: 'city-1',
      });
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue(null);
      mockPrisma.dayOff.findUnique.mockResolvedValue(null);
      mockPrisma.user.findFirst.mockResolvedValue(null);
      mockPrisma.dayOffRequest.create.mockResolvedValue({
        id: 'req-2',
        userId: 'host-2',
        date: new Date('2026-07-15'),
        reason: 'Відпочинок',
        status: 'PENDING',
        user: {
          id: 'host-2',
          name: 'Host Two',
          role: 'HOST',
          cityId: 'city-1',
        },
      });

      const result = await service.create(
        { date: '2026-07-15', userId: 'host-2', reason: 'Відпочинок' },
        managerUser,
      );

      expect(result.id).toBe('req-2');
      expect(mockPrisma.dayOffRequest.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: 'host-2',
            reason: 'Відпочинок',
          }),
        }),
      );
    });

    it('MANAGER без userId отримує USER_ID_REQUIRED', async () => {
      await expect(
        service.create({ date: '2026-07-15' }, managerUser),
      ).rejects.toMatchObject({
        messageKey: 'USER_ID_REQUIRED',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('MANAGER не може створити запит для staff з іншого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'host-other',
        role: 'HOST',
        cityId: 'city-2',
      });

      await expect(
        service.create(
          { date: '2026-07-15', userId: 'host-other' },
          managerUser,
        ),
      ).rejects.toBeInstanceOf(AppException);
    });

    it('цільовий користувач не STAFF -> INVALID_STAFF_USER', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'manager-2',
        role: 'MANAGER',
        cityId: 'city-1',
      });

      await expect(
        service.create(
          { date: '2026-07-15', userId: 'manager-2' },
          superAdminUser,
        ),
      ).rejects.toMatchObject({
        messageKey: 'INVALID_STAFF_USER',
      });
    });

    it('дублікат запиту на ту саму дату -> DAY_OFF_REQUEST_ALREADY_REVIEWED', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue({
        id: 'existing-req',
        status: 'PENDING',
      });

      await expect(
        service.create({ date: '2026-07-15' }, hostUser),
      ).rejects.toMatchObject({
        messageKey: 'DAY_OFF_REQUEST_ALREADY_REVIEWED',
        status: HttpStatus.CONFLICT,
      });
    });

    it('день вже затверджений -> DAY_OFF_ALREADY_APPROVED', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue(null);
      mockPrisma.dayOff.findUnique.mockResolvedValue({ id: 'dayoff-1' });

      await expect(
        service.create({ date: '2026-07-15' }, hostUser),
      ).rejects.toMatchObject({
        messageKey: 'DAY_OFF_ALREADY_APPROVED',
        status: HttpStatus.CONFLICT,
      });
    });
  });

  describe('findAll', () => {
    it('без фільтрів повертає всі запити', async () => {
      mockPrisma.dayOffRequest.findMany.mockResolvedValue([]);

      await service.findAll();

      expect(mockPrisma.dayOffRequest.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          user: { select: { id: true, name: true, role: true, cityId: true } },
        },
        orderBy: { date: 'asc' },
      });
    });

    it('from+to+cityId комбінує фільтри', async () => {
      mockPrisma.dayOffRequest.findMany.mockResolvedValue([]);

      await service.findAll('2026-07-01', '2026-07-31', 'city-1');

      expect(mockPrisma.dayOffRequest.findMany).toHaveBeenCalledWith(
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

    it('MANAGER бачить лише запити свого міста (ігнорує cityId з query)', async () => {
      mockPrisma.dayOffRequest.findMany.mockResolvedValue([]);

      await service.findAll('2026-07-01', '2026-07-31', 'city-2', managerUser);

      expect(mockPrisma.dayOffRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            user: { cityId: 'city-1' },
          }),
        }),
      );
    });

    it('SUPERADMIN може фільтрувати за будь-яким cityId', async () => {
      mockPrisma.dayOffRequest.findMany.mockResolvedValue([]);

      await service.findAll(
        '2026-07-01',
        '2026-07-31',
        'city-2',
        superAdminUser,
      );

      expect(mockPrisma.dayOffRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            user: { cityId: 'city-2' },
          }),
        }),
      );
    });
  });

  describe('approve', () => {
    it('MANAGER затверджує запит і створює DayOff', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue({
        id: 'req-1',
        userId: 'host-1',
        date: new Date('2026-07-15'),
        status: DayOffRequestStatus.PENDING,
        user: {
          id: 'host-1',
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.dayOff.upsert.mockResolvedValue({ id: 'dayoff-1' });
      mockPrisma.dayOffRequest.update.mockResolvedValue({
        id: 'req-1',
        status: DayOffRequestStatus.APPROVED,
        date: new Date('2026-07-15'),
        managerNote: null,
        user: {
          id: 'host-1',
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'host-1',
        telegramChatId: 'chat-host',
        telegramId: null,
        name: 'Host One',
      });

      const result = await service.approve('req-1', 'manager-1');

      expect(mockPrisma.dayOff.upsert).toHaveBeenCalled();
      expect(mockPrisma.dayOffRequest.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'req-1' },
          data: expect.objectContaining({
            status: DayOffRequestStatus.APPROVED,
            reviewedBy: 'manager-1',
          }),
        }),
      );
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        'chat-host',
        expect.stringContaining('Запит затверджено'),
      );
      expect(result.status).toBe('APPROVED');
    });

    it('запит не знайдено -> DAY_OFF_REQUEST_NOT_FOUND', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue(null);

      await expect(
        service.approve('missing', 'manager-1'),
      ).rejects.toMatchObject({
        messageKey: 'DAY_OFF_REQUEST_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
      });
    });

    it('вже оброблений запит -> DAY_OFF_REQUEST_ALREADY_REVIEWED', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue({
        id: 'req-1',
        status: DayOffRequestStatus.APPROVED,
      });

      await expect(service.approve('req-1', 'manager-1')).rejects.toMatchObject(
        {
          messageKey: 'DAY_OFF_REQUEST_ALREADY_REVIEWED',
          status: HttpStatus.CONFLICT,
        },
      );
    });
  });

  describe('reject', () => {
    it('MANAGER відхиляє запит', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue({
        id: 'req-1',
        userId: 'host-1',
        date: new Date('2026-07-15'),
        status: DayOffRequestStatus.PENDING,
        user: {
          id: 'host-1',
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.dayOffRequest.update.mockResolvedValue({
        id: 'req-1',
        status: DayOffRequestStatus.REJECTED,
        date: new Date('2026-07-15'),
        managerNote: 'Занадто багато вихідних',
        user: {
          id: 'host-1',
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'host-1',
        telegramChatId: 'chat-host',
        telegramId: null,
        name: 'Host One',
      });

      const result = await service.reject(
        'req-1',
        'manager-1',
        'Занадто багато вихідних',
      );

      expect(mockPrisma.dayOffRequest.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: DayOffRequestStatus.REJECTED,
            managerNote: 'Занадто багато вихідних',
          }),
        }),
      );
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        'chat-host',
        expect.stringContaining('Запит відхилено'),
      );
      expect(result.status).toBe('REJECTED');
    });

    it('запит не знайдено -> DAY_OFF_REQUEST_NOT_FOUND', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue(null);

      await expect(
        service.reject('missing', 'manager-1'),
      ).rejects.toMatchObject({
        messageKey: 'DAY_OFF_REQUEST_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
      });
    });

    it('вже оброблений запит -> DAY_OFF_REQUEST_ALREADY_REVIEWED', async () => {
      mockPrisma.dayOffRequest.findUnique.mockResolvedValue({
        id: 'req-1',
        status: DayOffRequestStatus.APPROVED,
      });

      await expect(service.reject('req-1', 'manager-1')).rejects.toMatchObject({
        messageKey: 'DAY_OFF_REQUEST_ALREADY_REVIEWED',
        status: HttpStatus.CONFLICT,
      });
    });
  });
});
