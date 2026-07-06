import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: { getAllAndOverride: jest.Mock };

  const createContext = (user?: any): ExecutionContext =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    }) as any;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    guard = new RolesGuard(reflector as unknown as Reflector);
  });

  it('якщо requiredRoles відсутні -> true', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);

    const ok = guard.canActivate(createContext({ role: UserRole.MANAGER }));

    expect(ok).toBe(true);
  });

  it('SUPERADMIN проходить незалежно від requiredRoles', () => {
    reflector.getAllAndOverride.mockReturnValueOnce([UserRole.MANAGER]);

    const ok = guard.canActivate(createContext({ role: UserRole.SUPERADMIN }));

    expect(ok).toBe(true);
  });

  it('роль входить у requiredRoles -> true', () => {
    reflector.getAllAndOverride.mockReturnValueOnce([UserRole.MANAGER]);

    const ok = guard.canActivate(createContext({ role: UserRole.MANAGER }));

    expect(ok).toBe(true);
  });

  it('роль не входить у requiredRoles -> ForbiddenException', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.MANAGER]);

    expect(() =>
      guard.canActivate(createContext({ role: UserRole.DRIVER })),
    ).toThrow(ForbiddenException);
    expect(() =>
      guard.canActivate(createContext({ role: UserRole.DRIVER })),
    ).toThrow('Недостатньо прав');
  });

  it('user відсутній -> ForbiddenException', () => {
    reflector.getAllAndOverride.mockReturnValueOnce([UserRole.MANAGER]);

    expect(() => guard.canActivate(createContext(undefined))).toThrow(
      ForbiddenException,
    );
  });
});
