import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('1. Auth + RBAC (чек-лист §1.1–1.6)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let adminToken: string;
  let managerToken: string;
  let driverToken: string;
  let hostToken: string;

  let testManagerId: string;
  let testDriverId: string;
  let testHostId: string;
  let testCityA: string;
  let testCityB: string;
  let testSchoolA: string;
  let testSchoolB: string;

  const ts = Date.now();
  const managerEmail = `e2e-manager-${ts}@crm.com`;
  const driverEmail = `e2e-driver-${ts}@crm.com`;
  const hostEmail = `e2e-host-${ts}@crm.com`;
  const PASS = 'test123456';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    prisma = app.get(PrismaService);

    // Seed test users
    const hash = await bcrypt.hash(PASS, 10);

    const manager = await prisma.user.create({
      data: {
        email: managerEmail,
        password: hash,
        name: 'E2E Manager',
        role: 'MANAGER',
      },
    });
    testManagerId = manager.id;

    const driver = await prisma.user.create({
      data: {
        email: driverEmail,
        password: hash,
        name: 'E2E Driver',
        role: 'DRIVER',
      },
    });
    testDriverId = driver.id;

    const host = await prisma.user.create({
      data: {
        email: hostEmail,
        password: hash,
        name: 'E2E Host',
        role: 'HOST',
      },
    });
    testHostId = host.id;

    // Seed two cities
    const cityA = await prisma.city.create({
      data: { name: `E2E City A ${ts}` },
    });
    const cityB = await prisma.city.create({
      data: { name: `E2E City B ${ts}` },
    });
    testCityA = cityA.id;
    testCityB = cityB.id;

    // Assign manager to cityA
    await prisma.user.update({
      where: { id: testManagerId },
      data: { cityId: testCityA },
    });

    // Seed schools in each city
    const schoolA = await prisma.school.create({
      data: { name: `E2E School A ${ts}`, type: 'Школа', cityId: testCityA },
    });
    const schoolB = await prisma.school.create({
      data: { name: `E2E School B ${ts}`, type: 'Школа', cityId: testCityB },
    });
    testSchoolA = schoolA.id;
    testSchoolB = schoolB.id;

    // Login all users
    const adminRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    adminToken = adminRes.body.access_token;

    const mgrRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: managerEmail, password: PASS });
    managerToken = mgrRes.body.access_token;

    const drvRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: driverEmail, password: PASS });
    driverToken = drvRes.body.access_token;

    const hostRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: hostEmail, password: PASS });
    hostToken = hostRes.body.access_token;
  });

  afterAll(async () => {
    // Cleanup
    await prisma.school.deleteMany({
      where: { id: { in: [testSchoolA, testSchoolB] } },
    });
    await prisma.city.deleteMany({
      where: { id: { in: [testCityA, testCityB] } },
    });
    await prisma.user.deleteMany({
      where: { id: { in: [testManagerId, testDriverId, testHostId] } },
    });
    await app.close();
  });

  // ───────────────────────────── §1.1 Логін ─────────────────────────
  describe('§1.1 Логін', () => {
    it('успішний логін SUPERADMIN', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(201);
      expect(res.body.access_token).toBeDefined();
      expect(typeof res.body.access_token).toBe('string');
    });

    it('401 при невірному паролі — немає витоку існування акаунту', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'wrongpassword' })
        .expect(401);
      expect(res.body.message).toBeDefined();
    });

    it('401 при неіснуючому email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: `nonexistent-${ts}@crm.com`, password: 'admin123' })
        .expect(401);
    });

    it('400 без email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'admin123' })
        .expect(400);
    });

    it('400 без пароля', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com' })
        .expect(400);
    });

    it('400 з коротким паролем (<6 символів)', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: '12345' })
        .expect(400);
    });

    it('email нечутливий до регістру', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'ADMIN@CRM.COM', password: 'admin123' })
        .expect(201);
      expect(res.body.access_token).toBeDefined();
    });
  });

  // ───────────────────────── §1.2 Сесія та токени ──────────────────
  describe('§1.2 Сесія та токени', () => {
    it('GET /auth/me повертає профіль користувача', async () => {
      const res = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe('admin@crm.com');
      expect(res.body.user.role).toBe('SUPERADMIN');
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('401 без токена на захищеному ендпоінті', async () => {
      await request(app.getHttpServer()).get('/auth/me').expect(401);
    });

    it('401 з невалідним токеном', async () => {
      await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid.token.here')
        .expect(401);
    });

    it('POST /logout — токен стає недійсним', async () => {
      const freshLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' });
      const freshToken = freshLogin.body.access_token;

      await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${freshToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${freshToken}`)
        .expect(401);
    });
  });

  // ───────────────────────── §1.3 CSRF ──────────────────────────────
  describe('§1.3 CSRF', () => {
    it('GET запити не потребують CSRF', async () => {
      await request(app.getHttpServer())
        .get('/cities')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  // ──────────── §1.4 Ролі та обмеження доступу ─────────────────────
  describe('§1.4 RBAC — обмеження маршрутів', () => {
    const protectedRoutes: Array<{
      method: 'get' | 'post' | 'patch' | 'delete';
      path: string;
      allowed: string[];
      label: string;
    }> = [
      {
        method: 'get',
        path: '/cities',
        allowed: ['SUPERADMIN', 'OWNER'],
        label: '/cities',
      },
      {
        method: 'get',
        path: '/employees',
        allowed: ['SUPERADMIN'],
        label: '/employees',
      },
      {
        method: 'get',
        path: '/analytics/overview',
        allowed: ['SUPERADMIN', 'OWNER'],
        label: '/analytics',
      },
      {
        method: 'get',
        path: '/dashboard/summary',
        allowed: ['SUPERADMIN', 'OWNER', 'MANAGER'],
        label: '/dashboard',
      },
      {
        method: 'get',
        path: '/city-leaderboard',
        allowed: ['SUPERADMIN', 'OWNER', 'MANAGER'],
        label: '/city-leaderboard',
      },
      {
        method: 'get',
        path: '/inventory',
        allowed: ['SUPERADMIN', 'OWNER', 'MANAGER'],
        label: '/inventory',
      },
      {
        method: 'get',
        path: '/salary',
        allowed: ['MANAGER', 'SUPERADMIN', 'OWNER'],
        label: '/salary',
      },
      {
        method: 'get',
        path: '/finance/dashboard',
        allowed: ['SUPERADMIN', 'OWNER', 'MANAGER'],
        label: '/finance/dashboard',
      },
    ];

    const tokens: Record<string, string> = {
      SUPERADMIN: adminToken,
      MANAGER: managerToken,
      DRIVER: driverToken,
      HOST: hostToken,
    };

    for (const route of protectedRoutes) {
      const allRoles = ['SUPERADMIN', 'OWNER', 'MANAGER', 'DRIVER', 'HOST'];

      for (const role of allRoles) {
        const shouldPass = route.allowed.includes(role);
        const token = tokens[role];
        if (!token) continue;

        it(`${role} → ${route.method.toUpperCase()} ${route.path} → ${shouldPass ? '200/201' : '403'}`, async () => {
          const req = request(app.getHttpServer())
            [route.method](route.path)
            .set('Authorization', `Bearer ${token}`);

          if (shouldPass) {
            const res = await req;
            expect([200, 201]).toContain(res.status);
          } else {
            await req.expect(403);
          }
        });
      }
    }
  });

  // ──────────── §1.5 City-scoping (MANAGER) ─────────────────────────
  describe('§1.5 City-scoping', () => {
    it('MANAGER міста A бачить школу свого міста', async () => {
      const res = await request(app.getHttpServer())
        .get(`/schools/${testSchoolA}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(200);
      expect(res.body.id).toBe(testSchoolA);
    });

    it('MANAGER міста A отримує 403 на школу міста B', async () => {
      await request(app.getHttpServer())
        .get(`/schools/${testSchoolB}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(403);
    });

    it('SUPERADMIN бачить будь-яку школу', async () => {
      const resA = await request(app.getHttpServer())
        .get(`/schools/${testSchoolA}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(resA.body.id).toBe(testSchoolA);

      const resB = await request(app.getHttpServer())
        .get(`/schools/${testSchoolB}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(resB.body.id).toBe(testSchoolB);
    });

    it('MANAGER не може створити екіпаж в іншому місті', async () => {
      await request(app.getHttpServer())
        .post(`/cities/${testCityB}/crews`)
        .set('Authorization', `Bearer ${managerToken}`)
        .send({ name: 'Illegal Crew' })
        .expect(403);
    });

    it('MANAGER може створити екіпаж у своєму місті', async () => {
      const res = await request(app.getHttpServer())
        .post(`/cities/${testCityA}/crews`)
        .set('Authorization', `Bearer ${managerToken}`)
        .send({ name: `E2E Crew ${ts}` });
      expect([200, 201]).toContain(res.status);
      if (res.body?.id) {
        await prisma.crew
          .delete({ where: { id: res.body.id } })
          .catch(() => {});
      }
    });
  });

  // ──────────── §1.6 Роль LEADER ───────────────────────────────────
  describe('§1.6 Роль LEADER (немає в enum)', () => {
    it('створення користувача з роллю LEADER відхиляється', async () => {
      const hash = await bcrypt.hash(PASS, 10);
      await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Fake Leader',
          email: `e2e-leader-${ts}@crm.com`,
          password: PASS,
          role: 'LEADER',
        })
        .expect(400);
    });
  });
});
