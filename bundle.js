const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const MODE = "audit";
const MAX_TOKENS = 85000;

const OUTPUT_DIR = "project_export";

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".turbo",
  ".vercel",
  ".next",
  ".idea",
  ".vscode",
  ".cache",
  ".output",
  "coverage",
  "test-results",
  ".lighthouseci",
  "playwright-report",
  "output",
  ".history",
  "project_export",
]);

const PRIORITY_FILES = [
  "README.md",
  ".github/copilot-instructions.md",
  "AGENTS.md",
  "prisma/schema.prisma",
  "apps/backend/src/main.ts",
  "apps/backend/src/app.module.ts",
  "apps/backend/prisma/schema.prisma",
  "apps/frontend/src/main.tsx",
  "apps/frontend/src/App.tsx",
  "package.json",
  "pnpm-workspace.yaml",
];

let bundleIndex = 1;
let currentTokens = 0;
let currentBundle = "";

let totalFiles = 0;
let totalLines = 0;
let totalTokens = 0;

const manifest = [];
const skipped = [];

// ====================== FULL PROJECT MAP ======================

function generateFullProjectMap() {
  const mapContent = `# FULL PROJECT MAP — СВІТЛО ЗНАНЬ CRM
**Версія для AI (Big Pickle / Opencode)**  
**Дата генерації:** ${new Date().toISOString()}
**Режим:** ${MODE}

---

## 1. Загальний Огляд

Це **PNPM Workspace Monorepo** CRM-системи для управління школами та садочками.

**Основні частини:**
- **Backend**: NestJS + Prisma + PostgreSQL + Redis
- **Frontend**: React + Vite + TypeScript + React Query + Tailwind
- **База даних**: Prisma ORM

**Ключова бізнес-логіка:** School → Event → Preparation → Report → Finance + Salary

---

## 2. Структура Проекту

\`\`\`
project-root/
├── apps/
│   ├── backend/          ← NestJS API (основний бекенд)
│   └── frontend/         ← React SPA
├── prisma/
│   └── schema.prisma     ← ★ НАЙВАЖЛИВІШИЙ ФАЙЛ
├── .github/
│   └── copilot-instructions.md
├── package.json
└── pnpm-workspace.yaml
\`\`\`

---

## 3. Backend — Ключові Файли (читати в цьому порядку)

**★★★★★ Критично важливі:**
- \`prisma/schema.prisma\` — структура БД, всі моделі та зв’язки
- \`apps/backend/src/app.module.ts\` — глобальна конфігурація (guards, interceptors, pipes)
- \`apps/backend/src/main.ts\` — запуск сервера
- \`apps/backend/src/auth/\` — автентифікація, JWT cookies, CSRF

**Важливі модулі:**
- \`events/\` — основна бізнес-логіка (події, звіти, підготовка)
- \`schools/\` — школи та садочки
- \`dashboard/\` — дашборд та аналітика
- \`finance/\` — фінанси, зарплати, витрати
- \`inventory/\` — склад

---

## 4. Frontend — Ключові Файли

**★★★★★ Критично важливі:**
- \`apps/frontend/src/App.tsx\` — роутинг та ProtectedRoute
- \`apps/frontend/src/main.tsx\` — entry point
- \`apps/frontend/src/context/AuthContext.tsx\` — авторизація
- \`apps/frontend/src/context/CityContext.tsx\` — контекст вибраного міста

**Важливі папки:**
- \`hooks/\` — всі кастомні хуки (useSchools, useCalendarData тощо)
- \`pages/\` — основні сторінки
- \`components/school-profile/\` — профіль школи
- \`components/ui/\` — переиспользуемые UI компоненти

---

## 5. Рекомендації для AI (Big Pickle)

1. **Завжди читайте цей файл першим** перед будь-яким аналізом.
2. Для роботи з БД починайте з \`prisma/schema.prisma\`.
3. Для змін у бізнес-логіці — дивіться папку \`events/\`.
4. При будь-яких змінах перевіряйте вплив на авторизацію та ролі.
5. Використовуйте \`FULL_PROJECT_MAP.md\` для швидкої навігації по проекту.

---

**Цей файл створено автоматично.**
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, "FULL_PROJECT_MAP.md"), mapContent);
  console.log("✓ FULL_PROJECT_MAP.md створено (читати першим!)");
}

// ====================== ІНШІ ФУНКЦІЇ ======================

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function writeBundle(force = false) {
  if (!force && currentTokens < MAX_TOKENS) return;

  const filename = `bundle_${String(bundleIndex).padStart(2, "0")}.md`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), currentBundle);

  bundleIndex++;
  currentBundle = "";
  currentTokens = 0;
}

function addBlock(rel, content, description = "") {
  let header = `# FILE: ${rel}\n`;
  if (description) header += `# ${description}\n`;
  header += `\n\`\`\`\n${content}\n\`\`\`\n\n`;

  const tokens = estimateTokens(header);
  if (currentTokens + tokens > MAX_TOKENS) writeBundle(true);

  currentBundle += header;
  currentTokens += tokens;
  totalTokens += tokens;

  manifest.push({
    file: rel,
    bundle: `bundle_${String(bundleIndex).padStart(2, "0")}.md`,
  });
}

function shouldInclude(filePath) {
  const basename = path.basename(filePath);
  if (
    [
      "bundle.js",
      "collect-code.js",
      "coverage_report.txt",
      "FULL_PROJECT_MAP.md",
    ].includes(basename)
  )
    return false;

  const ext = path.extname(filePath).toLowerCase();
  if (MODE === "audit") {
    return (
      [
        ".ts",
        ".tsx",
        ".js",
        ".json",
        ".prisma",
        ".md",
        ".yaml",
        ".yml",
        ".sql",
      ].includes(ext) || basename === "package.json"
    );
  }
  return true;
}

function getPriority(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  return PRIORITY_FILES.indexOf(rel) !== -1 ? PRIORITY_FILES.indexOf(rel) : 999;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !IGNORE_DIRS.has(e.name) && !e.name.startsWith("."))
    .sort((a, b) => {
      const aFull = path.join(dir, a.name);
      const bFull = path.join(dir, b.name);
      return (
        getPriority(aFull) - getPriority(bFull) || a.name.localeCompare(b.name)
      );
    });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!shouldInclude(full)) {
      skipped.push({ path: rel, reason: "filtered" });
      continue;
    }

    try {
      const text = fs.readFileSync(full, "utf8");
      totalFiles++;
      totalLines += text.split(/\r?\n/).length;

      let description = PRIORITY_FILES.some((p) => rel.endsWith(p))
        ? "КРИТИЧНО ВАЖЛИВИЙ ФАЙЛ"
        : "";

      addBlock(rel, text, description);
      process.stdout.write(`\rОброблено файлів: ${totalFiles}`);
    } catch (err) {
      skipped.push({ path: rel, reason: err.message });
    }
  }
}

// ====================== ЗАПУСК ======================

if (fs.existsSync(OUTPUT_DIR))
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIR);

console.log("Генерація Project Export з FULL_PROJECT_MAP...\n");

generateFullProjectMap();

// Скануємо основні директорії
["apps", "prisma", ".github"].forEach((root) => {
  if (fs.existsSync(root)) {
    walk(root);
  }
});

writeBundle(true);

console.log("\n\n========================================");
console.log("ЕКСПОРТ УСПІШНО ЗАВЕРШЕНО!");
console.log("========================================");
console.log(`Файлів оброблено : ${totalFiles}`);
console.log(`Токенів ≈        : ${totalTokens}`);
console.log(`Бандлів          : ${bundleIndex - 1}`);
console.log(`FULL_PROJECT_MAP.md — читати першим!`);
console.log("========================================");

fs.writeFileSync(
  path.join(OUTPUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);
fs.writeFileSync(
  path.join(OUTPUT_DIR, "skipped.json"),
  JSON.stringify(skipped, null, 2),
);
