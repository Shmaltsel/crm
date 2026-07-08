import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CsrfGuard } from './csrf.guard';
import { SKIP_CSRF_KEY } from './decorators/skip-csrf.decorator';

describe('CsrfGuard', () => {
  let guard: CsrfGuard;
  let reflector: { getAllAndOverride: jest.Mock };

  const createContext = (
    method: string,
    path: string,
    cookies: Record<string, string> = {},
    headers: Record<string, string> = {},
  ): ExecutionContext =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ method, path, cookies, headers }),
      }),
    }) as any;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    guard = new CsrfGuard(reflector as unknown as Reflector);
  });

  it('@SkipCsrf — пропускає без перевірки', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(true);
    const ok = guard.canActivate(createContext('POST', '/some-path', {}, {}));
    expect(ok).toBe(true);
  });

  it('GET/HEAD/OPTIONS пропускає без перевірки', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = guard.canActivate(createContext('GET', '/any-path'));
    expect(ok).toBe(true);
  });

  it('/auth/login пропускає без перевірки', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = guard.canActivate(createContext('POST', '/auth/login'));
    expect(ok).toBe(true);
  });

  it('POST без csrf_token у cookie кидає Forbidden', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    expect(() =>
      guard.canActivate(createContext('POST', '/some-path', {}, {})),
    ).toThrow(ForbiddenException);
  });

  it('POST з cookie але без заголовка кидає Forbidden', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    expect(() =>
      guard.canActivate(
        createContext('POST', '/some-path', { csrf_token: 'token123' }, {}),
      ),
    ).toThrow(ForbiddenException);
  });

  it('POST з неспівпадінням токенів кидає Forbidden', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    expect(() =>
      guard.canActivate(
        createContext(
          'POST',
          '/some-path',
          { csrf_token: 'token123' },
          { 'x-csrf-token': 'wrong' },
        ),
      ),
    ).toThrow(ForbiddenException);
  });

  it('POST зі співпадінням токенів пропускає', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = guard.canActivate(
      createContext(
        'POST',
        '/some-path',
        { csrf_token: 'token123' },
        { 'x-csrf-token': 'token123' },
      ),
    );
    expect(ok).toBe(true);
  });
});
