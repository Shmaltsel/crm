import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Schools API (integration)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Логін
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = res.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /schools — повертає список', async () => {
    const res = await request(app.getHttpServer())
      .get('/schools')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /schools?minimal=true — повертає мінімальні дані', async () => {
    const res = await request(app.getHttpServer())
      .get('/schools?minimal=true')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /schools — створює школу', async () => {
    const res = await request(app.getHttpServer())
      .post('/schools')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Тестова школа', type: 'Школа', cityId: 'test-city-id' })
      .expect(201);
    expect(res.body.name).toBe('Тестова школа');
  });
});
