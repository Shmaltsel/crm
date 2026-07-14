#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let dryRun = false;

function parseArgs() {
  const args = process.argv.slice(2);
  let city = 'Львів';
  let jsonPath = path.resolve(__dirname, '..', '..', '..', 'schools_categorized_with_reports.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--city' && args[i + 1]) city = args[++i];
    if (args[i] === '--file' && args[i + 1]) jsonPath = path.resolve(args[++i]);
    if (args[i] === '--dry-run') dryRun = true;
  }

  return { jsonPath, city };
}

function extractNumber(name) {
  const m = name.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function fillReportFields(raw) {
  let showingsCount = raw.showingsCount;
  if (showingsCount == null) {
    showingsCount = (raw.classesCount != null && raw.classesCount > 0) ? raw.classesCount : 1;
  }

  let classesCount = raw.classesCount;
  if (classesCount == null) {
    classesCount = showingsCount;
  }

  let totalSum = raw.totalSum;
  if (totalSum == null) {
    if (raw.schoolSum != null && raw.remainderSum != null) {
      totalSum = raw.schoolSum + raw.remainderSum;
    } else {
      totalSum = 0;
    }
  }

  let schoolSum = raw.schoolSum;
  if (schoolSum == null) {
    if (totalSum != null && totalSum > 0) {
      schoolSum = Math.round(totalSum * 0.2);
    } else {
      schoolSum = 0;
    }
  }

  let remainderSum = raw.remainderSum;
  if (remainderSum == null) {
    remainderSum = Math.max(0, (totalSum || 0) - (schoolSum || 0));
  }

  const rating = raw.rating != null ? raw.rating : null;
  const hadIssues = raw.hadIssues != null ? raw.hadIssues : false;
  const directorSatisfied = raw.directorSatisfied != null ? raw.directorSatisfied : null;
  const teachersSatisfied = raw.teachersSatisfied != null ? raw.teachersSatisfied : null;
  const comment = raw.comment || null;
  const revisionComment = raw.revisionComment || null;

  const computed = {};
  if (raw.showingsCount == null) computed.showingsCount = showingsCount;
  if (raw.classesCount == null) computed.classesCount = classesCount;
  if (raw.totalSum == null) computed.totalSum = totalSum;
  if (raw.schoolSum == null) computed.schoolSum = schoolSum;
  if (raw.remainderSum == null) computed.remainderSum = remainderSum;

  return {
    announcementDone: raw.announcementDone != null ? raw.announcementDone : true,
    materialShown: raw.materialShown != null ? raw.materialShown : true,
    childrenCount: raw.childrenCount || 0,
    classesCount,
    privilegedCount: raw.privilegedCount || 0,
    showingsCount,
    totalSum,
    schoolSum,
    remainderSum,
    rating,
    directorSatisfied,
    teachersSatisfied,
    hadIssues,
    comment,
    revisionComment,
    computed,
  };
}

function parseReportDate(text) {
  const m = text.match(/1\.\s*Дата:\s*([^\n]+)/);
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
  return { day, month, year };
}

function groupByPipeline(rows) {
  const rootIds = new Set();
  for (const row of rows) {
    const parentId = row.reply_to_message_id;
    if (parentId == null) {
      rootIds.add(String(row.id));
    }
  }

  function resolveRootId(row) {
    let current = row;
    const visited = new Set();
    while (current.reply_to_message_id != null) {
      const parentId = String(current.reply_to_message_id);
      if (visited.has(parentId)) break;
      visited.add(parentId);
      if (rootIds.has(parentId)) return parentId;
      const parent = rows.find(r => String(r.id) === parentId);
      if (!parent) return parentId;
      current = parent;
    }
    return String(current.id);
  }

  const groups = new Map();
  for (const row of rows) {
    const rootId = resolveRootId(row);
    if (!groups.has(rootId)) groups.set(rootId, []);
    groups.get(rootId).push(row);
  }

  return [...groups.values()].map((msgs) => {
    msgs.sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      finalStatus: 'BASE',
      messages: msgs,
    };
  });
}

async function findOrCreateSchool(name, cityId) {
  const num = extractNumber(name);

  if (num !== null) {
    const existing = await prisma.school.findFirst({
      where: { cityId, type: 'Школа', name: { contains: String(num) } },
    });
    if (existing) return { school: existing, created: false };
  }

  const all = await prisma.school.findMany({
    where: { cityId, type: 'Школа' },
    select: { id: true, name: true },
  });

  const lowerName = name.toLowerCase().replace(/[🟩🔲⬜🟪]/g, '').trim();
  const match = all.find(s => s.name.toLowerCase().includes(lowerName) || lowerName.includes(s.name.toLowerCase()));
  if (match) return { school: match, created: false };

  const school = await prisma.school.create({
    data: { name, type: 'Школа', cityId },
  });
  return { school, created: true };
}

function buildHistoryEntries(eventId, messages, userId) {
  return messages.map(msg => ({
    eventId,
    action: `[Повідомлення] ${msg.text || ''}`.trim(),
    userId,
    userName: msg.from || '',
    role: 'MANAGER',
    createdAt: new Date(msg.date),
  }));
}

function computeReportEventDate(msg) {
  const parsed = parseReportDate(msg.text);
  if (parsed) {
    return {
      date: new Date(parsed.year, parsed.month - 1, parsed.day),
      time: msg.date.split('T')[1]?.slice(0, 5) || null,
    };
  }
  return {
    date: new Date(msg.date),
    time: msg.date.split('T')[1]?.slice(0, 5) || null,
  };
}

function computePipelineDate(messages) {
  const lastMsg = messages[messages.length - 1];
  return {
    date: new Date(lastMsg.date),
    time: lastMsg.date.split('T')[1]?.slice(0, 5) || null,
  };
}

async function createEvent(data) {
  const dayStart = new Date(data.date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(data.date);
  dayEnd.setHours(23, 59, 59, 999);

  const existing = await prisma.event.findFirst({
    where: {
      schoolId: data.schoolId,
      date: { gte: dayStart, lte: dayEnd },
      project: 'Голограма',
    },
  });
  if (existing) {
    console.log(`  ⏭ ${data.schoolName.slice(0, 50)} → пропущено (дублікат)`);
    return { skipped: true };
  }

  const event = await prisma.event.create({
    data: {
      cityId: data.cityId,
      schoolId: data.schoolId,
      project: 'Голограма',
      date: data.date,
      time: data.time,
      status: data.status,
      childrenActual: data.childrenActual || null,
      received: data.received || null,
    },
  });

  return { event, skipped: false };
}

async function main() {
  const { jsonPath, city: cityName } = parseArgs();

  console.log(`\n📂 Читаю ${jsonPath}...`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Файл не знайдено: ${jsonPath}`);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`   Знайдено ${raw.length} закладів`);
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
  }

  let totalPipelines = 0;
  let totalReportEvents = 0;
  let totalHistory = 0;
  let totalReports = 0;
  let createdSchools = 0;
  let totalSkipped = 0;
  let totalWithComputed = 0;
  let totalEntries = 0;

  for (const kg of raw) {
    const kgName = (kg['Заклад'] || '').replace(/\s+/g, ' ').trim();
    if (!kgName || kgName.includes('Загалом') || kgName.includes('Проведено') || kgName.length < 2) {
      continue;
    }
    totalEntries++;
    const convMsgs = kg.повідомлення.filter(m => m.єЗвіт !== true);
    const reportMsgs = kg.повідомлення.filter(m => m.єЗвіт === true);

    let school;
    if (!dryRun) {
      const result = await findOrCreateSchool(kgName, city.id);
      school = result.school;
      if (result.created) createdSchools++;
    } else {
      school = { id: 'dry-run', name: kgName };
    }

    const pipelines = groupByPipeline(convMsgs);

    for (const pipeline of pipelines) {
      const { date: eventDate, time: eventTime } = computePipelineDate(pipeline.messages);

      if (!dryRun) {
        const result = await createEvent({
          cityId: city.id,
          schoolId: school.id,
          schoolName: school.name,
          date: eventDate,
          time: eventTime,
          status: 'BASE',
        });
        if (result.skipped) {
          totalSkipped++;
        } else {
          const hist = buildHistoryEntries(result.event.id, pipeline.messages, defaultUser.id);
          if (hist.length > 0) {
            await prisma.eventHistory.createMany({ data: hist });
          }
          totalPipelines++;
          totalHistory += hist.length;
          console.log(`  ✅ ${school.name.slice(0, 50)} → BASE (${hist.length} записів)`);
        }
      } else {
        totalPipelines++;
        totalHistory += pipeline.messages.length;
        console.log(`  📋 ${school.name.slice(0, 50)} → BASE (${pipeline.messages.length} повідомлень)`);
      }
    }

    for (const rm of reportMsgs) {
      const rawReport = rm.eventReport || {};
      const filled = fillReportFields(rawReport);

      const { date: eventDate, time: eventTime } = computeReportEventDate(rm);
      const msgDate = new Date(rm.date);
      let submittedAt = rawReport.submittedAt ? new Date(rawReport.submittedAt) : msgDate;
      let approvedAt = rawReport.approvedAt ? new Date(rawReport.approvedAt) : msgDate;

      if (!dryRun) {
        const result = await createEvent({
          cityId: city.id,
          schoolId: school.id,
          schoolName: school.name,
          date: eventDate,
          time: eventTime,
          status: 'RE_SALE',
          childrenActual: filled.childrenCount,
          received: filled.totalSum,
        });
        if (result.skipped) {
          totalSkipped++;
        } else {
          const hist = buildHistoryEntries(result.event.id, [rm], defaultUser.id);
          if (hist.length > 0) {
            await prisma.eventHistory.createMany({ data: hist });
          }

          await prisma.eventReport.create({
            data: {
              eventId: result.event.id,
              status: 'APPROVED',
              announcementDone: filled.announcementDone,
              materialShown: filled.materialShown,
              childrenCount: filled.childrenCount,
              classesCount: filled.classesCount,
              privilegedCount: filled.privilegedCount,
              showingsCount: filled.showingsCount,
              totalSum: filled.totalSum,
              schoolSum: filled.schoolSum,
              remainderSum: filled.remainderSum,
              rating: filled.rating,
              directorSatisfied: filled.directorSatisfied,
              teachersSatisfied: filled.teachersSatisfied,
              hadIssues: filled.hadIssues,
              comment: filled.comment,
              revisionComment: filled.revisionComment,
              submittedAt,
              approvedAt,
              createdAt: msgDate,
            },
          });

          totalReportEvents++;
          totalReports++;
          totalHistory += hist.length;
          if (Object.keys(filled.computed).length > 0) {
            totalWithComputed++;
          }
          console.log(`  ✅ ${school.name.slice(0, 50)} → RE_SALE | дітей:${filled.childrenCount} сума:${filled.totalSum} рейтинг:${filled.rating ?? '-'} ${Object.keys(filled.computed).length > 0 ? '(обраховано: ' + Object.keys(filled.computed).join(', ') + ')' : ''}`);
        }
      } else {
        totalReportEvents++;
        totalReports++;
        totalHistory += 1;
        if (Object.keys(filled.computed).length > 0) {
          totalWithComputed++;
        }
        const computedNote = Object.keys(filled.computed).length > 0 ? ` | обраховано: ${Object.keys(filled.computed).join(', ')}` : '';
        console.log(`  📋 ${school.name.slice(0, 50)} → RE_SALE | дітей:${filled.childrenCount} сума:${filled.totalSum} рейтинг:${filled.rating ?? '-'}${computedNote}`);
      }
    }
  }

  console.log(`\n🎉 Імпорт завершено!`);
  console.log(`   Закладів: ${totalEntries} (з ${raw.length} у файлі, нових: ${createdSchools})`);
  console.log(`   Подій-гілок: ${totalPipelines}`);
  console.log(`   Подій-звітів: ${totalReportEvents}`);
  console.log(`   Записів історії: ${totalHistory}`);
  console.log(`   Звітів: ${totalReports} (з обрахованими полями: ${totalWithComputed})`);
  if (totalSkipped > 0) console.log(`   Пропущено (дублікати): ${totalSkipped}`);
}

main()
  .catch((e) => {
    console.error('❌ Помилка імпорту:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
