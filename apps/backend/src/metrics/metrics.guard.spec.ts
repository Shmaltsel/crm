import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { MetricsGuard } from './metrics.guard';

describe('MetricsGuard', () => {
  let guard: MetricsGuard;

  const createContext = (headers: Record<string, string> = {}): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ headers }),
      }),
    }) as any;

  beforeEach(() => {
    guard = new MetricsGuard();
  });

  afterEach(() => {
    delete process.env.METRICS_TOKEN;
  });

  it('без METRICS_TOKEN в env пропускає всі запити', () => {
    const ok = guard.canActivate(createContext({}));
    expect(ok).toBe(true);
  });

  it('з METRICS_TOKEN і правильним X-Metrics-Token пропускає', () => {
    process.env.METRICS_TOKEN = 'secret123';
    const ok = guard.canActivate(createContext({ 'x-metrics-token': 'secret123' }));
    expect(ok).toBe(true);
  });

  it('з METRICS_TOKEN і неправильним X-Metrics-Token кидає Forbidden', () => {
    process.env.METRICS_TOKEN = 'secret123';
    expect(() =>
      guard.canActivate(createContext({ 'x-metrics-token': 'wrong' })),
    ).toThrow(ForbiddenException);
  });

  it('з METRICS_TOKEN і без заголовка кидає Forbidden', () => {
    process.env.METRICS_TOKEN = 'secret123';
    expect(() => guard.canActivate(createContext({}))).toThrow(ForbiddenException);
  });
});
