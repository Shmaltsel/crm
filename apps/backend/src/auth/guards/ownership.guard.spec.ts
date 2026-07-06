import {
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OwnershipGuard } from './ownership.guard';
import { PrismaService } from '../../prisma/prisma.service';

describe('OwnershipGuard', () => {
  let guard: OwnershipGuard;
  let reflector: { getAllAndOverride: jest.Mock };
  let prisma: any;

  const createContext = (user: any, params: Record<string, string> = {}) =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user, params }),
      }),
    }) as ExecutionContext;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    prisma = {
      user: { findUnique: jest.fn() },
      school: { findUnique: jest.fn() },
      event: { findUnique: jest.fn() },
      crew: { findUnique: jest.fn() },
      eventHistory: { findUnique: jest.fn() },
    };
    guard = new OwnershipGuard(reflector as unknown as Reflector, prisma);
  });

  it('без metadata ownership -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }),
    );
    expect(ok).toBe(true);
  });

  it('SUPERADMIN -> true без prisma', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    const ok = await guard.canActivate(
      createContext({ role: 'SUPERADMIN', sub: 'a1' }, { id: 'ev1' }),
    );
    expect(ok).toBe(true);
    expect(prisma.event.findUnique).not.toHaveBeenCalled();
  });

  it('без paramId -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }),
    );
    expect(ok).toBe(true);
  });

  it('HOST/DRIVER + resourceType != event -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    await expect(
      guard.canActivate(
        createContext({ role: 'HOST', sub: 'h1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('HOST + event not found -> NotFound', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(
        createContext({ role: 'HOST', sub: 'h1' }, { id: 'e1' }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('DRIVER + event not assigned -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce({
      crew: { hostId: 'h2', driverId: 'd2' },
    });
    await expect(
      guard.canActivate(
        createContext({ role: 'DRIVER', sub: 'd1' }, { id: 'e1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('HOST assigned до event -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce({
      crew: { hostId: 'h1', driverId: 'd2' },
    });
    const ok = await guard.canActivate(
      createContext({ role: 'HOST', sub: 'h1' }, { id: 'e1' }),
    );
    expect(ok).toBe(true);
  });

  it('DRIVER assigned до event -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce({
      crew: { hostId: 'h2', driverId: 'd1' },
    });
    const ok = await guard.canActivate(
      createContext({ role: 'DRIVER', sub: 'd1' }, { id: 'e1' }),
    );
    expect(ok).toBe(true);
  });

  it('роль поза MANAGER/HOST/DRIVER/SUPERADMIN -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    await expect(
      guard.canActivate(
        createContext({ role: 'ACCOUNTANT', sub: 'x1' }, { id: 'e1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER без cityId -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: null });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER + school: not found -> NotFound', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.school.findUnique.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('MANAGER + school: city match -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.school.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
    );
    expect(ok).toBe(true);
  });

  it('MANAGER + school: city mismatch -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.school.findUnique.mockResolvedValueOnce({ cityId: 'city-9' });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER + event: city match -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.event.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'e1' }),
    );
    expect(ok).toBe(true);
  });

  it('MANAGER + crew: city mismatch -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('crew');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.crew.findUnique.mockResolvedValueOnce({ cityId: 'city-2' });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'c1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER + city: paramId==manager.cityId -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('city');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'city-1' }),
    );
    expect(ok).toBe(true);
  });

  it('MANAGER + city: paramId!=manager.cityId -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('city');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'city-2' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('historyId резолвиться в eventId для resourceType=event', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.eventHistory.findUnique.mockResolvedValueOnce({ eventId: 'ev-1' });
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.event.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { historyId: 'h-1' }),
    );
    expect(ok).toBe(true);
    expect(prisma.event.findUnique).toHaveBeenCalledWith({
      where: { id: 'ev-1' },
      select: { cityId: true },
    });
  });

  it('historyId не знайдено -> NotFoundException', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.eventHistory.findUnique.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { historyId: 'missing' }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('пріоритет id над schoolId/eventId/crewId', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.event.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    await guard.canActivate(
      createContext(
        { role: 'MANAGER', sub: 'm1' },
        { id: 'event-by-id', eventId: 'event-by-eventId' },
      ),
    );
    expect(prisma.event.findUnique).toHaveBeenCalledWith({
      where: { id: 'event-by-id' },
      select: { cityId: true },
    });
  });
});
