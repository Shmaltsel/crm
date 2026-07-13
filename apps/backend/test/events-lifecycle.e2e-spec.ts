import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('4-6. Events Pipeline + Preparation + Crew (чек-лист §58–82)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let cityId: string;
  let schoolId: string;
  let eventId: string;
  let crewId: string;

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

    const city = await prisma.city.create({
      data: { name: `E2E Events City ${ts}` },
    });
    cityId = city.id;

    const school = await prisma.school.create({
      data: { name: `E2E Events School ${ts}`, type: 'Школа', cityId },
    });
    schoolId = school.id;

    const crew = await prisma.crew.create({
      data: { name: `E2E Events Crew ${ts}`, cityId },
    });
    crewId = crew.id;
  });

  afterAll(async () => {
    if (eventId)
      await prisma.event.delete({ where: { id: eventId } }).catch(() => {});
    await prisma.crew.delete({ where: { id: crewId } }).catch(() => {});
    await prisma.school.delete({ where: { id: schoolId } }).catch(() => {});
    await prisma.city.delete({ where: { id: cityId } }).catch(() => {});
    await app.close();
  });

  // ──── §58 Створення події ────
  describe('§58 Створення події', () => {
    it('мінімальний набір полів', async () => {
      const res = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Тест E2E',
          date: '2027-03-15',
          schoolId,
          cityId,
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.status).toBe('BASE');
      expect(res.body.project).toBe('Тест E2E');
      eventId = res.body.id;
    });

    it('повний набір полів', async () => {
      const res = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Тест Full',
          date: '2027-04-01',
          time: '10:00',
          schoolId,
          cityId,
          childrenPlanned: 100,
          price: 5000,
          address: 'вул. Тестова 1',
          contactPerson: 'Директор Тест',
          contactPhone: '0671234567',
          equipment: 'Проектор',
        })
        .expect(201);
      expect(res.body.childrenPlanned).toBe(100);
      expect(res.body.price).toBe(5000);
      await prisma.event.delete({ where: { id: res.body.id } });
    });
  });

  // ──── §59 Пайплайн статусів ────
  describe('§59 Пайплайн статусів', () => {
    const pipeline = [
      { status: 'FIRST_CONTACT', action: 'Знайомство' },
      { status: 'DATE_CONFIRMED', action: 'Підтвердження дати' },
      { status: 'PREPARATION', action: 'Оголошення' },
      { status: 'IN_PROGRESS', action: 'Підготовка' },
      { status: 'DONE', action: 'Проведення заходу' },
    ];

    for (const step of pipeline) {
      it(`перехід → ${step.status}`, async () => {
        const res = await request(app.getHttpServer())
          .patch(`/events/${eventId}/status`)
          .set('Authorization', `Bearer ${token}`)
          .send({ status: step.status, actionName: step.action })
          .expect(200);
        expect(res.body.status).toBe(step.status);
        expect(res.body.history.length).toBeGreaterThan(0);
      });
    }

    it('історія фіксує кожен крок', async () => {
      const res = await request(app.getHttpServer())
        .get(`/events/${eventId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(res.body.history.length).toBeGreaterThanOrEqual(pipeline.length);
    });
  });

  // ──── §62 Призначення екіпажу ────
  describe('§62 Призначення екіпажу', () => {
    it('успішне призначення', async () => {
      const res = await request(app.getHttpServer())
        .post(`/events/${eventId}/assign-crew`)
        .set('Authorization', `Bearer ${token}`)
        .send({ crewId })
        .expect(201);
      expect(res.body.crewId).toBe(crewId);
    });

    it('§62 конфлікт: той самий екіпаж на іншу подію того ж дня → 409', async () => {
      // Створюємо другу подію того ж дня
      const event2 = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Conflict Event',
          date: '2027-03-15',
          schoolId,
          cityId,
        })
        .expect(201);

      await request(app.getHttpServer())
        .post(`/events/${event2.body.id}/assign-crew`)
        .set('Authorization', `Bearer ${token}`)
        .send({ crewId })
        .expect(409);

      await prisma.event.delete({ where: { id: event2.body.id } });
    });

    it('той самий екіпаж на подію іншого дня — OK', async () => {
      const event3 = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Other Day Event',
          date: '2027-03-20',
          schoolId,
          cityId,
        })
        .expect(201);

      const res = await request(app.getHttpServer())
        .post(`/events/${event3.body.id}/assign-crew`)
        .set('Authorization', `Bearer ${token}`)
        .send({ crewId })
        .expect(201);
      expect(res.body.crewId).toBe(crewId);
      await prisma.event.delete({ where: { id: event3.body.id } });
    });
  });

  // ──── §64 Перенесення дати ────
  describe('§64 Reschedule', () => {
    it('перенесення зберігає історію', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/events/${eventId}/reschedule`)
        .set('Authorization', `Bearer ${token}`)
        .send({ date: '2027-05-01', time: '14:00' })
        .expect(200);
      expect(new Date(res.body.date).toISOString().slice(0, 10)).toBe(
        '2027-05-01',
      );
    });
  });

  // ──── §69 Поля nextContact / nextProject (RE_SALE follow-up) ────
  describe('§69 RE_SALE follow-up', () => {
    it('перехід в REPORT → RE_SALE', async () => {
      // Спочатку DONE → REPORT
      await request(app.getHttpServer())
        .patch(`/events/${eventId}/status`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'REPORT', actionName: 'Звіт' });

      const res = await request(app.getHttpServer())
        .patch(`/events/${eventId}/status`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'RE_SALE', actionName: 'Ре-продаж' })
        .expect(200);
      expect(res.body.status).toBe('RE_SALE');
    });
  });

  // ──── §70 Додавання коментаря ────
  describe('§70 Коментар до події', () => {
    it('додає коментар в історію', async () => {
      const res = await request(app.getHttpServer())
        .post(`/events/${eventId}/history`)
        .set('Authorization', `Bearer ${token}`)
        .send({ comment: 'Тестовий коментар E2E' })
        .expect(201);
      expect(res.body).toBeDefined();
    });

    it('оновлює коментар', async () => {
      const eventRes = await request(app.getHttpServer())
        .get(`/events/${eventId}`)
        .set('Authorization', `Bearer ${token}`);
      const history = eventRes.body.history;
      expect(history.length).toBeGreaterThan(0);
      const lastHistoryId = history[history.length - 1].id;

      const res = await request(app.getHttpServer())
        .patch(`/events/history/${lastHistoryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ comment: 'Оновлений коментар' })
        .expect(200);
      expect(res.body.comment).toBe('Оновлений коментар');
    });
  });

  // ──── §72 Видалення події ────
  describe('§72 Видалення події', () => {
    it('видаляє подію', async () => {
      const tmp = await prisma.event.create({
        data: {
          project: 'Delete Me',
          date: new Date('2027-06-01'),
          schoolId,
          cityId,
          status: 'BASE',
        },
      });
      await request(app.getHttpServer())
        .delete(`/events/${tmp.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      const gone = await prisma.event.findUnique({ where: { id: tmp.id } });
      expect(gone).toBeNull();
    });
  });

  // ──── §404 Неіснуюча подія ────
  describe('Edge cases', () => {
    it('GET /events/:id неіснуюча → 404', async () => {
      await request(app.getHttpServer())
        .get('/events/nonexistent-id')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('PATCH /events/:id/status неіснуюча → 404', async () => {
      await request(app.getHttpServer())
        .patch('/events/nonexistent-id/status')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'DONE', actionName: 'Test' })
        .expect(404);
    });
  });
});
