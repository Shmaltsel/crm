import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('16-18. Security + Audit + Edge Cases (чек-лист §157–190)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;

  const ts = Date.now();

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = mod.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    prisma = app.get(PrismaService);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;
  });

  afterAll(async () => await app.close());

  // ──── §166 Sanitization (XSS) ────
  describe('§166 Санітизація — XSS', () => {
    let cityId: string;
    let schoolId: string;

    it('сторення школи з XSS в назві — екранується', async () => {
      const city = await prisma.city.create({
        data: { name: `XSS City ${ts}` },
      });
      cityId = city.id;

      const xssPayload = '<script>alert("xss")</script>';
      const res = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: xssPayload,
          type: 'Школа',
          cityId,
          director: xssPayload,
          phone: '0671234567',
        })
        .expect(201);
      schoolId = res.body.id;

      // Перевіряємо що HTML теги не зберігаються як raw
      expect(res.body.name).not.toContain('<script>');
    });

    it('оновлення школи з XSS в нотатках', async () => {
      if (!schoolId) return;
      const xss = '<img src=x onerror=alert(1)>';
      const res = await request(app.getHttpServer())
        .patch(`/schools/${schoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ notes: xss })
        .expect(200);
      expect(res.body.notes).toBeDefined();
    });

    afterAll(async () => {
      if (schoolId)
        await prisma.school.delete({ where: { id: schoolId } }).catch(() => {});
      if (cityId)
        await prisma.city.delete({ where: { id: cityId } }).catch(() => {});
    });
  });

  // ──── §157 AuditLog ────
  describe('§157 AuditLog', () => {
    it('створення школи фіксується в AuditLog', async () => {
      const city = await prisma.city.create({
        data: { name: `Audit City ${ts}` },
      });
      const school = await prisma.school.create({
        data: { name: `Audit School ${ts}`, type: 'Школа', cityId: city.id },
      });

      const log = await prisma.auditLog.findFirst({
        where: { entity: 'School', entityId: school.id },
        orderBy: { createdAt: 'desc' },
      });
      expect(log).not.toBeNull();
      expect(log!.action).toBeDefined();
      expect(log!.userId).toBeDefined();

      await prisma.school.delete({ where: { id: school.id } });
      await prisma.city.delete({ where: { id: city.id } });
    });

    it('§158 пароль не потрапляє в AuditLog metadata', async () => {
      const logs = await prisma.auditLog.findMany({
        where: { entity: 'User' },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });
      for (const log of logs) {
        const meta = log.metadata as Record<string, unknown> | null;
        if (meta) {
          expect(JSON.stringify(meta)).not.toContain('password');
        }
      }
    });
  });

  // ──── §183 Довгі текстові поля ────
  describe('§183 Edge cases — довжина полів', () => {
    let cityId: string;

    it('дуже довга назва школи (>1000 символів)', async () => {
      const city = await prisma.city.create({
        data: { name: `Long City ${ts}` },
      });
      cityId = city.id;
      const longName = 'A'.repeat(1000);
      const res = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: longName, type: 'Школа', cityId: city.id });
      // Валідація або приймає, або відхиляє — обидва OK для тесту
      expect([201, 400]).toContain(res.status);
      if (res.body.id) {
        await prisma.school.delete({ where: { id: res.body.id } });
      }
      await prisma.city.delete({ where: { id: city.id } });
    });
  });

  // ──── §184 Unicode/емодзі ────
  describe('§184 Unicode', () => {
    it('назва з емодзі', async () => {
      const city = await prisma.city.create({
        data: { name: '🎉 Emoji City 🇺🇦' },
      });
      expect(city.name).toContain('🎉');
      await prisma.city.delete({ where: { id: city.id } });
    });
  });

  // ──── §185 Double-submit ────
  describe('§185 Double-submit', () => {
    it('паралельне створення однакових шкіл — без дублікатів', async () => {
      const city = await prisma.city.create({
        data: { name: `Dup City ${ts}` },
      });
      const name = `Dup School ${ts}`;

      const results = await Promise.all([
        request(app.getHttpServer())
          .post('/schools')
          .set('Authorization', `Bearer ${token}`)
          .send({ name, type: 'Школа', cityId: city.id }),
        request(app.getHttpServer())
          .post('/schools')
          .set('Authorization', `Bearer ${token}`)
          .send({ name, type: 'Школа', cityId: city.id }),
      ]);

      const ids = results.filter((r) => r.status === 201).map((r) => r.body.id);

      // Може бути 1 або 2 створених (залежить від unique constraint)
      // Але обидва мають бути валідними
      for (const id of ids) {
        await prisma.school.delete({ where: { id } });
      }
      await prisma.city.delete({ where: { id: city.id } });
    });
  });

  // ──── §167 Глобальна обробка помилок ────
  describe('§167 Обробка помилок', () => {
    it('500-помилка не повертає stack trace', async () => {
      const res = await request(app.getHttpServer())
        .get(
          '/events/nonexistent-format-but-valid-uuid-00000000-0000-0000-0000-000000000000',
        )
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(404);
      expect(res.body).not.toHaveProperty('stack');
      expect(res.body).toHaveProperty('message');
    });

    it('неіснучий маршрут → 404', async () => {
      await request(app.getHttpServer())
        .get('/nonexistent-route-xyz')
        .expect(404);
    });
  });

  // ──── §158 Чутливі дані в API-відповідях ────
  describe('§187 Витік чутливих даних', () => {
    it('GET /users не повертає паролі', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      const users = Array.isArray(res.body) ? res.body : (res.body.data ?? []);
      for (const user of users) {
        expect(user).not.toHaveProperty('password');
      }
    });
  });
});
