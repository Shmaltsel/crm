import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth API (contract)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => await app.close());

  describe('POST /auth/login', () => {
    it('повертає токен при правильних даних', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(typeof res.body.access_token).toBe('string');
      expect(res.body.access_token.length).toBeGreaterThan(10);
    });

    it('повертає 401 при невірному паролі', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'wrongpassword' })
        .expect(401);
    });

    it('повертає 401 при невірному email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@crm.com', password: 'admin123' })
        .expect(401);
    });

    it('повертає 400 без email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'admin123' })
        .expect(400);
    });

    it('структура відповіді відповідає контракту', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toMatchObject({
        access_token: expect.any(String),
      });
    });
  });
});
