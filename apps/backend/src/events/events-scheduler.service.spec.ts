import { EventsSchedulerService } from './events-scheduler.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

const mockPrisma = {
  event: { findMany: jest.fn() },
};
const mockNotifications = {
  create: jest.fn().mockResolvedValue(undefined),
  sendTelegramNotification: jest.fn().mockResolvedValue(undefined),
  sendTelegramToUsers: jest.fn().mockResolvedValue(undefined),
};

const makeService = () =>
  new EventsSchedulerService(
    mockPrisma as unknown as PrismaService,
    mockNotifications as unknown as NotificationsService,
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('EventsSchedulerService', () => {
  describe('checkEventsForTomorrow', () => {
    it('надсилає нагадування ведучому та водію якщо є crew', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const mockEvent = {
        id: 'ev-1',
        project: 'Голограма',
        contactPhone: '0501234567',
        school: { name: 'Школа №1' },
        city: { name: 'Львів' },
        crew: {
          host: { id: 'user-host', telegramChatId: '111', telegramId: null },
          driver: {
            id: 'user-driver',
            telegramChatId: null,
            telegramId: '222',
          },
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([mockEvent]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledTimes(
        2,
      );
      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
        'user-host',
        'EVENT_REMINDER',
        expect.objectContaining({ role: 'ведучий' }),
      );
      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
        'user-driver',
        'EVENT_REMINDER',
        expect.objectContaining({ role: 'водій' }),
      );
    });

    it('не надсилає нагадування якщо crew відсутній', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([
        { id: 'ev-1', project: 'Test', school: {}, city: {}, crew: null },
      ]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockNotifications.sendTelegramNotification).not.toHaveBeenCalled();
    });

    it('не надсилає якщо подій на завтра немає', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockNotifications.sendTelegramNotification).not.toHaveBeenCalled();
    });

    it('запитує події з датою у межах завтра (gte/lte)', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);

      const service = makeService();
      const before = new Date();
      await service.checkEventsForTomorrow();
      const after = new Date();

      const call = mockPrisma.event.findMany.mock.calls[0][0];
      const { gte, lte } = call.where.date;

      expect(gte.getHours()).toBe(0);
      expect(gte.getMinutes()).toBe(0);
      expect(lte.getHours()).toBe(23);
      expect(lte.getMinutes()).toBe(59);
      const tomorrowDate = new Date(before);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      expect(gte.getDate()).toBe(tomorrowDate.getDate());
    });

    it('фільтрує події, виключаючи RE_SALE', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      const service = makeService();
      await service.checkEventsForTomorrow();

      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where.status).toEqual({ not: 'RE_SALE' });
    });

    it('не кидає помилку якщо sendTelegramNotification падає', async () => {
      const event = {
        id: 'ev-1',
        project: 'Тест',
        contactPhone: null,
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        crew: {
          host: { id: 'user-1', telegramChatId: '111', telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);
      mockNotifications.sendTelegramNotification.mockRejectedValueOnce(
        new Error('Telegram API error'),
      );

      const service = makeService();
      await expect(service.checkEventsForTomorrow()).resolves.not.toThrow();
    });
  });

  describe('sendReminder (via checkEventsForTomorrow)', () => {
    it('надсилає нагадування навіть якщо у user немає telegramChatId', async () => {
      const event = {
        id: 'ev-1',
        project: 'Test',
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        contactPhone: null,
        crew: {
          host: { id: 'user-host', telegramChatId: null, telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
        'user-host',
        'EVENT_REMINDER',
        expect.objectContaining({ role: 'ведучий' }),
      );
    });

    it('надсилає обом членам екіпажу якщо обидва мають id', async () => {
      const event = {
        id: 'ev-1',
        project: 'Test',
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        contactPhone: null,
        crew: {
          host: {
            id: 'host-1',
            telegramChatId: 'chatId-999',
            telegramId: 'userId-555',
          },
          driver: {
            id: 'driver-1',
            telegramChatId: 'driver-chat',
            telegramId: null,
          },
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledTimes(
        2,
      );
      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
        'host-1',
        'EVENT_REMINDER',
        expect.objectContaining({ role: 'ведучий' }),
      );
    });

    it('повідомлення містить назву школи та проєкт', async () => {
      const event = {
        id: 'ev-1',
        project: 'Малювайко',
        school: { name: 'Гімназія №5' },
        city: { name: 'Тернопіль' },
        contactPhone: '0671234567',
        crew: {
          host: { id: 'user-1', telegramChatId: '333', telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
        'user-1',
        'EVENT_REMINDER',
        expect.objectContaining({
          schoolName: 'Гімназія №5',
          project: 'Малювайко',
          contactPhone: '0671234567',
        }),
      );
    });
  });
});
