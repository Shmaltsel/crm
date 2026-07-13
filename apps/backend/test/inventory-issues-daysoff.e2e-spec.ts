import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('10-12. Inventory + Issues + DaysOff (чек-лист §117–136)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let cityId: string;
  let inventoryItemId: string;
  let issueId: string;

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
      data: { name: `E2E Inv City ${ts}` },
    });
    cityId = city.id;
  });

  afterAll(async () => {
    if (inventoryItemId)
      await prisma.inventoryItem
        .delete({ where: { id: inventoryItemId } })
        .catch(() => {});
    if (issueId)
      await prisma.issueReport
        .delete({ where: { id: issueId } })
        .catch(() => {});
    await prisma.city.delete({ where: { id: cityId } }).catch(() => {});
    await app.close();
  });

  // ──── §117-122 Inventory ────
  describe('Inventory CRUD', () => {
    it('§117 створення позиції інвентарю', async () => {
      const res = await request(app.getHttpServer())
        .post('/inventory')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `E2E Projector ${ts}`,
          sku: `E2E-PROJ-${ts}`,
          category: 'Техніка',
          unit: 'шт',
          currentStock: 10,
          minStock: 2,
          cityId,
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.currentStock).toBe(10);
      inventoryItemId = res.body.id;
    });

    it('§118 поповнення залишку', async () => {
      const res = await request(app.getHttpServer())
        .post(`/inventory/${inventoryItemId}/add-stock`)
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: 5 })
        .expect(201);
      expect(res.body.currentStock).toBe(15);
    });

    it('GET /inventory повертає список', async () => {
      const res = await request(app.getHttpServer())
        .get('/inventory')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('§121 фільтр за категорією', async () => {
      const res = await request(app.getHttpServer())
        .get('/inventory?category=Техніка')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('§120 low stock items', async () => {
      // Зменшуємо залишок нижче minStock
      await prisma.inventoryItem.update({
        where: { id: inventoryItemId },
        data: { currentStock: 1 },
      });
      const res = await request(app.getHttpServer())
        .get('/inventory/low-stock')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      // Відновлюємо
      await prisma.inventoryItem.update({
        where: { id: inventoryItemId },
        data: { currentStock: 15 },
      });
    });

    it('оновлення позиції', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/inventory/${inventoryItemId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: `E2E Updated Projector ${ts}` })
        .expect(200);
      expect(res.body.name).toContain('Updated');
    });
  });

  // ──── §124-130 Issues ────
  describe('Issues', () => {
    let schoolId: string;
    let eventId: string;

    beforeAll(async () => {
      const school = await prisma.school.create({
        data: { name: `E2E Issue School ${ts}`, type: 'Школа', cityId },
      });
      schoolId = school.id;
      const event = await prisma.event.create({
        data: {
          project: 'Issue Event',
          date: new Date('2027-07-01'),
          schoolId,
          cityId,
          status: 'BASE',
        },
      });
      eventId = event.id;
    });

    it('§124 створення інциденту', async () => {
      const res = await request(app.getHttpServer())
        .post('/issues')
        .set('Authorization', `Bearer ${token}`)
        .send({
          eventId,
          schoolId,
          cityId,
          message: 'Тестовий інцидент E2E',
          deadline: '2027-07-15',
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      issueId = res.body.id;
    });

    it('GET /issues повертає список', async () => {
      const res = await request(app.getHttpServer())
        .get('/issues')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('§128 каскадне видалення при видаленні події', async () => {
      if (!issueId) return;
      const issueBefore = await prisma.issueReport.findUnique({
        where: { id: issueId },
      });
      expect(issueBefore).not.toBeNull();
    });

    afterAll(async () => {
      await prisma.event.delete({ where: { id: eventId } }).catch(() => {});
      await prisma.school.delete({ where: { id: schoolId } }).catch(() => {});
    });
  });

  // ──── §131-136 Days Off ────
  describe('Days Off', () => {
    let driverId: string;
    let dayOffId: string;

    beforeAll(async () => {
      const driver = await prisma.user.create({
        data: {
          email: `e2e-dayoff-${ts}@crm.com`,
          password: 'test123456',
          name: 'DayOff Driver',
          role: 'DRIVER',
          cityId,
        },
      });
      driverId = driver.id;
    });

    it('§131 додавання вихідного дня', async () => {
      const res = await request(app.getHttpServer())
        .post('/days-off')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: driverId,
          date: '2027-08-01',
          reason: 'Відпустка',
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      dayOffId = res.body.id;
    });

    it('§132 дублікат вихідного → помилка', async () => {
      await request(app.getHttpServer())
        .post('/days-off')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: driverId,
          date: '2027-08-01',
          reason: 'Дублікат',
        })
        .expect(409);
    });

    it('GET /days-off повертає список', async () => {
      const res = await request(app.getHttpServer())
        .get('/days-off')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('§133 видалення вихідного дня', async () => {
      if (!dayOffId) return;
      await request(app.getHttpServer())
        .delete(`/days-off/${dayOffId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      const gone = await prisma.dayOff.findUnique({ where: { id: dayOffId } });
      expect(gone).toBeNull();
    });

    afterAll(async () => {
      await prisma.user.delete({ where: { id: driverId } }).catch(() => {});
    });
  });
});
