import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService } from '../prisma/prisma.service';
import { ParserService } from './parser.service';
import { EventsService } from '../events/events.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus } from '@nestjs/common';

const mockPrisma = {
  school: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  event: { findMany: jest.fn() },
  schoolContact: { findMany: jest.fn() },
  city: { findUnique: jest.fn() },
  $queryRaw: jest.fn(),
};

const mockParser = {
  parseSchoolData: jest.fn(),
  getAllSchoolsForCity: jest.fn(),
};

const mockEventsService = { remove: jest.fn() };

const mockCache = {
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
};

const makeModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      SchoolsService,
      { provide: PrismaService, useValue: mockPrisma },
      { provide: ParserService, useValue: mockParser },
      { provide: EventsService, useValue: mockEventsService },
      { provide: CACHE_MANAGER, useValue: mockCache },
    ],
  }).compile();

  return module.get<SchoolsService>(SchoolsService);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SchoolsService — create', () => {
  it('створює школу у БД та повертає її', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue(null);

    const service = await makeModule();
    const result = await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    });

    expect(mockPrisma.school.create).toHaveBeenCalledWith({
      data: { name: 'Школа №1', type: 'Школа', cityId: 'city-1' },
    });
    expect(result.id).toBe('school-1');
  });

  it('sourceUrl не потрапляє до БД, але передається в parser', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue({
      address: 'вул.1',
      director: 'Тест',
      childrenCount: 100,
    });
    mockPrisma.school.update.mockResolvedValueOnce(newSchool);

    const service = await makeModule();
    await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      sourceUrl: 'https://example.com/123',
    });

    const createCall = mockPrisma.school.create.mock.calls[0][0].data;
    expect(createCall.sourceUrl).toBeUndefined();

    // Чекаємо на асинхронний парсинг
    await new Promise((r) => setTimeout(r, 10));
    expect(mockParser.parseSchoolData).toHaveBeenCalledWith(
      'Школа №1',
      'https://example.com/123',
      'Школа',
    );
  });

  it('не оновлює БД якщо parser повертає null', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue(null);

    const service = await makeModule();
    await service.create({ name: 'Школа №1', type: 'Школа', cityId: 'city-1' });

    await new Promise((r) => setTimeout(r, 10));
    expect(mockPrisma.school.update).not.toHaveBeenCalled();
  });

  it('не перезаписує вже заповнені поля результатом парсингу', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      address: 'вже вказана адреса',
      director: 'вже вказаний директор',
      childrenCount: 999,
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue({
      address: 'Парсер-адреса',
      director: 'Парсер-директор',
      childrenCount: 100,
    });

    const service = await makeModule();
    await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      address: 'вже вказана адреса',
      director: 'вже вказаний директор',
      childrenCount: 999,
    });

    await new Promise((r) => setTimeout(r, 10));
    // update має не викликатись, бо всі поля вже заповнені
    expect(mockPrisma.school.update).not.toHaveBeenCalled();
  });
});

describe('SchoolsService — findOne', () => {
  it('повертає школу якщо знайдено', async () => {
    const school = {
      id: 'school-1',
      name: 'Школа №1',
      city: { name: 'Львів' },
    };
    mockPrisma.school.findUnique.mockResolvedValueOnce(school);

    const service = await makeModule();
    const result = await service.findOne('school-1');

    expect(result).toMatchObject({ id: 'school-1' });
  });

  it('кешує результат при першому запиті', async () => {
    const school = { id: 'school-1', name: 'Школа №1', city: {} };
    mockPrisma.school.findUnique.mockResolvedValueOnce(school);

    const service = await makeModule();
    await service.findOne('school-1');

    expect(mockCache.set).toHaveBeenCalledWith(
      'school:school-1',
      school,
      15_000,
    );
  });

  it('повертає кешований результат без запиту до БД', async () => {
    const cached = { id: 'school-1', name: 'Кешована школа', city: {} };
    mockCache.get.mockResolvedValueOnce(cached);

    const service = await makeModule();
    const result = await service.findOne('school-1');

    expect(result).toBe(cached);
    expect(mockPrisma.school.findUnique).not.toHaveBeenCalled();
  });

  it('кидає AppException SCHOOL_NOT_FOUND якщо школи не існує', async () => {
    mockPrisma.school.findUnique.mockResolvedValueOnce(null);

    const service = await makeModule();
    await expect(service.findOne('ghost')).rejects.toMatchObject({
      message: 'SCHOOL_NOT_FOUND',
      status: HttpStatus.NOT_FOUND,
    });
  });
});

describe('SchoolsService — update', () => {
  it('оновлює школу та видаляє кеш', async () => {
    const updated = { id: 'school-1', name: 'Нова назва' };
    mockPrisma.school.update.mockResolvedValueOnce(updated);

    const service = await makeModule();
    const result = await service.update('school-1', {
      name: 'Нова назва',
    });

    expect(mockPrisma.school.update).toHaveBeenCalledWith({
      where: { id: 'school-1' },
      data: { name: 'Нова назва' },
    });
    expect(mockCache.del).toHaveBeenCalledWith('school:school-1');
    expect(result.name).toBe('Нова назва');
  });

  it('не передає системні поля (city, id, createdAt, updatedAt) у data', async () => {
    mockPrisma.school.update.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.update('school-1', {
      name: 'Тест',
      city: { id: 'c-1', name: 'Львів' } as any,
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
    } as any);

    const updateData = mockPrisma.school.update.mock.calls[0][0].data;
    expect(updateData.city).toBeUndefined();
    expect(updateData.createdAt).toBeUndefined();
    expect(updateData.updatedAt).toBeUndefined();
    expect(updateData.id).toBeUndefined();
  });
});

describe('SchoolsService — remove', () => {
  it('видаляє всі події школи перед видаленням самої школи', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([
      { id: 'ev-1' },
      { id: 'ev-2' },
    ]);
    mockEventsService.remove.mockResolvedValue({});
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockEventsService.remove).toHaveBeenCalledTimes(2);
    expect(mockEventsService.remove).toHaveBeenCalledWith('ev-1');
    expect(mockEventsService.remove).toHaveBeenCalledWith('ev-2');
    expect(mockPrisma.school.delete).toHaveBeenCalledWith({
      where: { id: 'school-1' },
    });
  });

  it('видаляє школу навіть без подій', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockEventsService.remove).not.toHaveBeenCalled();
    expect(mockPrisma.school.delete).toHaveBeenCalled();
  });

  it('видаляє кеш після видалення школи', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockCache.del).toHaveBeenCalledWith('school:school-1');
  });
});

describe('SchoolsService — getStats', () => {
  it('повертає notConfirmed у statusStats', async () => {
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([{ new: 5, planned: 3, inProgress: 2, notConfirmed: 1, done: 4 }])
      .mockResolvedValueOnce([]);

    const service = await makeModule();
    const result = await service.getStats({});

    expect(result.statusStats.notConfirmed).toBe(1);
    expect(result.statusStats.new).toBe(5);
    expect(result.statusStats.inProgress).toBe(2);
    expect(result.statusStats.done).toBe(4);
  });
});

describe('SchoolsService — searchContacts', () => {
  it('повертає порожній масив якщо query порожній', async () => {
    const service = await makeModule();
    const result = await service.searchContacts('');
    expect(result).toEqual([]);
    expect(mockPrisma.schoolContact.findMany).not.toHaveBeenCalled();
  });

  it('знаходить контакти за номером школи', async () => {
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce([
      {
        schoolNumber: '42',
        contactName: 'Директор Тест',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
    ]);

    const service = await makeModule();
    const results = await service.searchContacts('42');

    expect(results).toHaveLength(1);
    expect(results[0].schoolNumber).toBe('42');
  });

  it("знаходить контакти за ім'ям (часткове співпадіння)", async () => {
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce([
      {
        schoolNumber: '1',
        contactName: 'Марія Іваненко',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
      {
        schoolNumber: '2',
        contactName: 'Петро Коваль',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
    ]);

    const service = await makeModule();
    const results = await service.searchContacts('марія');

    expect(results).toHaveLength(1);
    expect(results[0].contactName).toBe('Марія Іваненко');
  });

  it('повертає не більше 10 результатів', async () => {
    const contacts = Array.from({ length: 20 }, (_, i) => ({
      schoolNumber: String(i + 1),
      contactName: `Тест ${i + 1}`,
      phone: '',
      role: 'Директор',
      city: 'Київ',
    }));
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce(contacts);

    const service = await makeModule();
    // Пошук за словом, що є у всіх
    const results = await service.searchContacts('Тест');

    expect(results.length).toBeLessThanOrEqual(10);
  });
});
