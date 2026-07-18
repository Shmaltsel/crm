const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { name: '\u0422\u0435\u0445\u043D\u0456\u043A\u0430', type: 'INVENTORY' },
  { name: '\u041C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438', type: 'INVENTORY' },
  { name: '\u0420\u0435\u043A\u0432\u0456\u0437\u0438\u0442', type: 'INVENTORY' },
  { name: '\u041A\u0430\u043D\u0446\u0435\u043B\u044F\u0440\u0456\u044F', type: 'INVENTORY' },
  { name: '\u0406\u043D\u0448\u0435', type: 'INVENTORY' },
  { name: '\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442', type: 'EXPENSE' },
  { name: '\u041F\u0430\u043B\u044C\u043D\u0435', type: 'EXPENSE' },
  { name: '\u041C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438', type: 'EXPENSE' },
  { name: '\u041E\u0431\u043B\u0430\u0434\u043D\u0430\u043D\u043D\u044F', type: 'EXPENSE' },
  { name: '\u0425\u0430\u0440\u0447\u0443\u0432\u0430\u043D\u043D\u044F', type: 'EXPENSE' },
  { name: '\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430', type: 'EXPENSE' },
  { name: '\u041E\u0440\u0435\u043D\u0434\u0430', type: 'EXPENSE' },
  { name: "\u0417\u0432'...\u044F\u0437\u043E\u043A", type: 'EXPENSE' },
  { name: '\u0406\u043D\u0448\u0435', type: 'EXPENSE' },
];

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name_type: cat },
      create: cat,
      update: {},
    });
  }
  console.log('Seeded ' + categories.length + ' categories');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
