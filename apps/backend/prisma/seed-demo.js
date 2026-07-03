require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const DEMO_CITY_NAME = 'Демо Місто';

async function cleanupDemoData() {
  const existingCity = await prisma.city.findFirst({
    where: { name: DEMO_CITY_NAME },
  });
  if (!existingCity) return;

  console.log('Знайдено попередні demo-дані, очищую...');
  const events = await prisma.event.findMany({
    where: { cityId: existingCity.id },
    select: { id: true },
  });
  const eventIds = events.map((e) => e.id);

  await prisma.eventHistory.deleteMany({
    where: { eventId: { in: eventIds } },
  });
  await prisma.eventPreparation.deleteMany({
    where: { eventId: { in: eventIds } },
  });
  await prisma.issueReport.deleteMany({ where: { eventId: { in: eventIds } } });
  await prisma.file.deleteMany({ where: { eventId: { in: eventIds } } });
  await prisma.eventReport.deleteMany({ where: { eventId: { in: eventIds } } });
  await prisma.event.deleteMany({ where: { cityId: existingCity.id } });
  await prisma.crew.deleteMany({ where: { cityId: existingCity.id } });
  await prisma.school.deleteMany({ where: { cityId: existingCity.id } });

  const demoUsers = await prisma.user.findMany({
    where: { cityId: existingCity.id },
    select: { id: true },
  });
  await prisma.user.deleteMany({
    where: { id: { in: demoUsers.map((u) => u.id) } },
  });

  await prisma.city.delete({ where: { id: existingCity.id } });
  console.log('Очищено.');
}

async function main() {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ALLOW_PROD_SEED !== 'true'
  ) {
    console.error(
      'Demo-seed в production заблоковано. Встановіть ALLOW_PROD_SEED=true для підтвердження.',
    );
    process.exit(1);
  }

  await cleanupDemoData();

  console.log('Створюю demo-місто...');
  const city = await prisma.city.create({ data: { name: DEMO_CITY_NAME } });

  const demoPassword = await bcrypt.hash('Demo!Pass123', 10);

  const manager = await prisma.user.create({
    data: {
      name: 'Марія Демчук',
      email: 'demo.manager@svitlo-znan.app',
      password: demoPassword,
      role: 'MANAGER',
      cityId: city.id,
      phone: '+380671112233',
    },
  });

  const loadTestUsers = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.user.create({
        data: {
          name: `Load Test User ${i + 1}`,
          email: `loadtest${i + 1}@svitlo-znan.app`,
          password: demoPassword,
          role: 'MANAGER',
          cityId: city.id,
        },
      }),
    ),
  );

  const host = await prisma.user.create({
    data: {
      name: 'Олег Ведучий',
      email: 'demo.host@svitlo-znan.app',
      password: demoPassword,
      role: 'HOST',
      cityId: city.id,
      phone: '+380671112234',
    },
  });

  const driver = await prisma.user.create({
    data: {
      name: 'Ігор Водій',
      email: 'demo.driver@svitlo-znan.app',
      password: demoPassword,
      role: 'DRIVER',
      cityId: city.id,
      phone: '+380671112235',
      car: 'Volkswagen Transporter',
    },
  });

  await prisma.city.update({
    where: { id: city.id },
    data: { managerId: manager.id },
  });

  console.log('Створюю школи...');
  const schools = await Promise.all([
    prisma.school.create({
      data: {
        name: 'Ліцей №5',
        type: 'school',
        cityId: city.id,
        address: 'вул. Шевченка, 10',
        director: 'Наталія Іванівна',
        phone: '+380321234567',
        email: 'lyceum5@example.com',
        childrenCount: 320,
        isHotClient: true,
        rating: 4.8,
      },
    }),
    prisma.school.create({
      data: {
        name: 'Дитячий садок «Сонечко»',
        type: 'kindergarten',
        cityId: city.id,
        address: 'вул. Франка, 22',
        director: 'Оксана Петрівна',
        phone: '+380321234568',
        childrenCount: 90,
        rating: 4.5,
      },
    }),
    prisma.school.create({
      data: {
        name: "Гімназія «Львів'янка»",
        type: 'school',
        cityId: city.id,
        address: 'вул. Городоцька, 5',
        director: 'Андрій Богданович',
        phone: '+380321234569',
        childrenCount: 210,
      },
    }),
  ]);

  console.log('Створюю екіпаж...');
  const crew = await prisma.crew.create({
    data: {
      name: 'Екіпаж №1',
      cityId: city.id,
      hostId: host.id,
      driverId: driver.id,
      car: 'Volkswagen Transporter',
      carPlate: 'BC1234AA',
      phone: '+380671112235',
    },
  });

  const project = await prisma.project.upsert({
    where: { name: 'Голографічне шоу «Космос»' },
    update: {},
    create: { name: 'Голографічне шоу «Космос»', color: 'blue' },
  });

  console.log('Створюю події на різних стадіях pipeline...');

  await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[0].id,
      project: project.name,
      date: new Date(Date.now() + 20 * 86400000),
      status: 'FIRST_CONTACT',
      childrenPlanned: 120,
      contactPerson: 'Наталія Іванівна',
      contactPhone: '+380321234567',
    },
  });

  await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[1].id,
      project: project.name,
      date: new Date(Date.now() + 10 * 86400000),
      status: 'DATE_CONFIRMED',
      crewId: crew.id,
      childrenPlanned: 60,
      price: 8000,
      contactPerson: 'Оксана Петрівна',
      contactPhone: '+380321234568',
    },
  });

  const preparingEvent = await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[2].id,
      project: project.name,
      date: new Date(Date.now() + 5 * 86400000),
      status: 'PREPARATION',
      crewId: crew.id,
      childrenPlanned: 150,
      price: 15000,
      responsibleId: manager.id,
    },
  });
  await prisma.eventPreparation.create({
    data: {
      eventId: preparingEvent.id,
      assignCrew: 'DONE',
      bookEquipment: 'DONE',
      prepareMaterials: 'IN_PROGRESS',
    },
  });

  const completedEvent = await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[0].id,
      project: project.name,
      date: new Date(Date.now() - 15 * 86400000),
      status: 'REPORT',
      crewId: crew.id,
      childrenPlanned: 100,
      childrenActual: 98,
      price: 12000,
      received: 12000,
    },
  });
  await prisma.eventReport.create({
    data: {
      eventId: completedEvent.id,
      directorSatisfied: true,
      teachersSatisfied: true,
      rating: 5,
      childrenCount: 98,
      classesCount: 5,
      totalSum: 12000,
      schoolSum: 12000,
      remainderSum: 0,
      expenseItems: {
        create: [{ category: 'Пальне', name: 'Заправка авто', amount: 800 }],
      },
      salaryItems: {
        create: [
          { userId: host.id, userName: host.name, amount: 2500, role: 'HOST' },
          {
            userId: driver.id,
            userName: driver.name,
            amount: 1500,
            role: 'DRIVER',
          },
        ],
      },
    },
  });

  await prisma.eventHistory.create({
    data: {
      eventId: completedEvent.id,
      action: 'Подію завершено',
      comment: 'Захід пройшов успішно, школа задоволена',
      userId: manager.id,
      userName: manager.name,
      role: 'MANAGER',
    },
  });

  console.log('\n✅ Demo-дані створено!');
  console.log(`Місто: ${DEMO_CITY_NAME}`);
  console.log(`Менеджер: ${manager.email} / Demo!Pass123`);
  console.log(`Ведучий: ${host.email} / Demo!Pass123`);
  console.log(`Водій: ${driver.email} / Demo!Pass123`);
}

main()
  .catch((e) => {
    console.error('Помилка під час demo-seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
