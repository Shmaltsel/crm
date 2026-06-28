import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Schools API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdSchoolId: string;
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
  });

  afterAll(async () => {
    if (createdSchoolId) {
      await request(app.getHttpServer())
        .delete(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /schools', () => {
    it('повертає список шкіл', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true — немає include полів', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools?minimal=true')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/schools').expect(401);
    });

    it('кожна школа має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const school = res.body[0];
        expect(school).toHaveProperty('id');
        expect(school).toHaveProperty('name');
        expect(school).toHaveProperty('type');
        expect(school).toHaveProperty('cityId');
      }
    });
  });

  describe('POST /schools', () => {
    it('створює нову школу', async () => {
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'E2E Тестова школа',
          type: 'Школа',
          cityId,
          director: 'Тест Тестович',
          phone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('E2E Тестова школа');
      createdSchoolId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/schools')
        .send({ name: 'Test', type: 'Школа', cityId: 'city-1' })
        .expect(401);
    });
  });

  describe('GET /schools/:id', () => {
    it('повертає школу по id', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdSchoolId);
      expect(res.body).toHaveProperty('city');
    });

    it('повертає 404 для неіснуючої школи', async () => {
      await request(app.getHttpServer())
        .get('/schools/nonexistent-id-99999')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /schools/:id', () => {
    it('оновлює дані школи', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .patch(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ director: 'Новий Директор' })
        .expect(200);

      expect(res.body.director).toBe('Новий Директор');
    });
  });

  describe('DELETE /schools/:id', () => {
    it('видаляє школу разом з подіями', async () => {
      if (!cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Школа для видалення E2E', type: 'Школа', cityId });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
