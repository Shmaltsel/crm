import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockUsersService = { findByEmailWithCity: jest.fn() };
const mockJwtService = { signAsync: jest.fn().mockResolvedValue('signed-jwt') };
const mockPrisma = {
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

const makeService = () =>
  new AuthService(
    mockUsersService as unknown as UsersService,
    mockJwtService as unknown as JwtService,
    mockPrisma as unknown as PrismaService,
  );

const validUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Іван',
  role: 'MANAGER',
  cityId: 'city-1',
  password: 'hashed-password',
  city: { name: 'Львів' },
};

beforeEach(() => {
  jest.clearAllMocks();
  (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  mockPrisma.refreshToken.create.mockResolvedValue({ id: 'rt-1' });
  mockPrisma.refreshToken.update.mockResolvedValue({ id: 'rt-1' });
});

describe('AuthService — login', () => {
  it('повертає access_token, refresh_token та user при успішному логіні', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(validUser);

    const service = makeService();
    const result = await service.login('test@example.com', 'pass123');

    expect(result.access_token).toBe('signed-jwt');
    expect(result.refresh_token).toBeDefined();
    expect(typeof result.refresh_token).toBe('string');
    expect(result.user.id).toBe('user-1');
    expect(result.user.email).toBe('test@example.com');
    expect(result.user.cityName).toBe('Львів');
  });

  it('створює refresh token у БД при логіні', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(validUser);

    const service = makeService();
    await service.login('test@example.com', 'pass123', {
      ip: '127.0.0.1',
      userAgent: 'test-agent',
    });

    expect(mockPrisma.refreshToken.create).toHaveBeenCalledTimes(1);
    const createCall = mockPrisma.refreshToken.create.mock.calls[0][0].data;
    expect(createCall.userId).toBe('user-1');
    expect(createCall.ip).toBe('127.0.0.1');
    expect(createCall.userAgent).toBe('test-agent');
    expect(createCall.tokenHash).toBeDefined();
    expect(createCall.expiresAt).toBeInstanceOf(Date);
  });

  it('кидає AppException INVALID_CREDENTIALS якщо користувача не знайдено', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(null);

    const service = makeService();
    await expect(service.login('nobody@example.com', 'pass')).rejects.toThrow(
      AppException,
    );
    await expect(
      service.login('nobody@example.com', 'pass'),
    ).rejects.toMatchObject({ status: HttpStatus.UNAUTHORIZED });
  });

  it('кидає AppException INVALID_CREDENTIALS якщо пароль невірний', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValue(validUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const service = makeService();
    await expect(service.login('test@example.com', 'wrong')).rejects.toThrow(
      AppException,
    );
  });

  it('порівнює з dummyHash якщо user не знайдено (захист від timing attack)', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValue(null);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const service = makeService();
    try {
      await service.login('ghost@example.com', 'any');
    } catch {}

    // bcrypt.compare має бути викликаний навіть коли user=null
    expect(bcrypt.compare).toHaveBeenCalled();
    const [, hashArg] = (bcrypt.compare as jest.Mock).mock.calls[0];
    // dummyHash починається з $2b$10$
    expect(hashArg).toMatch(/^\$2b\$10\$/);
  });

  it('підписує JWT з коректним payload', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(validUser);

    const service = makeService();
    await service.login('test@example.com', 'pass');

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: 'user-1',
      email: 'test@example.com',
      role: 'MANAGER',
      name: 'Іван',
      cityId: 'city-1',
      cityName: 'Львів',
    });
  });

  it('user без міста — cityName=undefined', async () => {
    const userNoCity = { ...validUser, city: undefined, cityId: null };
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(userNoCity);

    const service = makeService();
    const result = await service.login('test@example.com', 'pass');

    expect(result.user.cityName).toBeUndefined();
  });
});

describe('AuthService — refresh', () => {
  const storedToken = {
    id: 'rt-stored',
    revokedAt: null,
    expiresAt: new Date(Date.now() + 60_000),
    user: {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Іван',
      role: 'MANAGER',
      cityId: 'city-1',
      city: { name: 'Львів' },
    },
  };

  it('повертає нові токени при валідному refresh token', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(storedToken);

    const service = makeService();
    const result = await service.refresh('valid-old-token');

    expect(result.access_token).toBe('signed-jwt');
    expect(result.refresh_token).toBeDefined();
    expect(result.user.id).toBe('user-1');
  });

  it('відкликає старий токен при refresh', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(storedToken);

    const service = makeService();
    await service.refresh('valid-old-token');

    expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith({
      where: { id: 'rt-stored' },
      data: { revokedAt: expect.any(Date) },
    });
  });

  it('кидає AppException якщо токен не знайдено', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(null);

    const service = makeService();
    await expect(service.refresh('unknown-token')).rejects.toThrow(
      AppException,
    );
    await expect(service.refresh('unknown-token')).rejects.toMatchObject({
      status: HttpStatus.UNAUTHORIZED,
    });
  });

  it('кидає AppException якщо токен відкликаний (revokedAt є)', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValue({
      ...storedToken,
      revokedAt: new Date(),
    });

    const service = makeService();
    await expect(service.refresh('revoked-token')).rejects.toThrow(
      AppException,
    );
  });

  it('кидає AppException якщо токен прострочений', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValue({
      ...storedToken,
      expiresAt: new Date(Date.now() - 1000),
    });

    const service = makeService();
    await expect(service.refresh('expired-token')).rejects.toThrow(
      AppException,
    );
  });

  it('хешує токен перед пошуком у БД', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(storedToken);

    const service = makeService();
    await service.refresh('my-plain-token');

    const { tokenHash } =
      mockPrisma.refreshToken.findUnique.mock.calls[0][0].where;
    // sha256 — hex рядок довжиною 64 символи
    expect(tokenHash).toMatch(/^[a-f0-9]{64}$/);
    expect(tokenHash).not.toBe('my-plain-token');
  });
});

describe('AuthService — revokeRefreshToken', () => {
  it('відкликає токен через update', async () => {
    const service = makeService();
    await service.revokeRefreshToken('some-token');

    expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith({
      where: { tokenHash: expect.any(String) },
      data: { revokedAt: expect.any(Date) },
    });
  });

  it('не кидає помилку якщо токен не знайдено (catch → undefined)', async () => {
    mockPrisma.refreshToken.update.mockRejectedValueOnce(
      new Error('Record not found'),
    );

    const service = makeService();
    await expect(
      service.revokeRefreshToken('non-existent'),
    ).resolves.toBeUndefined();
  });
});
