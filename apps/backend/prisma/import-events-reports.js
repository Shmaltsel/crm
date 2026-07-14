#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let dryRun = false;

function parseArgs() {
  const args = process.argv.slice(2);
  let jsonPath = '';
  let project = '';
  let city = 'Івано-Франківськ';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) jsonPath = path.resolve(args[++i]);
    if (args[i] === '--project' && args[i + 1]) project = args[++i];
    if (args[i] === '--city' && args[i + 1]) city = args[++i];
    if (args[i] === '--dry-run') dryRun = true;
  }

  if (!jsonPath) {
    console.error('❌ Потрібен аргумент --file <path>');
    process.exit(1);
  }

  if (!project) {
    const lower = jsonPath.toLowerCase();
    if (lower.includes('holohrama') || lower.includes('голограма')) {
      project = 'Голограма';
    } else if (lower.includes('malyuvayka') || lower.includes('малювайка')) {
      project = 'Малювайка';
    } else {
      console.error('❌ Не вдалося визначити проєкт з імені файлу. Вкажіть --project Голограма або --project Малювайка');
      process.exit(1);
    }
  }

  if (project !== 'Голограма' && project !== 'Малювайка') {
    console.error(`❌ Невідомий проєкт: "${project}". Допустимі: Голограма, Малювайка`);
    process.exit(1);
  }

  return { jsonPath, project, city };
}

function extractNumber(name) {
  const m = name.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function extractSchoolName(comment) {
  if (!comment) return null;
  const m = comment.match(/Заклад:\s*([^\n]+)/);
  if (!m) return null;
  return m[1].replace(/\s+/g, ' ').trim();
}

function extractEventDate(comment) {
  if (!comment) return null;
  const m = comment.match(/1\.\s*Дата:\s*([^\n]+)/);
  if (!m) return null;
  const raw = m[1].replace(/[🟩🔲⬜🟪]/g, '').replace(/понеділок|вівторок|середа|четвер|п.ятниця|субота|неділя/gi, '').trim();
  const parts = raw.split(/[./]/);
  if (parts.length < 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  let year = parseInt(parts[2], 10);
  if (year < 100) year += 2000;
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(year, month - 1, day);
}

async function findOrCreateSchool(name, cityId, schoolType) {
  const num = extractNumber(name);

  if (num !== null) {
    const existing = await prisma.school.findFirst({
      where: { cityId, type: schoolType, name: { contains: String(num) } },
    });
    if (existing) return { school: existing, created: false };
  }

  const all = await prisma.school.findMany({
    where: { cityId, type: schoolType },
    select: { id: true, name: true },
  });

  const lowerName = name.toLowerCase().replace(/[🟩🔲⬜🟪]/g, '').trim();
  const match = all.find(s => {
    const sn = s.name.toLowerCase();
    return sn.includes(lowerName) || lowerName.includes(sn);
  });
  if (match) return { school: match, created: false };

  const school = await prisma.school.create({
    data: { name, type: schoolType, cityId },
  });
  return { school, created: true };
}

async function main() {
  const { jsonPath, project, city: cityName } = parseArgs();
  const schoolType = project === 'Малювайка' ? 'Садочок' : 'Школа';

  console.log(`\n📂 Читаю ${jsonPath}...`);
  console.log(`   Проєкт: ${project} | Тип закладу: ${schoolType} | Місто: ${cityName}`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Файл не знайдено: ${jsonPath}`);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`   Знайдено ${raw.length} звітів`);
  if (dryRun) console.log('   🔍 РЕЖИМ DRY-RUN — дані не записуються\n');

  let city;
  let defaultUser;
  if (!dryRun) {
    city = await prisma.city.findFirst({ where: { name: cityName } });
    if (!city) {
      console.error(`❌ Місто "${cityName}" не знайдено.`);
      process.exit(1);
    }
    defaultUser = await prisma.user.findFirst({
      where: { cityId: city.id, role: 'MANAGER' },
    });
    if (!defaultUser) {
      defaultUser = await prisma.user.findFirst({ where: { cityId: city.id } });
    }
    if (!defaultUser) {
      defaultUser = await prisma.user.findFirst();
    }
    if (!defaultUser) {
      console.error(`❌ Немає жодного користувача в БД.`);
      process.exit(1);
    }
  } else {
    city = { id: 'dry-run', name: cityName };
    defaultUser = { id: 'dry-run' };
  }

  let totalEvents = 0;
  let totalReports = 0;
  let totalHistory = 0;
  let totalSkipped = 0;
  let createdSchools = 0;

  for (const report of raw) {
    const schoolName = extractSchoolName(report.comment);
    if (!schoolName || schoolName.length < 2) {
      console.log(`  ⏭ Пропущено — не вдалося витягти назву закладу з comment`);
      continue;
    }

    let school;
    if (!dryRun) {
      const result = await findOrCreateSchool(schoolName, city.id, schoolType);
      school = result.school;
      if (result.created) {
        createdSchools++;
        console.log(`  🏫 Новий заклад: ${school.name}`);
      }
    } else {
      school = { id: 'dry-run', name: schoolName };
    }

    const eventDate = extractEventDate(report.comment) || new Date(report.submittedAt);
    const submittedAt = report.submittedAt ? new Date(report.submittedAt) : eventDate;
    const approvedAt = report.approvedAt ? new Date(report.approvedAt) : null;
    const createdAt = report.createdAt ? new Date(report.createdAt) : submittedAt;

    if (!dryRun) {
      const dayStart = new Date(eventDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(eventDate);
      dayEnd.setHours(23, 59, 59, 999);

      const existing = await prisma.event.findFirst({
        where: {
          schoolId: school.id,
          date: { gte: dayStart, lte: dayEnd },
          project,
        },
      });
      if (existing) {
        totalSkipped++;
        console.log(`  ⏭ ${school.name.slice(0, 50)} → ${eventDate.toISOString().slice(0, 10)} — дублікат`);
        continue;
      }

      const event = await prisma.event.create({
        data: {
          cityId: city.id,
          schoolId: school.id,
          project,
          date: eventDate,
          status: 'RE_SALE',
          childrenActual: report.childrenCount || 0,
          received: report.totalSum || 0,
        },
      });

      await prisma.eventHistory.create({
        data: {
          eventId: event.id,
          action: `[Імпорт звіту] ${report.comment || ''}`.slice(0, 500),
          userId: defaultUser.id,
          userName: 'Import',
          role: 'MANAGER',
          createdAt,
        },
      });

      await prisma.eventReport.create({
        data: {
          eventId: event.id,
          status: report.status || 'APPROVED',
          announcementDone: report.announcementDone ?? true,
          materialShown: report.materialShown ?? true,
          childrenCount: report.childrenCount || 0,
          classesCount: report.classesCount || 0,
          privilegedCount: report.privilegedCount || 0,
          showingsCount: report.showingsCount || 0,
          totalSum: report.totalSum || 0,
          schoolSum: report.schoolSum || 0,
          remainderSum: report.remainderSum || 0,
          rating: report.rating ?? null,
          directorSatisfied: report.directorSatisfied ?? null,
          teachersSatisfied: report.teachersSatisfied ?? null,
          hadIssues: report.hadIssues ?? false,
          comment: report.comment || null,
          revisionComment: report.revisionComment || null,
          submittedAt,
          approvedAt,
          createdAt,
        },
      });

      totalEvents++;
      totalReports++;
      totalHistory++;
      console.log(`  ✅ ${school.name.slice(0, 50)} → RE_SALE | дітей:${report.childrenCount} сума:${report.totalSum} рейтинг:${report.rating ?? '-'}`);
    } else {
      totalEvents++;
      totalReports++;
      totalHistory++;
      console.log(`  📋 ${schoolName.slice(0, 50)} → RE_SALE | дітей:${report.childrenCount} сума:${report.totalSum} рейтинг:${report.rating ?? '-'}`);
    }
  }

  console.log(`\n🎉 Імпорт завершено!`);
  console.log(`   Закладів: ${raw.length} оброблено (нових: ${createdSchools})`);
  console.log(`   Подій створено: ${totalEvents}`);
  console.log(`   Звітів створено: ${totalReports}`);
  console.log(`   Записів історії: ${totalHistory}`);
  if (totalSkipped > 0) console.log(`   ⏭ Пропущено (дублікати): ${totalSkipped}`);
}

main()
  .catch((e) => {
    console.error('❌ Помилка імпорту:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
