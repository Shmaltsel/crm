import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotificationsService } from '../notifications/notifications.service';
import { CacheVersionService } from '../common/cache/cache-version.service';

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  eventHistory: { create: jest.fn(), findMany: jest.fn(), update: jest.fn(), deleteMany: jest.fn() },
  eventPreparation: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), deleteMany: jest.fn(), upsert: jest.fn() },
  eventReport: { upsert: jest.fn() },
  expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
  salaryRecord: { deleteMany: jest.fn(), createMany: jest.fn() },
  user: { findUnique: jest.fn(), update: jest.fn() },
  $transaction: jest.fn(),
};

const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = { create: jest.fn().mockResolvedValue(undefined) };
const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' } as const;

describe('Smoke: EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
        { provide: NotificationsService, useValue: mockNotifications },
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
      ],
    }).compile();
    service = module.get(EventsService);
  });

  it('create створює подію зі статусом BASE та записом в історії', async () => {
    const dto = { schoolId: 'school-1', cityId: 'city-1', project: 'Голограма', date: '2025-09-01', price: 5000 };
    mockPrisma.event.create.mockResolvedValueOnce({
      id: 'ev-new',
      schoolId: 'school-1',
      status: 'BASE',
      history: [{ id: 'h-1' }],
    });

    const result = await service.create(dto, mockUser);

    expect(mockPrisma.event.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'BASE' }),
      }),
    );
    expect(result.id).toBe('ev-new');
  });

  it('updateStatus змінює статус і створює запис в історії', async () => {
    mockPrisma.event.update.mockResolvedValueOnce({
      id: 'ev-1',
      status: 'FIRST_CONTACT',
      crew: null,
      history: [],
    });

    const result = await service.updateStatus('ev-1', 'FIRST_CONTACT', 'Дія', undefined, mockUser);

    expect(mockPrisma.event.update).toHaveBeenCalled();
    expect(result.status).toBe('FIRST_CONTACT');
  });
});
