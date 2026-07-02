require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      'Помилка: SEED_ADMIN_EMAIL та SEED_ADMIN_PASSWORD мають бути задані в .env',
    );
    process.exit(1);
  }

  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ALLOW_PROD_SEED !== 'true'
  ) {
    console.error(
      'Сідування в production заблоковано. Встановіть ALLOW_PROD_SEED=true для підтвердження.',
    );
    process.exit(1);
  }

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
