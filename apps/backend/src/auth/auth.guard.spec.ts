import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: { verifyAsync: jest.Mock };

  const createContext = (request: any): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    }) as any;

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() };
    guard = new AuthGuard(jwtService as unknown as JwtService);
  });

  it('бере токен з cookie і встановлює request.user', async () => {
    const req = { cookies: { access_token: 'cookie-token' }, headers: {} };
    jwtService.verifyAsync.mockResolvedValueOnce({ sub: 'u1', role: 'HOST' });

    const ok = await guard.canActivate(createContext(req));

    expect(ok).toBe(true);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('cookie-token', {
      secret: process.env.JWT_SECRET,
    });
    expect(req['user']).toEqual({ sub: 'u1', role: 'HOST' });
  });

  it('без токена кидає UnauthorizedException: Токен не знайдено', async () => {
    const req = { cookies: {}, headers: {} };

    await expect(guard.canActivate(createContext(req))).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    await expect(guard.canActivate(createContext(req))).rejects.toThrow(
      'Токен не знайдено',
    );
  });

  it('при помилці verify кидає UnauthorizedException: Недійсний токен', async () => {
    const req = { cookies: { access_token: 'bad-token' }, headers: {} };
    jwtService.verifyAsync.mockRejectedValue(new Error('bad jwt'));

    await expect(guard.canActivate(createContext(req))).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    await expect(guard.canActivate(createContext(req))).rejects.toThrow(
      'Недійсний токен',
    );
  });

  it('verifyAsync викликається з secret з env', async () => {
    const prev = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';
    const req = { cookies: { access_token: 'cookie-token' }, headers: {} };
    jwtService.verifyAsync.mockResolvedValueOnce({ sub: 'u1' });

    await guard.canActivate(createContext(req));

    expect(jwtService.verifyAsync).toHaveBeenCalledWith('cookie-token', {
      secret: 'test-secret',
    });
    process.env.JWT_SECRET = prev;
  });
});
