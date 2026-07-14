#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const schools = await prisma.school.findMany({
    include: {
      city: { select: { id: true, name: true } },
      events: {
        select: { id: true, project: true, status: true, date: true },
        orderBy: { date: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });

  const output = schools.map((s) => ({
    name: s.name,
    type: s.type,
    city: s.city?.name ?? null,
    cityId: s.cityId,
    director: s.director,
    phone: s.phone,
    address: s.address,
    childrenCount: s.childrenCount,
    events: s.events.map((e) => ({
      project: e.project,
      date: e.date,
      status: e.status,
    })),
  }));

  console.log(`Знайдено ${schools.length} шкіл/садочків`);

  const outFile = path.resolve(__dirname, '..', '..', `schools-export-${Date.now()}.json`);
  fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`Збережено: ${outFile}`);
}

main()
  .catch((e) => {
    console.error('Помилка:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
