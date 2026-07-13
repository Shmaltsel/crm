import { IssuesService } from './issues.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

const mockPrisma = {
  issueReport: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  event: { findUnique: jest.fn() },
  city: { findUnique: jest.fn() },
  user: { findUnique: jest.fn() },
};

const mockNotifications = {
  create: jest.fn().mockResolvedValue(undefined),
  getAdminIds: jest.fn().mockResolvedValue([]),
  sendTelegramToUsers: jest.fn().mockResolvedValue(undefined),
  sendTelegramNotification: jest.fn().mockResolvedValue(undefined),
};

const makeService = () =>
  new IssuesService(
    mockPrisma as unknown as PrismaService,
    mockNotifications as unknown as NotificationsService,
  );

const baseData = {
  eventId: 'ev-1',
  schoolName: 'Школа №1',
  eventName: 'Голограма',
  message: 'Проблема з обладнанням',
  cityId: 'city-1',
};

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.issueReport.create.mockResolvedValue({
    id: 'issue-1',
    ...baseData,
  });
  mockPrisma.event.findUnique.mockResolvedValue({ id: 'ev-1', crew: null });
  mockPrisma.city.findUnique.mockResolvedValue({ id: 'city-1', users: [] });
});

describe('IssuesService — create', () => {
  it('створює IssueReport у БД з коректними полями', async () => {
    const service = makeService();
    await service.create(baseData);

    expect(mockPrisma.issueReport.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        eventId: 'ev-1',
        schoolName: 'Школа №1',
        eventName: 'Голограма',
        message: 'Проблема з обладнанням',
        cityId: 'city-1',
        deadline: null,
        assignedUserId: null,
        assignedUserName: null,
      }),
    });
  });

  it('конвертує deadline рядок у Date', async () => {
    const service = makeService();
    await service.create({ ...baseData, deadline: '2025-12-31' });

    const { deadline } = mockPrisma.issueReport.create.mock.calls[0][0].data;
    expect(deadline).toBeInstanceOf(Date);
    expect(deadline.getFullYear()).toBe(2025);
  });

  it('надсилає Telegram менеджеру міста', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'mgr-1', name: 'Manager' }],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockNotifications.sendTelegramNotification).toHaveBeenCalledWith(
      'mgr-1',
      'ISSUE_CREATED',
      expect.objectContaining({ schoolName: 'Школа №1' }),
    );
  });

  it('не надсилає менеджеру якщо у міста немає менеджерів', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockNotifications.sendTelegramNotification).not.toHaveBeenCalledWith(
      expect.anything(),
      'ISSUE_CREATED',
      expect.anything(),
    );
  });

  it('надсилає відповідальному якщо assignedUserId є', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'mgr-1', name: 'Manager' }],
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-2',
      assignedUserName: 'Василь',
    });

    const calls = mockNotifications.sendTelegramNotification.mock.calls;
    const assigneeCall = calls.find(
      ([userId, type]: [string, string]) => userId === 'user-2',
    );
    expect(assigneeCall).toBeDefined();
    expect(assigneeCall[1]).toBe('ISSUE_CREATED');
  });

  it('не надсилає дублю якщо менеджер і відповідальний — одна людина', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'user-same', name: 'Один' }],
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-same',
      assignedUserName: 'Один',
    });

    const issueCalls =
      mockNotifications.sendTelegramNotification.mock.calls.filter(
        ([, type]: [string, string]) => type === 'ISSUE_CREATED',
      );
    expect(issueCalls).toHaveLength(1);
  });

  it('включає дедлайн у payload', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'mgr-1', name: 'Manager' }],
    });

    const service = makeService();
    await service.create({ ...baseData, deadline: '2025-06-30' });

    const call = mockNotifications.sendTelegramNotification.mock.calls[0];
    expect(call[2]).toMatchObject({ deadline: '2025-06-30' });
  });

  it('включає відповідального у payload', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'mgr-1', name: 'Manager' }],
    });

    const service = makeService();
    await service.create({ ...baseData, assignedUserName: 'Марія Шевченко' });

    const call = mockNotifications.sendTelegramNotification.mock.calls[0];
    expect(call[2]).toMatchObject({ assigneeName: 'Марія Шевченко' });
  });

  it('включає учасників екіпажу у payload', async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий Іван', telegramId: null },
        driver: { name: 'Водій Петро', telegramId: '123456' },
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'mgr-1', name: 'Manager' }],
    });

    const service = makeService();
    await service.create(baseData);

    const call = mockNotifications.sendTelegramNotification.mock.calls[0];
    expect(call[2].crew).toContain('Ведучий Іван');
    expect(call[2].crew).toContain('Водій Петро');
  });

  it("formatMember: числовий telegramId → лише ім'я (не @mention)", async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий', telegramId: '987654321' },
        driver: null,
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'mgr-1', name: 'Manager' }],
    });

    const service = makeService();
    await service.create(baseData);

    const call = mockNotifications.sendTelegramNotification.mock.calls[0];
    expect(call[2].crew).not.toMatch(/@\d/);
    expect(call[2].crew).toContain('Ведучий');
  });

  it('formatMember: @username telegramId → @mention', async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий', telegramId: '@ivanko' },
        driver: null,
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ id: 'mgr-1', name: 'Manager' }],
    });

    const service = makeService();
    await service.create(baseData);

    const call = mockNotifications.sendTelegramNotification.mock.calls[0];
    expect(call[2].crew).toContain('@ivanko');
  });

  it('повертає створений issue', async () => {
    const service = makeService();
    const result = await service.create(baseData);

    expect(result).toMatchObject({ id: 'issue-1' });
  });
});

describe('IssuesService — findByCityId', () => {
  it('повертає активні проблеми для міста (виключає Виконано)', async () => {
    const issues = [{ id: 'i-1' }, { id: 'i-2' }];
    mockPrisma.issueReport.findMany.mockResolvedValueOnce(issues);

    const service = makeService();
    const result = await service.findByCityId('city-1');

    expect(mockPrisma.issueReport.findMany).toHaveBeenCalledWith({
      where: { cityId: 'city-1', status: { not: 'Виконано' } },
      orderBy: { createdAt: 'desc' },
    });
    expect(result).toHaveLength(2);
  });

  it('повертає порожній масив якщо активних проблем немає', async () => {
    mockPrisma.issueReport.findMany.mockResolvedValueOnce([]);

    const service = makeService();
    const result = await service.findByCityId('city-empty');

    expect(result).toEqual([]);
  });
});

describe('IssuesService — updateStatus', () => {
  it('оновлює статус проблеми', async () => {
    mockPrisma.issueReport.update.mockResolvedValueOnce({
      id: 'i-1',
      status: 'Виконано',
    });

    const service = makeService();
    const result = await service.updateStatus('i-1', 'Виконано');

    expect(mockPrisma.issueReport.update).toHaveBeenCalledWith({
      where: { id: 'i-1' },
      data: { status: 'Виконано' },
    });
    expect(result).toMatchObject({ status: 'Виконано' });
  });

  it('може встановити довільний статус рядком', async () => {
    mockPrisma.issueReport.update.mockResolvedValueOnce({
      id: 'i-2',
      status: 'В процесі',
    });

    const service = makeService();
    await service.updateStatus('i-2', 'В процесі');

    const callData = mockPrisma.issueReport.update.mock.calls[0][0];
    expect(callData.data.status).toBe('В процесі');
  });
});
