import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

const mockPrisma = {
  event: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  eventHistory: { create: vi.fn(), findMany: vi.fn() },
  eventPreparation: { upsert: vi.fn() },
};

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: { sendMessage: vi.fn() } },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  afterEach(() => vi.clearAllMocks());

  describe('findBySchool', () => {
    it('повертає мінімальні дані при minimal=true', async () => {
      mockPrisma.event.findMany.mockResolvedValue([]);
      await service.findBySchool('school-1', true);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.select).toBeDefined();
      expect(call.include).toBeUndefined();
    });

    it('повертає повні дані при minimal=false', async () => {
      mockPrisma.event.findMany.mockResolvedValue([]);
      await service.findBySchool('school-1', false);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.include).toBeDefined();
      expect(call.select).toBeUndefined();
    });
  });
});
