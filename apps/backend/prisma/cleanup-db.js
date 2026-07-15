require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  if (!adminEmail) { console.error('SEED_ADMIN_EMAIL не заданий'); process.exit(1); }

  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) { console.error(`Адмін ${adminEmail} не знайдений`); process.exit(1); }
  console.log(`Зберігаю: ${admin.email}`);

  console.log('Очищення...');

  await prisma.user.deleteMany({ where: { id: { not: admin.id } } });

  const tables = [
    'Notification', 'AnalyticsAnnotation', 'AnalyticsTarget',
    'CompanyBalanceEntry', 'CompanyBalance', 'AuditLog', 'RefreshToken',
    'InventoryUsage', 'ExpenseItem', 'SalaryRecord', 'DayOffRequest',
    'DayOff', 'SchoolComment', 'EventHistory', 'EventPreparation',
    'File', 'EventReport', 'IssueReport', 'Event', 'Crew',
    'School', 'InventoryItem', 'SchoolContact', 'Project', 'City',
  ];

  for (const t of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${t}"`);
  }

  const remaining = await prisma.user.count();
  console.log(`Готово! Користувачів: ${remaining} (адмін: ${admin.email})`);
}

main()
  .catch((e) => { console.error('Помилка:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
