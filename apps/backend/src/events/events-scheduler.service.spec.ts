import { EventsSchedulerService } from './events-scheduler.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

const mockPrisma = {
  event: { findMany: jest.fn() },
};
const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = { create: jest.fn().mockResolvedValue(undefined) };

const makeService = () =>
  new EventsSchedulerService(
    mockPrisma as unknown as PrismaService,
    mockTelegram as unknown as TelegramService,
    mockNotifications as unknown as NotificationsService,
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('EventsSchedulerService', () => {
  describe('onModuleInit', () => {
    it('викликає scheduleDailyCheck при ініціалізації модуля', () => {
      const service = makeService();
      const spy = jest
        .spyOn(service as any, 'scheduleDailyCheck')
        .mockImplementation(() => {});
      service.onModuleInit();
      expect(spy).toHaveBeenCalled();
    });
  });

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
          host: { telegramChatId: '111', telegramId: null },
          driver: { telegramChatId: null, telegramId: '222' },
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([mockEvent]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(2);
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        '111',
        expect.stringContaining('ведучий'),
      );
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        '222',
        expect.stringContaining('водій'),
      );
    });

    it('не надсилає нагадування якщо crew відсутній', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([
        { id: 'ev-1', project: 'Test', school: {}, city: {}, crew: null },
      ]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('не надсилає якщо подій на завтра немає', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('запитує події з датою у межах завтра (gte/lte)', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);

      const service = makeService();
      const before = new Date();
      await service.checkEventsForTomorrow();
      const after = new Date();

      const call = mockPrisma.event.findMany.mock.calls[0][0];
      const { gte, lte } = call.where.date;

      // gte — початок завтра (00:00)
      expect(gte.getHours()).toBe(0);
      expect(gte.getMinutes()).toBe(0);
      // lte — кінець завтра (23:59)
      expect(lte.getHours()).toBe(23);
      expect(lte.getMinutes()).toBe(59);
      // обидва — завтра
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

    it('не кидає помилку якщо sendMessage падає', async () => {
      const event = {
        id: 'ev-1',
        project: 'Тест',
        contactPhone: null,
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        crew: {
          host: { telegramChatId: '111', telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);
      mockTelegram.sendMessage.mockRejectedValueOnce(
        new Error('Telegram API error'),
      );

      const service = makeService();
      await expect(service.checkEventsForTomorrow()).resolves.not.toThrow();
    });
  });

  describe('sendReminder (via checkEventsForTomorrow)', () => {
    it('не надсилає якщо у user немає telegramChatId і telegramId', async () => {
      const event = {
        id: 'ev-1',
        project: 'Test',
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        contactPhone: null,
        crew: {
          host: { telegramChatId: null, telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('надсилає telegramChatId замість telegramId якщо обидва є', async () => {
      const event = {
        id: 'ev-1',
        project: 'Test',
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        contactPhone: null,
        crew: {
          host: { telegramChatId: 'chatId-999', telegramId: 'userId-555' },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      // chatId має пріоритет
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        'chatId-999',
        expect.any(String),
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
          host: { telegramChatId: '333', telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      const message = mockTelegram.sendMessage.mock.calls[0][1] as string;
      expect(message).toContain('Гімназія №5');
      expect(message).toContain('Малювайко');
      expect(message).toContain('0671234567');
    });
  });
});
