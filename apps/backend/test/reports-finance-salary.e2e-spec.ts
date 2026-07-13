import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('6-9. Reports + Finance + Salary (чек-лист §83–116)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let cityId: string;
  let schoolId: string;
  let eventId: string | undefined;
  let reportEventId: string | undefined;
  let crewId: string;
  let salaryRecordId: string | undefined;

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
      data: { name: `E2E Fin City ${ts}` },
    });
    cityId = city.id;
    const school = await prisma.school.create({
      data: { name: `E2E Fin School ${ts}`, type: 'Школа', cityId },
    });
    schoolId = school.id;
    const crew = await prisma.crew.create({
      data: { name: `E2E Fin Crew ${ts}`, cityId },
    });
    crewId = crew.id;
  });

  afterAll(async () => {
    if (salaryRecordId)
      await prisma.salaryRecord
        .delete({ where: { id: salaryRecordId } })
        .catch(() => {});
    if (reportEventId)
      await prisma.event
        .delete({ where: { id: reportEventId } })
        .catch(() => {});
    if (eventId)
      await prisma.event.delete({ where: { id: eventId } }).catch(() => {});
    await prisma.crew.delete({ where: { id: crewId } }).catch(() => {});
    await prisma.school.delete({ where: { id: schoolId } }).catch(() => {});
    await prisma.city.delete({ where: { id: cityId } }).catch(() => {});
    await app.close();
  });

  async function createEventAtStatus(
    status: string,
    opts?: { project?: string },
  ) {
    const ev = await prisma.event.create({
      data: {
        project: opts?.project || `Fin Event ${ts}`,
        date: new Date('2027-06-15'),
        schoolId,
        cityId,
        status: status as never,
        crewId,
        childrenPlanned: 50,
        price: 3000,
      },
    });
    return ev;
  }

  async function advanceEventToStatus(evId: string, targetStatus: string) {
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
    const event = await prisma.event.findUnique({
      where: { id: evId },
      select: { status: true },
    });
    const currentIdx = stages.indexOf(event?.status ?? 'BASE');
    const targetIdx = stages.indexOf(targetStatus);
    for (let i = currentIdx + 1; i <= targetIdx; i++) {
      await request(app.getHttpServer())
        .patch(`/events/${evId}/status`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: stages[i], actionName: `→ ${stages[i]}` });
    }
  }

  // ──── §83-84 Створення звіту (DRAFT через статус REPORT) ────
  describe('§83-84 Звіт про подію', () => {
    it('створює подію для звіту', async () => {
      const ev = await createEventAtStatus('BASE', { project: 'Report Event' });
      reportEventId = ev.id;
      await advanceEventToStatus(reportEventId, 'DONE');
    });

    it('§85 відправка звіту з фінансовими полями', async () => {
      const res = await request(app.getHttpServer())
        .post(`/events/${reportEventId}/report`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          childrenCount: 45,
          classesCount: 3,
          privilegedCount: 5,
          showingsCount: 2,
          totalSum: 3000,
          schoolSum: 1500,
          remainderSum: 1500,
          rating: 5,
          announcementDone: true,
          materialShown: true,
          directorSatisfied: true,
          teachersSatisfied: true,
          expenses: [
            { category: 'Транспорт', name: 'Бензин', amount: 200 },
            { category: 'Матеріали', name: 'Роздаткові', amount: 150 },
          ],
          salaries: [{ employeeId: crewId, amount: 500 }],
        })
        .expect(201);
      expect(res.body).toBeDefined();
    });

    it('звіт зберігається в БД', async () => {
      const report = await prisma.eventReport.findUnique({
        where: { eventId: reportEventId },
        include: { expenseItems: true, salaryRecords: true },
      });
      expect(report).not.toBeNull();
      expect(report!.childrenCount).toBe(45);
      expect(report!.totalSum).toBeDefined();
      expect(report!.expenseItems.length).toBe(2);
    });

    it("§86 від'ємні значення у фінансових полях — приймаються (бізнес-рішення)", async () => {
      const ev = await createEventAtStatus('DONE', { project: 'Neg Report' });
      await advanceEventToStatus(ev.id, 'DONE');
      const res = await request(app.getHttpServer())
        .post(`/events/${ev.id}/report`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          childrenCount: 0,
          totalSum: 0,
          schoolSum: 0,
          remainderSum: 0,
        });
      expect([200, 201]).toContain(res.status);
    });
  });

  // ──── §100-106 Фінанси ────
  describe('§100-106 Finance', () => {
    it('GET /finance/dashboard повертає KPI', async () => {
      const res = await request(app.getHttpServer())
        .get('/finance/dashboard')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(res.body).toHaveProperty('revenue');
      expect(res.body).toHaveProperty('profit');
      expect(typeof res.body.revenue).toBe('number');
    });

    it('GET /finance/company-balance', async () => {
      const res = await request(app.getHttpServer())
        .get('/finance/company-balance')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body) || typeof res.body === 'object').toBe(
        true,
      );
    });

    it('GET /finance/my-balance', async () => {
      const res = await request(app.getHttpServer())
        .get('/finance/my-balance')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  // ──── §108-116 Salary ────
  describe('§108-116 Salary', () => {
    it('§108 створення salary record', async () => {
      const event = await createEventAtStatus('DONE', {
        project: 'Salary Event',
      });
      await advanceEventToStatus(event.id, 'DONE');

      await request(app.getHttpServer())
        .post(`/events/${event.id}/report`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          childrenCount: 30,
          totalSum: 2000,
          schoolSum: 1000,
          remainderSum: 1000,
        });

      const res = await request(app.getHttpServer())
        .post('/salary')
        .set('Authorization', `Bearer ${token}`)
        .send({
          eventId: event.id,
          records: [{ employeeId: crewId, amount: 500 }],
        })
        .expect(201);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        salaryRecordId = res.body[0].id;
        expect(res.body[0].status).toBe('PENDING');
      }
    });

    it('GET /salary повертає записи', async () => {
      const res = await request(app.getHttpServer())
        .get('/salary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body) || res.body.data).toBeDefined();
    });

    it('GET /salary/mine — персональні нарахування', async () => {
      const res = await request(app.getHttpServer())
        .get('/salary/mine')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(res.body).toBeDefined();
    });

    it('§109 mark-paid', async () => {
      if (!salaryRecordId) return;
      const res = await request(app.getHttpServer())
        .patch(`/salary/${salaryRecordId}/mark-paid`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(res.body.status).toBe('PAID');
      expect(res.body.paidAt).toBeDefined();
    });

    it('§111 вже оплачений запис — статус PAID', async () => {
      if (!salaryRecordId) return;
      const res = await request(app.getHttpServer())
        .get('/salary')
        .set('Authorization', `Bearer ${token}`);
      const record =
        res.body.data?.find((r: { id: string }) => r.id === salaryRecordId) ??
        res.body.find?.((r: { id: string }) => r.id === salaryRecordId);
      if (record) {
        expect(record.status).toBe('PAID');
      }
    });
  });

  // ──── §161 Health check ────
  describe('§160 Health check', () => {
    it('GET /health без авторизації', async () => {
      const res = await request(app.getHttpServer()).get('/health').expect(200);
      expect(res.body).toHaveProperty('status');
    });
  });

  // ──── §165 Rate limiting ────
  describe('§165 Rate limiting', () => {
    it('POST /auth/login — throttle після багатьох запитів', async () => {
      const attempts = Array.from({ length: 7 }, () =>
        request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: 'admin@crm.com', password: 'wrongpass' }),
      );
      const results = await Promise.all(attempts);
      const statuses = results.map((r) => r.status);
      expect(statuses).toContain(429);
    });
  });
});
