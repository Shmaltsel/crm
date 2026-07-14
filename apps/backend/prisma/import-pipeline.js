#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const STAGE_ORDER = [
  'BASE', 'FIRST_CONTACT', 'INTERESTED', 'PRE_APPROVAL',
  'DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT', 'RE_SALE',
];

const STAGE_MAP = {
  'Новий заклад': 'BASE',
  'Знайомство': 'FIRST_CONTACT',
  'Зацікавлення': 'INTERESTED',
  'Попередня згода': 'PRE_APPROVAL',
  'Підтвердження дати': 'DATE_CONFIRMED',
  'Оголошення': 'PREPARATION',
  'Підготовка': 'IN_PROGRESS',
  'Проведення заходу': 'DONE',
  'Звіт': 'REPORT',
  'Звіт Малювайка': 'REPORT',
  'Завершено': 'RE_SALE',
  'Захід завершено': 'RE_SALE',
};

const STAGE_LABELS = {
  BASE: 'База',
  FIRST_CONTACT: 'Знайомство',
  INTERESTED: 'Зацікавлення',
  PRE_APPROVAL: 'Попередня згода',
  DATE_CONFIRMED: 'Підтвердження дати',
  PREPARATION: 'Оголошення',
  IN_PROGRESS: 'Підготовка',
  DONE: 'Проведення заходу',
  REPORT: 'Звіт',
};

let dryRun = false;

function parseArgs() {
  const args = process.argv.slice(2);
  let city = 'Львів';
  let jsonPath = path.resolve(__dirname, '..', '..', '..', 'crm_with_reports_updated.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--city' && args[i + 1]) city = args[++i];
    if (args[i] === '--file' && args[i + 1]) jsonPath = path.resolve(args[++i]);
    if (args[i] === '--dry-run') dryRun = true;
  }

  return { jsonPath, city };
}

function stageRank(status) {
  return STAGE_ORDER.indexOf(status);
}

function maxStage(statuses) {
  let best = 'BASE';
  for (const s of statuses) {
    if (stageRank(s) > stageRank(best)) best = s;
  }
  return best;
}

function extractNumber(name) {
  const m = name.match(/№\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
}

function extractNamed(name) {
  const m = name.match(/"([^"]+)"/);
  return m ? m[1].toLowerCase() : null;
}

function cleanNumber(raw) {
  if (!raw) return 0;
  let s = raw.replace(/грн/gi, '').replace(/-/g, '').trim();
  s = s.replace(/[\s.,]/g, '');
  if (!s || s === '???') return 0;
  const n = parseInt(s, 10);
  return isNaN(n) ? 0 : n;
}

function parseReportDate(text) {
  const m = text.match(/1\.\s*Дата:\s*([^\n]+)/);
  if (!m) return null;
  const raw = m[1].replace(/[🟩🔲⬜]/g, '').trim();
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

function parseReport(text) {
  const childrenMatch = text.match(/Кількість дітей:\s*(\d+)/);
  const childrenCount = childrenMatch ? parseInt(childrenMatch[1], 10) : 0;

  let privilegedCount = 0;
  const privInline = text.match(/\(\+(\d+)\s*пільг/);
  if (privInline) {
    privilegedCount = parseInt(privInline[1], 10);
  } else {
    const privLine = text.match(/Пільгов\w*(?:\s*\(безкоштовно\))?\s*-\s*(\d+)/i);
    if (privLine) {
      privilegedCount = parseInt(privLine[1], 10);
    } else {
      const privField = text.match(/Кількість дітей пільгових:\s*(\d+)/);
      if (privField) privilegedCount = parseInt(privField[1], 10);
    }
  }

  const showingsMatch = text.match(/Кількість показів:\s*(\d+)/);
  const showingsCount = showingsMatch ? parseInt(showingsMatch[1], 10) : 1;

  const totalSumLine = text.match(/Загальна сума:\s*([^\n]*)/);
  const totalSum = cleanNumber(totalSumLine?.[1]);

  const schoolSumLine = text.match(/На заклад[^:]*:\s*([^\n]*)/);
  const schoolSum = cleanNumber(schoolSumLine?.[1]);

  let remainderSum = 0;
  const remLine = text.match(/(?:Залишок|залишається)[:\s]*([^\n]*)/i);
  if (remLine) {
    remainderSum = cleanNumber(remLine[1]);
  }
  if (!remainderSum && totalSum && schoolSum) {
    remainderSum = totalSum - schoolSum;
  }

  const ratingMatch = text.match(/Оцінка[^:]*:\s*(\d+)/);
  const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 5;

  return {
    childrenCount,
    privilegedCount,
    showingsCount,
    classesCount: showingsCount,
    totalSum,
    schoolSum,
    remainderSum,
    rating,
  };
}

function isReportMsg(msg) {
  return msg['Етап воронки'] === 'Звіт Малювайка';
}

function groupByKindergarten(rows) {
  const map = new Map();
  for (const row of rows) {
    const kg = row['Садочок'];
    if (!map.has(kg)) map.set(kg, []);
    map.get(kg).push(row);
  }
  return map;
}

function groupByPipeline(rows) {
  const rootIds = new Set();
  for (const row of rows) {
    const parentId = row['Відповідь на ID'];
    if (!parentId || parentId === '') {
      rootIds.add(String(row['ID повідомлення']));
    }
  }

  function resolveRootId(row) {
    let current = row;
    const visited = new Set();
    while (current['Відповідь на ID'] && current['Відповідь на ID'] !== '') {
      const parentId = String(current['Відповідь на ID']);
      if (visited.has(parentId)) break;
      visited.add(parentId);
      if (rootIds.has(parentId)) return parentId;
      const parent = rows.find(r => String(r['ID повідомлення']) === parentId);
      if (!parent) return parentId;
      current = parent;
    }
    return String(current['ID повідомлення']);
  }

  const groups = new Map();
  for (const row of rows) {
    const rootId = resolveRootId(row);
    if (!groups.has(rootId)) groups.set(rootId, []);
    groups.get(rootId).push(row);
  }

  return [...groups.values()].map((msgs) => {
    msgs.sort((a, b) => new Date(a['Дата']) - new Date(b['Дата']));
    const stages = msgs.map(m => STAGE_MAP[m['Етап воронки']]).filter(Boolean);
    return {
      finalStatus: maxStage(stages),
      messages: msgs,
    };
  });
}

function assignReportsToPipelines(pipelines, reportMsgs) {
  if (pipelines.length === 0) {
    return reportMsgs.map(rm => ({
      finalStatus: 'RE_SALE',
      messages: [rm],
      reportMsg: rm,
      reportData: parseReport(rm['Текст повідомлення']),
    }));
  }

  const pipelineDates = pipelines.map(p => {
    const last = p.messages[p.messages.length - 1];
    return { pipeline: p, lastDate: new Date(last['Дата']) };
  });

  return reportMsgs.map(rm => {
    const reportDate = new Date(rm['Дата']);
    let best = pipelineDates[0];
    let bestDiff = Math.abs(reportDate - best.lastDate);
    for (const pd of pipelineDates) {
      const diff = Math.abs(reportDate - pd.lastDate);
      if (diff < bestDiff) {
        best = pd;
        bestDiff = diff;
      }
    }
    return {
      pipeline: best.pipeline,
      reportMsg: rm,
      reportData: parseReport(rm['Текст повідомлення']),
    };
  });
}

async function findOrCreateSchool(name, cityId) {
  const num = extractNumber(name);
  const named = extractNamed(name);

  if (num !== null) {
    const existing = await prisma.school.findFirst({
      where: { cityId, type: 'Садочок', name: { contains: `№${num}` } },
    });
    if (existing) return { school: existing, created: false };
  }

  if (named) {
    const all = await prisma.school.findMany({
      where: { cityId, type: 'Садочок' },
      select: { id: true, name: true },
    });
    const match = all.find(s => {
      const sNamed = extractNamed(s.name);
      return sNamed && sNamed === named;
    });
    if (match) return { school: match, created: false };
  }

  const school = await prisma.school.create({
    data: { name, type: 'Садочок', cityId },
  });
  return { school, created: true };
}

function buildHistoryEntries(eventId, messages, reportMsg, reportData, userId) {
  const entries = [];

  for (const msg of messages) {
    const stage = STAGE_MAP[msg['Етап воронки']] || 'BASE';
    const label = STAGE_LABELS[stage] || stage;
    entries.push({
      eventId,
      action: `[${label}] ${msg['Текст повідомлення'] || ''}`.trim(),
      userId,
      userName: msg['Відправник'] || '',
      role: 'MANAGER',
      createdAt: new Date(msg['Дата']),
    });
  }

  if (reportMsg && reportData) {
    entries.push({
      eventId,
      action: `[Звіт] ${reportMsg['Текст повідомлення'] || ''}`.trim(),
      userId,
      userName: reportMsg['Відправник'] || '',
      role: 'MANAGER',
      createdAt: new Date(reportMsg['Дата']),
    });
  }

  return entries;
}

function computeEventDate(pipelineMessages, reportMsg, reportData) {
  if (reportMsg && reportData) {
    const parsed = parseReportDate(reportMsg['Текст повідомлення']);
    if (parsed) {
      return {
        date: new Date(parsed.year, parsed.month - 1, parsed.day),
        time: reportMsg['Дата'].split(' ')[1] || null,
      };
    }
    return {
      date: new Date(reportMsg['Дата']),
      time: reportMsg['Дата'].split(' ')[1] || null,
    };
  }

  const lastMsg = pipelineMessages[pipelineMessages.length - 1];
  return {
    date: new Date(lastMsg['Дата']),
    time: lastMsg['Дата'].split(' ')[1] || null,
  };
}

async function importPipeline(group, school, cityId, userId) {
  const hasReport = !!group.reportMsg;
  const status = hasReport ? 'RE_SALE' : group.finalStatus;
  const { date: eventDate, time: eventTime } = computeEventDate(
    group.messages, group.reportMsg, group.reportData,
  );

  const existing = await prisma.event.findFirst({
    where: { schoolId: school.id, date: eventDate, project: 'Малювайка' },
  });
  if (existing) {
    console.log(`  ⏭ ${school.name.slice(0, 50)} → пропущено (дублікат)`);
    return { skipped: true, historyCount: 0 };
  }

  const event = await prisma.event.create({
    data: {
      cityId,
      schoolId: school.id,
      project: 'Малювайка',
      date: eventDate,
      time: eventTime,
      status,
      childrenActual: hasReport ? group.reportData.childrenCount : null,
      received: hasReport ? group.reportData.totalSum : null,
    },
  });

  const historyEntries = buildHistoryEntries(
    event.id, group.messages, group.reportMsg, group.reportData, userId,
  );
  if (historyEntries.length > 0) {
    await prisma.eventHistory.createMany({ data: historyEntries });
  }

  if (hasReport) {
    const rd = group.reportData;
    const reportDate = new Date(group.reportMsg['Дата']);
    await prisma.eventReport.create({
      data: {
        eventId: event.id,
        status: 'APPROVED',
        announcementDone: true,
        materialShown: true,
        childrenCount: rd.childrenCount,
        classesCount: rd.classesCount,
        privilegedCount: rd.privilegedCount,
        showingsCount: rd.showingsCount,
        totalSum: rd.totalSum,
        schoolSum: rd.schoolSum,
        remainderSum: rd.remainderSum,
        rating: rd.rating,
        submittedAt: reportDate,
        approvedAt: reportDate,
        createdAt: reportDate,
      },
    });
  }

  return { event, historyCount: historyEntries.length, skipped: false };
}

async function main() {
  const { jsonPath, city: cityName } = parseArgs();

  console.log(`\n📂 Читаю ${jsonPath}...`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Файл не знайдено: ${jsonPath}`);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`   Знайдено ${raw.length} повідомлень`);
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

  const kgMap = groupByKindergarten(raw);
  console.log(`📋 Знайдено ${kgMap.size} садочків, ${raw.length} повідомлень\n`);

  let totalEvents = 0;
  let totalHistory = 0;
  let createdSchools = 0;
  let totalWithReport = 0;
  let totalSkipped = 0;

  for (const [kgName, messages] of kgMap) {
    const conversationMsgs = messages.filter(m => !isReportMsg(m));
    const reportMsgs = messages.filter(m => isReportMsg(m));

    let school;
    let created;
    if (!dryRun) {
      const result = await findOrCreateSchool(kgName, city.id);
      school = result.school;
      created = result.created;
    } else {
      school = { id: 'dry-run', name: kgName };
      created = true;
    }
    if (created) createdSchools++;

    const pipelines = groupByPipeline(conversationMsgs);
    const attachments = assignReportsToPipelines(pipelines, reportMsgs);
    const attachedReportIds = new Set();

    for (const pipeline of pipelines) {
      const pipelineAttachments = attachments.filter(a => a.pipeline === pipeline);

      if (pipelineAttachments.length > 0) {
        for (const att of pipelineAttachments) {
          attachedReportIds.add(att.reportMsg['ID повідомлення']);
          const group = {
            finalStatus: pipeline.finalStatus,
            messages: pipeline.messages,
            reportMsg: att.reportMsg,
            reportData: att.reportData,
          };
          if (!dryRun) {
            const result = await importPipeline(group, school, city.id, defaultUser.id);
            if (result.skipped) { totalSkipped++; } else {
              totalEvents++; totalHistory += result.historyCount; totalWithReport++;
              console.log(`  ✅ ${school.name.slice(0, 50)} → RE_SALE (${result.historyCount} записів)`);
            }
          } else {
            totalEvents++; totalHistory += group.messages.length + 1; totalWithReport++;
            console.log(`  📋 ${school.name.slice(0, 50)} → RE_SALE | дітей:${att.reportData.childrenCount} сума:${att.reportData.totalSum} рейтинг:${att.reportData.rating}`);
          }
        }
      } else {
        const group = { finalStatus: pipeline.finalStatus, messages: pipeline.messages, reportMsg: null, reportData: null };
        if (!dryRun) {
          const result = await importPipeline(group, school, city.id, defaultUser.id);
          if (result.skipped) { totalSkipped++; } else {
            totalEvents++; totalHistory += result.historyCount;
            console.log(`  ✅ ${school.name.slice(0, 50)} → ${pipeline.finalStatus} (${result.historyCount} записів)`);
          }
        } else {
          totalEvents++; totalHistory += group.messages.length;
          console.log(`  📋 ${school.name.slice(0, 50)} → ${pipeline.finalStatus}`);
        }
      }
    }

    for (const rm of reportMsgs) {
      if (attachedReportIds.has(rm['ID повідомлення'])) continue;

      const reportData = parseReport(rm['Текст повідомлення']);
      const group = { finalStatus: 'RE_SALE', messages: [], reportMsg: rm, reportData };

      if (!dryRun) {
        const result = await importPipeline(group, school, city.id, defaultUser.id);
        if (result.skipped) { totalSkipped++; } else {
          totalEvents++; totalHistory += result.historyCount; totalWithReport++;
          console.log(`  ✅ ${school.name.slice(0, 50)} → RE_SALE (звіт без гілки, ${result.historyCount} записів)`);
        }
      } else {
        totalEvents++; totalHistory += 1; totalWithReport++;
        console.log(`  📋 ${school.name.slice(0, 50)} → RE_SALE (звіт без гілки) | дітей:${reportData.childrenCount} сума:${reportData.totalSum} рейтинг:${reportData.rating}`);
      }
    }
  }

  console.log(`\n🎉 Імпорт завершено!`);
  console.log(`   Садочків: ${kgMap.size} (нових: ${createdSchools})`);
  console.log(`   Подій: ${totalEvents} (зі звітами: ${totalWithReport})`);
  console.log(`   Записів історії: ${totalHistory}`);
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
