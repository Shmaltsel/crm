import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const mockPrisma = {
  school: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  event: { findMany: jest.fn() },
  schoolContact: { findMany: jest.fn() },
  $queryRaw: jest.fn(),
};

describe('SchoolsService', () => {
  let service: SchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: EventsService, useValue: { remove: jest.fn() } },
        {
          provide: ParserService,
          useValue: {
            parseSchoolData: jest.fn(),
            getAllSchoolsForCity: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SchoolsService>(SchoolsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('повертає всі школи', async () => {
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([{ id: '1', name: 'Школа №1' }])
        .mockResolvedValueOnce([{ count: BigInt(1) }]);
      const result = await service.findAll({
        skip: 0,
        take: 10,
        page: 1,
      } as any);
      expect(result.data).toHaveLength(1);
      expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(2);
    });

    it('повертає порожній список і totalItems=0, якщо школи відсутні', async () => {
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ count: BigInt(0) }]);
      const result = await service.findAll({
        skip: 0,
        take: 10,
        page: 1,
      } as any);
      expect(result.data).toHaveLength(0);
      expect(result.meta.totalItems).toBe(0);
    });
  });

  describe('findOne', () => {
    it('повертає школу по id', async () => {
      mockPrisma.school.findUnique.mockResolvedValue({
        id: '1',
        name: 'Школа №1',
      });
      const result = await service.findOne('1');
      expect(result?.name).toBe('Школа №1');
    });
  });

  describe('update', () => {
    it('оновлює школу без системних полів', async () => {
      mockPrisma.school.update.mockResolvedValue({
        id: '1',
        name: 'Нова назва',
      });
      await service.update('1', {
        id: '1',
        name: 'Нова назва',
        city: 'Львів',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const call = mockPrisma.school.update.mock.calls[0][0];
      expect(call.data.id).toBeUndefined();
      expect(call.data.city).toBeUndefined();
      expect(call.data.name).toBe('Нова назва');
    });
  });
});
