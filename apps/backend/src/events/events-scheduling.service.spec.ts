import { Test, TestingModule } from '@nestjs/testing';
import { EventsSchedulingService } from './events-scheduling.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const mockTx = {
  event: { update: jest.fn() },
  schoolComment: { create: jest.fn() },
};
const mockPrisma = {
  $transaction: jest.fn((cb: (tx: typeof mockTx) => unknown) => cb(mockTx)),
  user: {
    findUnique: jest.fn(),
  },
};

const mockTelegram = { sendMessage: jest.fn() };

const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' } as const;

describe('EventsSchedulingService', () => {
  let service: EventsSchedulingService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsSchedulingService,
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
      ],
    }).compile();

    service = module.get<EventsSchedulingService>(EventsSchedulingService);
  });

  describe('rescheduleEvent', () => {
    it('оновлює дату, час та додає запис в історію', async () => {
      const updatedEvent = {
        id: 'ev-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { id: 'school-1', name: 'Школа №1' },
        city: { id: 'city-1', name: 'Київ' },
        crew: null,
        history: [{ id: 'h-1', action: 'Подію перенесено' }],
      };
      mockTx.event.update.mockResolvedValueOnce(updatedEvent);

      const result = await service.rescheduleEvent(
        'ev-1',
        '2025-10-15',
        '14:00',
        mockUser,
      );

      expect(mockTx.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: expect.objectContaining({
            date: expect.any(Date),
            time: '14:00',
          }),
        }),
      );
      expect(result.time).toBe('14:00');
    });

    it('надсилає Telegram сповіщення якщо є екіпаж з chatId', async () => {
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { name: 'Школа' },
        city: { name: 'Київ' },
        crew: { hostId: 'host-1', driverId: 'driver-1' },
        history: [],
      });

      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'host-1',
        telegramChatId: '123456',
      });
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'driver-1',
        telegramChatId: '789012',
      });

      await service.rescheduleEvent('ev-1', '2025-10-15', '14:00', mockUser);

      expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(2);
    });

    it('не надсилає сповіщення якщо екіпаж не призначений', async () => {
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { name: 'Школа' },
        city: { name: 'Київ' },
        crew: null,
        history: [],
      });

      await service.rescheduleEvent('ev-1', '2025-10-15', '14:00', mockUser);

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('інвалідує кеш школи після перенесення', async () => {
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { id: 'school-1', name: 'Школа' },
        city: { id: 'city-1', name: 'Київ' },
        crew: null,
        history: [],
      });
      const cacheDelSpy = jest.spyOn((service as any).cacheManager, 'del');

      await service.rescheduleEvent('ev-1', '2025-10-15', '14:00', mockUser);

      expect(cacheDelSpy).toHaveBeenCalledWith(
        'events:school:school-1:minimal',
      );
      expect(cacheDelSpy).toHaveBeenCalledWith('events:school:school-1:full');
    });
  });
});
