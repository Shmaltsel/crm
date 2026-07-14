/**
 * Імпорт подій з JSON-файлу в CRM.
 *
 * JSON-формат: масив повідомлень, кожне має:
 *   "ID повідомлення", "Відповідь на ID", "Садочок",
 *   "Етап воронки", "Дата", "Відправник", "Текст повідомлення"
 *
 * Групування: повідомлення з однаковим "Відповідь на ID" (або root-ID)
 * утворюють одну подію. Фінальний статус = найвищий етап воронки.
 *
 * Використання:
 *   node prisma/import-pipeline.js <json> --city <місто>
 *
 * Приклад:
 *   node prisma/import-pipeline.js ../../38_sadok_test.json --city Львів
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const STAGE_ORDER = [
  'BASE',
  'FIRST_CONTACT',
  'INTERESTED',
  'PRE_APPROVAL',
  'DATE_CONFIRMED',
  'PREPARATION',
  'IN_PROGRESS',
  'DONE',
  'REPORT',
  'RE_SALE',
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
  'Завершено': 'REPORT',
  'Захід завершено': 'REPORT',
};

const STAGE_LABELS = {
  BASE: 'База',
  FIRST_CONTACT: 'Знайомство',
  DATE_CONFIRMED: 'Підтвердження дати',
  PREPARATION: 'Оголошення',
  IN_PROGRESS: 'Підготовка',
  DONE: 'Проведення заходу',
  REPORT: 'Звіт',
};

function parseArgs() {
  const args = process.argv.slice(2);
  const jsonPath = args[0];
  let city = 'Демо Місто';

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--city' && args[i + 1]) city = args[++i];
  }

  if (!jsonPath) {
    console.error('Використання: node import-pipeline.js <json> --city <місто>');
    process.exit(1);
  }

  return { jsonPath: path.resolve(jsonPath), city };
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

function groupMessages(rows) {
  const groups = new Map();

  for (const row of rows) {
    const rootId = row['Відповідь на ID'] || row['ID повідомлення'];
    if (!groups.has(rootId)) {
      groups.set(rootId, []);
    }
    groups.get(rootId).push(row);
  }

  return [...groups.values()].map((msgs) => {
    msgs.sort((a, b) => new Date(a['Дата']) - new Date(b['Дата']));
    const root = msgs[0];
    const stages = msgs
      .map((m) => STAGE_MAP[m['Етап воронки']])
      .filter(Boolean);

    return {
      kindergarten: root['Садочок'],
      finalStatus: maxStage(stages),
      messages: msgs,
    };
  });
}

async function findOrCreateSchool(name, cityId) {
  const existing = await prisma.school.findFirst({
    where: { name, cityId, type: 'kindergarten' },
  });
  if (existing) return existing;

  return prisma.school.create({
    data: {
      name,
      type: 'kindergarten',
      cityId,
    },
  });
}

async function importGroup(group, cityId, userId, userName) {
  const school = await findOrCreateSchool(group.kindergarten, cityId);

  const firstMsg = group.messages[0];
  const eventDate = new Date(firstMsg['Дата']);

  const event = await prisma.event.create({
    data: {
      cityId,
      schoolId: school.id,
      project: group.kindergarten,
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

  return { event, school, historyCount: historyEntries.length };
}

async function main() {
  const { jsonPath, city: cityName } = parseArgs();

  console.log(`\n📂 Читаю ${jsonPath}...`);
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`   Знайдено ${raw.length} повідомлень`);

  const city = await prisma.city.findFirst({ where: { name: cityName } });
  if (!city) {
    console.error(`❌ Місто "${cityName}" не знайдено. Створіть його спочатку.`);
    process.exit(1);
  }

  const defaultUser = await prisma.user.findFirst({
    where: { cityId: city.id, role: 'MANAGER' },
  });
  if (!defaultUser) {
    console.error(`❌ У місті "${cityName}" немає менеджера. Створіть його спочатку.`);
    process.exit(1);
  }

  const groups = groupMessages(raw);
  console.log(`\n📋 Знайдено ${groups.length} подій для імпорту:\n`);

  let totalEvents = 0;
  let totalHistory = 0;

  for (const group of groups) {
    const result = await importGroup(
      group,
      city.id,
      defaultUser.id,
      defaultUser.name,
    );

    totalEvents++;
    totalHistory += result.historyCount;

    console.log(
      `  ✅ ${result.school.name} → статус: ${group.finalStatus} (${result.historyCount} записів історії)`,
    );
  }

  console.log(`\n🎉 Імпорт завершено!`);
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
