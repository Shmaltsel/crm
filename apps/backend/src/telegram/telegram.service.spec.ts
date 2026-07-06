import { TelegramService } from './telegram.service';
import { UsersService } from '../users/users.service';

// Мокуємо зовнішні залежності, які не потрібні у тестах
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    set: jest.fn().mockResolvedValue(null),
    get: jest.fn().mockResolvedValue(null),
    del: jest.fn().mockResolvedValue(1),
    disconnect: jest.fn(),
  }));
});

jest.mock('node-telegram-bot-api', () => {
  return jest.fn().mockImplementation(() => ({
    sendMessage: jest.fn().mockResolvedValue({}),
    stopPolling: jest.fn().mockResolvedValue(undefined),
    onText: jest.fn(),
  }));
});

const mockUsersService = {
  updateTelegramChatId: jest.fn(),
};

const makeService = () => {
  const service = new TelegramService(
    mockUsersService as unknown as UsersService,
  );
  return service;
};

beforeEach(() => {
  jest.clearAllMocks();
  // Тестове середовище: NODE_ENV=test — бот не ініціалізується
  process.env.NODE_ENV = 'test';
  delete process.env.TELEGRAM_BOT_TOKEN;
});

describe('TelegramService — onModuleInit', () => {
  it('у тестовому середовищі (NODE_ENV=test) не ініціалізує бот', () => {
    process.env.NODE_ENV = 'test';
    const service = makeService();
    service.onModuleInit();

    // this.bot залишається undefined
    expect((service as any).bot).toBeUndefined();
  });

  it('без TELEGRAM_BOT_TOKEN не ініціалізує бот', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.TELEGRAM_BOT_TOKEN;
    const service = makeService();
    service.onModuleInit();

    expect((service as any).bot).toBeUndefined();
  });
});

describe('TelegramService — sendMessage', () => {
  it('не кидає помилку якщо bot не ініціалізований (відразу повертає)', async () => {
    const service = makeService();
    // bot = undefined (тестове середовище)
    await expect(service.sendMessage('123', 'Привіт')).resolves.toBeUndefined();
  });

  it('надсилає повідомлення через bot.sendMessage якщо bot ініціалізований', async () => {
    const service = makeService();
    const mockBot = { sendMessage: jest.fn().mockResolvedValue({}) };
    (service as any).bot = mockBot;

    await service.sendMessage('chat-123', '<b>Тест</b>');

    expect(mockBot.sendMessage).toHaveBeenCalledWith(
      'chat-123',
      '<b>Тест</b>',
      { parse_mode: 'HTML' },
    );
  });

  it('не кидає помилку якщо bot.sendMessage падає (помилка логується)', async () => {
    const service = makeService();
    const mockBot = {
      sendMessage: jest.fn().mockRejectedValue(new Error('Telegram API error')),
    };
    (service as any).bot = mockBot;

    await expect(
      service.sendMessage('chat-123', 'Тест'),
    ).resolves.toBeUndefined();
  });
});

describe('TelegramService — sendWelcome', () => {
  it('надсилає повідомлення зі логіном та паролем', async () => {
    const service = makeService();
    const sendSpy = jest
      .spyOn(service, 'sendMessage')
      .mockResolvedValue(undefined);

    await service.sendWelcome('chat-1', 'Іван', 'ivan@crm.com', 'secret123');

    expect(sendSpy).toHaveBeenCalledTimes(1);
    const [chatId, text] = sendSpy.mock.calls[0];
    expect(chatId).toBe('chat-1');
    expect(text).toContain('ivan@crm.com');
    expect(text).toContain('secret123');
  });

  it('повідомлення містить HTML теги (не plain text)', async () => {
    const service = makeService();
    const sendSpy = jest
      .spyOn(service, 'sendMessage')
      .mockResolvedValue(undefined);

    await service.sendWelcome('chat-1', 'Тест', 'test@crm.com', 'pass');

    const text = sendSpy.mock.calls[0][1];
    expect(text).toContain('<b>');
    expect(text).toContain('<code>');
  });
});

describe('TelegramService — onModuleDestroy', () => {
  it('зупиняє polling бота якщо bot ініціалізований', async () => {
    const service = makeService();
    const mockBot = {
      stopPolling: jest.fn().mockResolvedValue(undefined),
    };
    (service as any).bot = mockBot;

    // Мокуємо redis.get щоб не відкликати lock
    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue('other-instance');

    await service.onModuleDestroy();

    expect(mockBot.stopPolling).toHaveBeenCalled();
  });

  it('не кидає помилку якщо bot не ініціалізований', async () => {
    const service = makeService();
    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue(null);

    await expect(service.onModuleDestroy()).resolves.not.toThrow();
  });

  it('видаляє Redis lock якщо instance є leader', async () => {
    const service = makeService();
    const instanceId = (service as any).instanceId;

    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue(instanceId);
    redis.del = jest.fn().mockResolvedValue(1);

    await service.onModuleDestroy();

    expect(redis.del).toHaveBeenCalledWith('telegram:bot:leader');
  });
});
