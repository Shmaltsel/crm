#!/usr/bin/env node
/**
 * Масовий імпорт подій з crm_with_reports_updated.json.
 *
 * Формат JSON: масив повідомлень з полями:
 *   "ID повідомлення", "Відповідь на ID", "Садочок",
 *   "Етап воронки", "Дата", "Відправник", "Текст повідомлення"
 *
 * Групування: за назвою садочка → за root-message (ветка пайплайну).
 * Кожна ветка = окрема подія в CRM.
 *
 * Використання:
 *   node prisma/import-pipeline.js --city <місто>
 *
 * Файл має лежати в корені проєкту: ../../crm_with_reports_updated.json
 */

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

function parseArgs() {
  const args = process.argv.slice(2);
  let city = 'Львів';
  let jsonPath = path.resolve(__dirname, '..', '..', '..', 'crm_with_reports_updated.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--city' && args[i + 1]) city = args[++i];
    if (args[i] === '--file' && args[i + 1]) jsonPath = path.resolve(args[++i]);
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

function parseReport(text) {
  const num = (pattern) => {
    const m = text.match(pattern);
    return m ? parseInt(m[1].replace(/[.,\s]/g, ''), 10) || 0 : 0;
  };
  return {
    childrenCount: num(/Кількість дітей:\s*(\d+)/),
    privilegedCount: num(/пільгов\w*:\s*(\d+)/i) || num(/\+(\d+)\s*пільг/),
    showingsCount: num(/Кількість показів:\s*(\d+)/),
    totalSum: num(/Загальна сума:\s*([\d.,\s]+)/),
    schoolSum: num(/На заклад.*?:\s*([\d.,\s]+)/),
    remainderSum: num(/(?:Залишок|залишається):\s*([\d.,\s]+)/),
    rating: num(/Оцінка.*?:\s*(\d+)/),
  };
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
    const reportMsg = msgs.find(m => m['Етап воронки'] === 'Звіт Малювайка');
    return {
      finalStatus: maxStage(stages),
      messages: msgs,
      reportData: reportMsg ? parseReport(reportMsg['Текст повідомлення']) : null,
    };
  });
}

async function findOrCreateSchool(name, cityId) {
  const num = extractNumber(name);
  const named = extractNamed(name);

  if (num !== null) {
    const existing = await prisma.school.findFirst({
      where: {
        cityId,
        type: 'Садочок',
        name: { contains: `№${num}` },
      },
    });
    if (existing) return existing;
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
    if (match) return match;
  }

  return prisma.school.create({
    data: { name, type: 'Садочок', cityId },
  });
}

async function importPipeline(group, school, cityId, userId, userName) {
  const firstMsg = group.messages[0];
  const eventDate = new Date(firstMsg['Дата']);

  const event = await prisma.event.create({
    data: {
      cityId,
      schoolId: school.id,
      project: school.name,
      date: eventDate,
      status: group.finalStatus,
    },
  });

  const historyEntries = group.messages.map((msg) => {
    const stage = STAGE_MAP[msg['Етап воронки']] || 'BASE';
    const label = STAGE_LABELS[stage] || stage;
    return {
      eventId: event.id,
      action: `[${label}] ${msg['Текст повідомлення'] || ''}`.trim(),
      comment: `Відправник: ${msg['Відправник']}\nДата: ${msg['Дата']}`,
      userId,
      userName,
      role: 'MANAGER',
    };
  });

  await prisma.eventHistory.createMany({ data: historyEntries });

  if (group.finalStatus === 'RE_SALE') {
    const report = group.reportData || {};
    await prisma.eventReport.create({
      data: {
        eventId: event.id,
        status: 'APPROVED',
        announcementDone: true,
        materialShown: true,
        childrenCount: report.childrenCount || 0,
        classesCount: report.showingsCount || 0,
        privilegedCount: report.privilegedCount || 0,
        showingsCount: report.showingsCount || 1,
        totalSum: report.totalSum || 0,
        schoolSum: report.schoolSum || 0,
        remainderSum: report.remainderSum || 0,
        rating: report.rating || 5,
        submittedAt: eventDate,
        approvedAt: eventDate,
      },
    });
  }

  return { event, historyCount: historyEntries.length };
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

  const city = await prisma.city.findFirst({ where: { name: cityName } });
  if (!city) {
    console.error(`❌ Місто "${cityName}" не знайдено.`);
    process.exit(1);
  }

  const defaultUser = await prisma.user.findFirst({
    where: { cityId: city.id, role: 'MANAGER' },
  });
  if (!defaultUser) {
    console.error(`❌ У місті "${cityName}" немає менеджера.`);
    process.exit(1);
  }

  const kgMap = groupByKindergarten(raw);
  console.log(`\n📋 Знайдено ${kgMap.size} садочків, ${raw.length} повідомлень\n`);

  let totalEvents = 0;
  let totalHistory = 0;
  let createdSchools = 0;

  for (const [kgName, messages] of kgMap) {
    const school = await findOrCreateSchool(kgName, city.id);
    if (!school._wasCreated) createdSchools++;

    const pipelines = groupByPipeline(messages);

    for (const pipeline of pipelines) {
      const result = await importPipeline(pipeline, school, city.id, defaultUser.id, defaultUser.name);
      totalEvents++;
      totalHistory += result.historyCount;
      console.log(
        `  ✅ ${school.name.slice(0, 50)} → ${pipeline.finalStatus} (${result.historyCount} записів)`,
      );
    }
  }

  console.log(`\n🎉 Імпорт завершено!`);
  console.log(`   Садочків: ${kgMap.size}`);
  console.log(`   Подій: ${totalEvents}`);
  console.log(`   Записів історії: ${totalHistory}`);
}

main()
  .catch((e) => {
    console.error('❌ Помилка імпорту:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
