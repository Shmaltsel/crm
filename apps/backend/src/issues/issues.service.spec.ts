import { IssuesService } from './issues.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

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

const mockTelegram = { sendMessage: jest.fn() };

const makeService = () =>
  new IssuesService(
    mockPrisma as unknown as PrismaService,
    mockTelegram as unknown as TelegramService,
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

  it('надсилає Telegram менеджеру міста якщо є chatId', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-chat-123', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
      'mgr-chat-123',
      expect.stringContaining('Школа №1'),
    );
  });

  it('не надсилає менеджеру якщо у нього немає chatId', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: null, telegramId: '@handle' }],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
  });

  it('надсилає відповідальному якщо assignedUserId є і chatId відрізняється', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      telegramChatId: 'assignee-222',
      telegramId: null,
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-2',
      assignedUserName: 'Василь',
    });

    expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(2);
    const chatIds = mockTelegram.sendMessage.mock.calls.map(
      ([chatId]: [string]) => chatId,
    );
    expect(chatIds).toContain('mgr-111');
    expect(chatIds).toContain('assignee-222');
  });

  it('не надсилає дублю якщо менеджер і відповідальний — одна людина', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'same-chat', telegramId: null }],
    });
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      telegramChatId: 'same-chat',
      telegramId: null,
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-same',
      assignedUserName: 'Один',
    });

    expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('повідомлення містить інформацію про дедлайн якщо він є', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create({ ...baseData, deadline: '2025-06-30' });

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Дедлайн');
  });

  it('включає відповідального у повідомлення', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create({ ...baseData, assignedUserName: 'Марія Шевченко' });

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Марія Шевченко');
  });

  it('включає учасників екіпажу у повідомлення', async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий Іван', telegramId: null },
        driver: { name: 'Водій Петро', telegramId: '123456' },
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Ведучий Іван');
    expect(msg).toContain('Водій Петро');
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
      users: [{ telegramChatId: 'mgr-1', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    // числовий id — не повинно бути @
    expect(msg).not.toMatch(/@\d/);
    expect(msg).toContain('Ведучий');
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
      users: [{ telegramChatId: 'mgr-1', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('@ivanko');
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
