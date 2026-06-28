import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';

const mockPrisma = {
  school: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  event: { findMany: jest.fn() },
  schoolContact: { findMany: jest.fn() },
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
      ],
    }).compile();

    service = module.get<SchoolsService>(SchoolsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('повертає всі школи', async () => {
      mockPrisma.school.findMany.mockResolvedValue([
        { id: '1', name: 'Школа №1' },
      ]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(mockPrisma.school.findMany).toHaveBeenCalledTimes(1);
    });

    it('minimal=true — select без include', async () => {
      mockPrisma.school.findMany.mockResolvedValue([]);
      await service.findAll(true);
      const call = mockPrisma.school.findMany.mock.calls[0][0];
      expect(call.select).toBeDefined();
      expect(call.include).toBeUndefined();
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
