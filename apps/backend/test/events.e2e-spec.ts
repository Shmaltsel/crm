import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Events API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdEventId: string;
  let schoolId: string;
  let cityId: string;

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

    const citiesRes = await request(app.getHttpServer())
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);
    cityId = citiesRes.body[0]?.id;

    if (cityId) {
      const schoolsRes = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`);
      schoolId = schoolsRes.body[0]?.id;
    }
  });

  afterAll(async () => {
    if (createdEventId) {
      await request(app.getHttpServer())
        .delete(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /events', () => {
    it('повертає список подій з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/events').expect(401);
    });

    it('кожна подія має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const event = res.body[0];
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('project');
        expect(event).toHaveProperty('date');
        expect(event).toHaveProperty('status');
      }
    });
  });

  describe('POST /events', () => {
    it('створює нову подію', async () => {
      if (!schoolId || !cityId) return;

      const res = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Тестова подія E2E',
          date: '2027-01-15',
          time: '10:00',
          schoolId,
          cityId,
          childrenPlanned: 100,
          price: 5000,
          address: 'вул. Тестова 1',
          contactPerson: 'Тест',
          contactPhone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.project).toBe('Тестова подія E2E');
      expect(res.body.status).toBe('BASE');
      createdEventId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/events')
        .send({ project: 'Test' })
        .expect(401);
    });
  });

  describe('GET /events/:id', () => {
    it('повертає подію по id', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdEventId);
    });

    it('повертає 404 для неіснуючої події', async () => {
      await request(app.getHttpServer())
        .get('/events/nonexistent-id-12345')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /events/:id/status', () => {
    it('змінює статус події', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .patch(`/events/${createdEventId}/status`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'FIRST_CONTACT',
          actionName: 'Знайомство',
          comment: 'Тестовий коментар',
        })
        .expect(200);

      expect(res.body.status).toBe('FIRST_CONTACT');
      expect(res.body.history).toBeDefined();
      expect(res.body.history.length).toBeGreaterThan(0);
    });
  });

  describe('GET /events/school/:schoolId', () => {
    it('повертає події школи', async () => {
      if (!schoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true повертає менше полів', async () => {
      if (!schoolId) return;

      const fullRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`);

      const minRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}?minimal=true`)
        .set('Authorization', `Bearer ${token}`);

      if (fullRes.body.length > 0 && minRes.body.length > 0) {
        expect(minRes.body[0]).not.toHaveProperty('history');
        expect(minRes.body[0]).not.toHaveProperty('preparation');
      }
    });
  });

  describe('DELETE /events/:id', () => {
    it('видаляє подію', async () => {
      if (!schoolId || !cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Подія для видалення',
          date: '2027-02-01',
          time: '11:00',
          schoolId,
          cityId,
          childrenPlanned: 50,
          price: 2000,
          address: 'вул. Тест 2',
          contactPerson: 'Тест',
          contactPhone: '0671234568',
        });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
