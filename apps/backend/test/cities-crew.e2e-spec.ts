import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('2. Cities + Crew (чек-лист §2)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;
  let managerToken: string;

  const ts = Date.now();
  let cityId: string;
  let schoolId: string | undefined;
  let crewId: string | undefined;
  let managerId: string;
  let managerCityId: string;

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
    adminToken = loginRes.body.access_token;

    // Seed manager + city
    const hash = await bcrypt.hash('test123456', 10);
    const mgr = await prisma.user.create({
      data: {
        email: `e2e-mgr-city-${ts}@crm.com`,
        password: hash,
        name: 'City Mgr',
        role: 'MANAGER',
      },
    });
    managerId = mgr.id;

    const mgrCity = await prisma.city.create({
      data: { name: `E2E Mgr City ${ts}` },
    });
    managerCityId = mgrCity.id;
    await prisma.user.update({
      where: { id: managerId },
      data: { cityId: managerCityId },
    });

    const mgrLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: `e2e-mgr-city-${ts}@crm.com`, password: 'test123456' });
    managerToken = mgrLogin.body.access_token;
  });

  afterAll(async () => {
    if (crewId)
      await prisma.crew.delete({ where: { id: crewId } }).catch(() => {});
    if (schoolId)
      await prisma.school.delete({ where: { id: schoolId } }).catch(() => {});
    if (cityId)
      await prisma.city.delete({ where: { id: cityId } }).catch(() => {});
    if (managerId)
      await prisma.user.delete({ where: { id: managerId } }).catch(() => {});
    if (managerCityId)
      await prisma.city
        .delete({ where: { id: managerCityId } })
        .catch(() => {});
    await app.close();
  });

  // ──── §34-36 CRUD Місто ────
  describe('Cities CRUD', () => {
    it('§34 створення міста (SUPERADMIN)', async () => {
      const res = await request(app.getHttpServer())
        .post('/cities')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: `E2E City ${ts}` })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(`E2E City ${ts}`);
      cityId = res.body.id;
    });

    it('§35 створення міста з порожньою назвою → 400', async () => {
      await request(app.getHttpServer())
        .post('/cities')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: '' })
        .expect(400);
    });

    it('MANAGER не може створити місто → 403', async () => {
      await request(app.getHttpServer())
        .post('/cities')
        .set('Authorization', `Bearer ${managerToken}`)
        .send({ name: 'Forbidden City' })
        .expect(403);
    });

    it('§36 призначення менеджера місту', async () => {
      await prisma.city.update({ where: { id: cityId }, data: { managerId } });
      const city = await prisma.city.findUnique({ where: { id: cityId } });
      expect(city?.managerId).toBe(managerId);
    });

    it('GET /cities повертає місто у списку', async () => {
      const res = await request(app.getHttpServer())
        .get('/cities')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      const found = res.body.find((c: { id: string }) => c.id === cityId);
      expect(found).toBeDefined();
    });

    it('GET /cities/:id повертає конкретне місто', async () => {
      const res = await request(app.getHttpServer())
        .get(`/cities/${cityId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(res.body.id).toBe(cityId);
    });
  });

  // ──── §38-40 Crew CRUD ────
  describe('Crew CRUD', () => {
    it('§38 створення екіпажу', async () => {
      const res = await request(app.getHttpServer())
        .post(`/cities/${cityId}/crews`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: `E2E Crew ${ts}` })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(`E2E Crew ${ts}`);
      crewId = res.body.id;
    });

    it('§39 створення екіпажу без host/driver (обидва nullable)', async () => {
      const res = await request(app.getHttpServer())
        .post(`/cities/${cityId}/crews`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: `E2E Empty Crew ${ts}` })
        .expect(201);
      expect(res.body.hostId).toBeNull();
      expect(res.body.driverId).toBeNull();
      await prisma.crew.delete({ where: { id: res.body.id } }).catch(() => {});
    });

    it('список екіпажів міста', async () => {
      const res = await request(app.getHttpServer())
        .get(`/cities/${cityId}/crews`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some((c: { id: string }) => c.id === crewId)).toBe(true);
    });

    it('§40 деактивація екіпажу', async () => {
      await prisma.crew.update({
        where: { id: crewId },
        data: { isActive: false },
      });
      const crew = await prisma.crew.findUnique({ where: { id: crewId } });
      expect(crew?.isActive).toBe(false);
      // Restore for later tests
      await prisma.crew.update({
        where: { id: crewId },
        data: { isActive: true },
      });
    });

    it('§41 один користувач може бути і host, і driver в різних екіпажах', async () => {
      const driver = await prisma.user.create({
        data: {
          email: `e2e-multi-${ts}@crm.com`,
          password: 'test123456',
          name: 'Multi Role',
          role: 'DRIVER',
        },
      });
      const crew1 = await prisma.crew.create({
        data: { name: 'C1', cityId, driverId: driver.id },
      });
      const crew2 = await prisma.crew.create({
        data: { name: 'C2', cityId, hostId: driver.id },
      });
      expect(crew1.driverId).toBe(driver.id);
      expect(crew2.hostId).toBe(driver.id);
      await prisma.crew.delete({ where: { id: crew1.id } });
      await prisma.crew.delete({ where: { id: crew2.id } });
      await prisma.user.delete({ where: { id: driver.id } });
    });

    it('видалення екіпажу', async () => {
      const tmp = await prisma.crew.create({
        data: { name: 'Delete Me', cityId },
      });
      await request(app.getHttpServer())
        .delete(`/cities/crews/${tmp.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      const gone = await prisma.crew.findUnique({ where: { id: tmp.id } });
      expect(gone).toBeNull();
    });
  });

  // ──── §37 Видалення міста з каскадом ────
  describe('§37 Каскадне видалення міста', () => {
    let cascadeCityId: string;
    let cascadeSchoolId: string;
    let cascadeEventId: string;
    let cascadeCrewId: string;

    beforeAll(async () => {
      const city = await prisma.city.create({
        data: { name: `Cascade City ${ts}` },
      });
      cascadeCityId = city.id;

      const school = await prisma.school.create({
        data: {
          name: `Cascade School ${ts}`,
          type: 'Школа',
          cityId: cascadeCityId,
        },
      });
      cascadeSchoolId = school.id;

      const crew = await prisma.crew.create({
        data: { name: `Cascade Crew ${ts}`, cityId: cascadeCityId },
      });
      cascadeCrewId = crew.id;

      const event = await prisma.event.create({
        data: {
          project: 'Cascade Event',
          date: new Date('2027-06-01'),
          schoolId: cascadeSchoolId,
          cityId: cascadeCityId,
          status: 'BASE',
        },
      });
      cascadeEventId = event.id;
    });

    it('видалення міста каскадно видаляє школи, події, екіпажі', async () => {
      await request(app.getHttpServer())
        .delete(`/cities/${cascadeCityId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(
        await prisma.event.findUnique({ where: { id: cascadeEventId } }),
      ).toBeNull();
      expect(
        await prisma.school.findUnique({ where: { id: cascadeSchoolId } }),
      ).toBeNull();
      expect(
        await prisma.crew.findUnique({ where: { id: cascadeCrewId } }),
      ).toBeNull();
      expect(
        await prisma.city.findUnique({ where: { id: cascadeCityId } }),
      ).toBeNull();
    });
  });
});
