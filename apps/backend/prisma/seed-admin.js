const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@crm.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Починаю створення адміна...');

  const admin = await prisma.user.upsert({
    where: { email: email },
    update: { password: hashedPassword },
    create: {
      name: 'Адміністратор',
      email: email,
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });

  console.log('Адмін успішно створений або оновлений:', admin.email);
}

main()
  .catch((e) => {
    console.error('Помилка під час сідування:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });