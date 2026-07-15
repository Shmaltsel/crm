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
  let jsonPath = path.resolve(__dirname, '..', '..', '..', 'schools_categorized_FINAL.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--city' && args[i + 1]) city = args[++i];
    if (args[i] === '--file' && args[i + 1]) jsonPath = path.resolve(args[++i]);
    if (args[i] === '--dry-run') dryRun = true;
  }

  return { jsonPath, city };
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
    rating: raw.rating != null ? raw.rating : null,
    directorSatisfied: raw.directorSatisfied != null ? raw.directorSatisfied : null,
    teachersSatisfied: raw.teachersSatisfied != null ? raw.teachersSatisfied : null,
    hadIssues: raw.hadIssues != null ? raw.hadIssues : false,
    comment: raw.comment || null,
    revisionComment: raw.revisionComment || null,
  };
}

function groupByPipeline(messages) {
  const rootIds = new Set();
  for (const msg of messages) {
    if (msg.reply_to_message_id == null) {
      rootIds.add(String(msg.id));
    }
  }

  function resolveRootId(msg) {
    let current = msg;
    const visited = new Set();
    while (current.reply_to_message_id != null) {
      const parentId = String(current.reply_to_message_id);
      if (visited.has(parentId)) break;
      visited.add(parentId);
      if (rootIds.has(parentId)) return parentId;
      const parent = messages.find(m => String(m.id) === parentId);
      if (!parent) return parentId;
      current = parent;
    }
    return String(current.id);
  }

  const groups = new Map();
  for (const msg of messages) {
    const rootId = resolveRootId(msg);
    if (!groups.has(rootId)) groups.set(rootId, []);
    groups.get(rootId).push(msg);
  }

  return [...groups.values()].map((msgs) => {
    msgs.sort((a, b) => new Date(a.date) - new Date(b.date));
    return msgs;
  });
}

async function findExactSchool(name, cityId) {
  const exact = await prisma.school.findFirst({
    where: { cityId, name },
    select: { id: true, name: true },
  });
  return exact || null;
}

function buildHistoryEntries(eventId, messages, resolveUserFn) {
  return messages.map(msg => {
    const user = resolveUserFn(msg.from);
    return {
      eventId,
      action: `[Повідомлення] ${msg.text || ''}`.trim(),
      userId: user.id,
      userName: msg.from || '',
      role: 'MANAGER',
      createdAt: new Date(msg.date),
    };
  });
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

function findLatestReportDate(entry) {
  let latest = null;
  for (const m of entry['повідомлення']) {
    if (m.єЗвіт && m.eventReport) {
      const d = new Date(m.date);
      if (!latest || d > latest) latest = d;
    }
  }
  return latest;
}

function splitConvMsgsByReportDate(convMsgs, reportDate) {
  if (!reportDate) return { before: convMsgs, after: [] };
  const before = [];
  const after = [];
  for (const msg of convMsgs) {
    if (new Date(msg.date) > reportDate) {
      after.push(msg);
    } else {
      before.push(msg);
    }
  }
  return { before, after };
}

async function main() {
  const { jsonPath, city: cityName } = parseArgs();

  console.log(`\n📂 Читаю ${jsonPath}...`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Файл не знайдено: ${jsonPath}`);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`   Знайдено ${raw.length} закладів у файлі`);
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

  const dbSchools = dryRun
    ? []
    : await prisma.school.findMany({
        where: { cityId: city.id, type: 'Школа' },
        select: { id: true, name: true },
      });
  const nameToId = new Map(dbSchools.map(s => [s.name, s.id]));

  const allUsers = dryRun
    ? []
    : await prisma.user.findMany({ select: { id: true, name: true } });
  const nameToUser = new Map(allUsers.map(u => [u.name.toLowerCase().trim(), u]));

  function resolveUser(senderName) {
    if (!senderName) return defaultUser;
    const key = senderName.toLowerCase().trim();
    return nameToUser.get(key) || defaultUser;
  }

  let totalPipelines = 0;
  let totalReportEvents = 0;
  let totalHistory = 0;
  let totalReports = 0;
  let totalSkipped = 0;
  let totalNotFound = 0;
  let totalWithComputed = 0;
  let totalSchoolComments = 0;

  for (const entry of raw) {
    const kgName = (entry['Заклад'] || '').replace(/\s+/g, ' ').trim();
    if (!kgName || kgName.includes('Загалом') || kgName.includes('Проведено') || kgName.length < 2) {
      continue;
    }

    const schoolId = dryRun ? 'dry-run' : nameToId.get(kgName) || null;
    if (!schoolId) {
      totalNotFound++;
      console.log(`  ❓ ${kgName.slice(0, 60)} → не знайдено в БД (пропущено)`);
      continue;
    }

    const convMsgs = entry.повідомлення.filter(m => m.єЗвіт !== true);
    const reportMsgs = entry.повідомлення.filter(m => m.єЗвіт === true);
    const eventReports = entry.eventReports || [];

    const saveAsSchoolComments = async (msgs, label) => {
      if (msgs.length === 0) return;
      if (!dryRun) {
        for (const msg of msgs) {
          const user = resolveUser(msg.from);
          await prisma.schoolComment.create({
            data: {
              schoolId,
              authorId: user.id,
              type: 'NOTE',
              text: `[Імпорт] ${msg.text || ''}`.trim().slice(0, 2000),
              createdAt: new Date(msg.date),
            },
          });
        }
        totalSchoolComments += msgs.length;
        console.log(`  💬 ${kgName.slice(0, 50)} → ${msgs.length} ${label}`);
      } else {
        totalSchoolComments += msgs.length;
        console.log(`  📋 ${kgName.slice(0, 50)} → ${msgs.length} ${label} (dry-run)`);
      }
    };

    if (eventReports.length === 0) {
      await saveAsSchoolComments(convMsgs, 'коментарів (без події)');
    } else {
      const latestReportDate = findLatestReportDate(entry);
      const { before: preReportMsgs, after: postReportMsgs } = splitConvMsgsByReportDate(convMsgs, latestReportDate);

      await saveAsSchoolComments(postReportMsgs, 'коментарів (очікують події)');

      for (const rawReport of eventReports) {
        const filled = fillReportFields(rawReport);

        const reportMsg = reportMsgs.find(m => {
          const parsed = m.text?.match(/1\.\s*Дата:\s*([^\n]+)/);
          return parsed != null;
        }) || reportMsgs[0];

        let eventDate = new Date();
        let eventTime = null;
        if (reportMsg) {
          const dateMatch = reportMsg.text?.match(/1\.\s*Дата:\s*([^\n]+)/);
          if (dateMatch) {
            const raw = dateMatch[1].replace(/[🟩🔲⬜🟪]/g, '').replace(/понеділок|вівторок|середа|четвер|п.ятниця|субота|неділя/gi, '').trim();
            const parts = raw.split(/[./]/);
            if (parts.length >= 3) {
              let day = parseInt(parts[0], 10);
              let month = parseInt(parts[1], 10);
              let year = parseInt(parts[2], 10);
              if (year < 100) year += 2000;
              if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                eventDate = new Date(year, month - 1, day);
              }
            }
          }
          eventTime = reportMsg.date.split('T')[1]?.slice(0, 5) || null;
        }

        const msgDate = reportMsg ? new Date(reportMsg.date) : new Date();
        const submittedAt = rawReport.submittedAt ? new Date(rawReport.submittedAt) : msgDate;
        const approvedAt = rawReport.approvedAt ? new Date(rawReport.approvedAt) : msgDate;

        if (!dryRun) {
          const result = await createEvent({
            cityId: city.id,
            schoolId,
            schoolName: kgName,
            date: eventDate,
            time: eventTime,
            status: 'RE_SALE',
            childrenActual: filled.childrenCount,
            received: filled.totalSum,
          });
          if (result.skipped) {
            totalSkipped++;
          } else {
            const histMsgs = [...preReportMsgs];
            if (reportMsg && !histMsgs.some(m => m.id === reportMsg.id)) {
              histMsgs.push(reportMsg);
            }
            const hist = buildHistoryEntries(result.event.id, histMsgs, resolveUser);
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
            const computedFields = [];
            if (rawReport.totalSum == null) computedFields.push('totalSum');
            if (rawReport.schoolSum == null) computedFields.push('schoolSum');
            if (rawReport.remainderSum == null) computedFields.push('remainderSum');
            if (rawReport.showingsCount == null) computedFields.push('showingsCount');
            if (rawReport.classesCount == null) computedFields.push('classesCount');
            if (computedFields.length > 0) totalWithComputed++;
            console.log(`  ✅ ${kgName.slice(0, 50)} → RE_SALE | дітей:${filled.childrenCount} сума:${filled.totalSum} рейтинг:${filled.rating ?? '-'}${computedFields.length > 0 ? ` (обраховано: ${computedFields.join(', ')})` : ''}`);
          }
        } else {
          totalReportEvents++;
          totalReports++;
          const computedFields = [];
          if (rawReport.totalSum == null) computedFields.push('totalSum');
          if (rawReport.schoolSum == null) computedFields.push('schoolSum');
          if (rawReport.remainderSum == null) computedFields.push('remainderSum');
          if (computedFields.length > 0) totalWithComputed++;
          console.log(`  📋 ${kgName.slice(0, 50)} → RE_SALE | дітей:${filled.childrenCount} сума:${filled.totalSum} рейтинг:${filled.rating ?? '-'}`);
        }
      }
    }
  }

  console.log(`\n🎉 Імпорт завершено!`);
  console.log(`   У файлі: ${raw.length} | Оброблено: ${raw.length - totalNotFound} | Не знайдено в БД: ${totalNotFound}`);
  console.log(`   Подій-гілок: ${totalPipelines}`);
  console.log(`   Подій-звітів: ${totalReportEvents}`);
  console.log(`   Записів історії: ${totalHistory}`);
  console.log(`   Звітів: ${totalReports} (з обрахованими полями: ${totalWithComputed})`);
  if (totalSkipped > 0) console.log(`   Пропущено (дублікати): ${totalSkipped}`);
  if (totalSchoolComments > 0) console.log(`   Коментарів після звіту (SchoolComment): ${totalSchoolComments}`);
}

main()
  .catch((e) => {
    console.error('❌ Помилка імпорту:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
