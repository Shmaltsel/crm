import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Dashboard API (contract)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;
  });

  afterAll(async () => await app.close());

  describe('GET /dashboard/summary', () => {
    it('повертає summary з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('todayEvents');
      expect(res.body).toHaveProperty('upcomingEvents');
      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('monthlyKpi');
      expect(res.body).toHaveProperty('staleSchools');
      expect(res.body).toHaveProperty('activityFeed');
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/dashboard/summary').expect(401);
    });

    it('funnel містить всі етапи пайплайну', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const stages = [
        'BASE',
        'FIRST_CONTACT',
        'DATE_CONFIRMED',
        'PREPARATION',
        'IN_PROGRESS',
        'DONE',
        'REPORT',
        'RE_SALE',
      ];
      for (const stage of stages) {
        expect(res.body.funnel).toHaveProperty(stage);
      }
    });

    it('monthlyKpi має числові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const kpi = res.body.monthlyKpi;
      expect(typeof kpi.revenue).toBe('number');
      expect(typeof kpi.profit).toBe('number');
      expect(typeof kpi.children).toBe('number');
      expect(typeof kpi.count).toBe('number');
    });

    it('фільтр по cityId повертає коректний результат', async () => {
      const citiesRes = await request(app.getHttpServer())
        .get('/cities')
        .set('Authorization', `Bearer ${token}`);

      const cityId = citiesRes.body[0]?.id;
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .get(`/dashboard/summary?cityId=${cityId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('todayEvents');
    });

    it('todayEvents і upcomingEvents — масиви', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.todayEvents)).toBe(true);
      expect(Array.isArray(res.body.upcomingEvents)).toBe(true);
      expect(Array.isArray(res.body.staleSchools)).toBe(true);
      expect(Array.isArray(res.body.activityFeed)).toBe(true);
    });
  });
});
