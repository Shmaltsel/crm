const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const MODE = "audit";
const MAX_TOKENS = 85000;
const OUTPUT_DIR = "project_export";

// Розширений список ігнорування (включаючи lock-файли та медіа)
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
  "public",
  "assets",
]);

const IGNORE_FILES = new Set([
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
  ".DS_Store",
  "bundle.js",
  "collect-code.js",
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
let currentBundleFiles = [];
let currentBundleContent = "";

let totalFiles = 0;
let totalLines = 0;
let totalTokens = 0;

const manifest = [];
const skipped = [];

// ====================== ГЕНЕРАЦІЯ ДЕРЕВА ПРОЕКТУ ======================

function generateProjectTree(dir, prefix = "", depth = 0) {
  if (depth > 4) return ""; // Обмеження глибини, щоб не перевантажувати контекст

  let treeString = "";
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !IGNORE_DIRS.has(e.name) && !e.name.startsWith("."))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";

    if (entry.isDirectory()) {
      treeString += `${prefix}${connector}${entry.name}/\n`;
      treeString += generateProjectTree(
        path.join(dir, entry.name),
        prefix + (isLast ? "    " : "│   "),
        depth + 1,
      );
    } else if (shouldInclude(path.join(dir, entry.name))) {
      treeString += `${prefix}${connector}${entry.name}\n`;
    }
  });

  return treeString;
}

// ====================== ФОРМУВАННЯ КАРТИ ======================

function generateFullProjectMap() {
  const tree = generateProjectTree(ROOT);

  const mapContent = `# FULL PROJECT MAP — СВІТЛО ЗНАНЬ CRM
**Версія для AI Agents (Cursor, Cline, GitHub Copilot)** **Дата генерації:** ${new Date().toISOString()}
**Режим:** ${MODE}

<project_overview>
Це PNPM Workspace Monorepo CRM-системи для управління школами та садочками.
- Backend: NestJS + Prisma + PostgreSQL + Redis
- Frontend: React + Vite + TypeScript + React Query + Tailwind
- База даних: Prisma ORM
Ключова бізнес-логіка: School → Event → Preparation → Report → Finance + Salary
</project_overview>

<project_structure>
\`\`\`text
project-root/
${tree}
\`\`\`
</project_structure>

<ai_instructions>
1. ВИКОРИСТОВУЙТЕ ДЕРЕВО: Вище наведено реальне дерево файлів. Використовуйте його для розуміння архітектури.
2. ПРІОРИТЕТИ: Починайте аналіз з \`prisma/schema.prisma\`, \`app.module.ts\` та \`App.tsx\`.
3. ЗВ'ЯЗКИ: Звертайте увагу на імпорти між фронтендом (features) та бекендом (endpoints).
4. ФОРМАТ: Файли в бандлах загорнуті у XML-теги <file path="...">...</file>.
5. аналізуй проект - потім я буду давати тобі проблеми або ідеї - твоя задача аналізувати проект та давати найкращі ідеї та інструкції ai агенту, який впроваджуватиме твої інструкції
</ai_instructions>
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, "FULL_PROJECT_MAP.md"), mapContent);
  console.log("✓ FULL_PROJECT_MAP.md створено (з динамічним деревом!)");
}

// ====================== ІНШІ ФУНКЦІЇ ======================

// Точніша оцінка токенів (в середньому 1 токен = 3.5 символи для коду)
function estimateTokens(text) {
  return Math.ceil(text.length / 3.5);
}

function writeBundle(force = false) {
  if (!force && currentTokens < MAX_TOKENS) return;
  if (currentBundleFiles.length === 0) return;

  const filename = `bundle_${String(bundleIndex).padStart(2, "0")}.xml`;

  // Додаємо зміст (TOC) на початок бандлу для кращого розуміння контексту ШІ
  const toc = `<bundle_index>\nЦей бандл містить наступні файли:\n${currentBundleFiles.map((f) => `- ${f}`).join("\n")}\n</bundle_index>\n\n`;

  fs.writeFileSync(path.join(OUTPUT_DIR, filename), toc + currentBundleContent);

  bundleIndex++;
  currentBundleContent = "";
  currentBundleFiles = [];
  currentTokens = 0;
}

function addBlock(rel, content, description = "") {
  // Видаляємо зайві порожні рядки для економії токенів
  const cleanContent = content.replace(/\n\s*\n/g, "\n\n");

  // Використовуємо XML-теги замість Markdown (ШІ парсить їх на 30% точніше)
  let block = `<file path="${rel}"${description ? ` importance="CRITICAL"` : ""}>\n`;
  block += `${cleanContent}\n`;
  block += `</file>\n\n`;

  const tokens = estimateTokens(block);
  if (currentTokens + tokens > MAX_TOKENS && currentBundleFiles.length > 0) {
    writeBundle(true);
  }

  currentBundleContent += block;
  currentBundleFiles.push(rel);
  currentTokens += tokens;
  totalTokens += tokens;

  manifest.push({
    file: rel,
    bundle: `bundle_${String(bundleIndex).padStart(2, "0")}.xml`,
    tokens: tokens,
  });
}

function shouldInclude(filePath) {
  const basename = path.basename(filePath);
  if (IGNORE_FILES.has(basename)) return false;

  const ext = path.extname(filePath).toLowerCase();
  if (MODE === "audit") {
    return (
      [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".json",
        ".prisma",
        ".md",
        ".yaml",
        ".yml",
        ".sql",
        ".css",
        ".html",
      ].includes(ext) ||
      basename === "package.json" ||
      basename === "Dockerfile"
    );
  }
  return true;
}

function getPriority(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const index = PRIORITY_FILES.indexOf(rel);
  return index !== -1 ? index : 999;
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
      skipped.push({ path: rel, reason: "filtered extension/ignored file" });
      continue;
    }

    try {
      const text = fs.readFileSync(full, "utf8");
      totalFiles++;
      totalLines += text.split(/\r?\n/).length;

      let description = PRIORITY_FILES.some((p) => rel.endsWith(p))
        ? "CRITICAL"
        : "";

      addBlock(rel, text, description);
      process.stdout.write(`\rОброблено файлів: ${totalFiles}`);
    } catch (err) {
      skipped.push({ path: rel, reason: err.message });
    }
  }
}

// ====================== ЗАПУСК ======================

if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR);

console.log("🚀 Генерація AI Project Export...\n");

generateFullProjectMap();

// Скануємо корінь і основні директорії (додано packages якщо у вас монорепа)
["apps", "packages", "prisma", ".github", "src"].forEach((root) => {
  const rootPath = path.join(ROOT, root);
  if (fs.existsSync(rootPath)) {
    walk(rootPath);
  }
});
// Також скануємо важливі файли в корені проекту (package.json, тощо)
const rootFiles = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isFile() && shouldInclude(path.join(ROOT, e.name)));
for (const file of rootFiles) {
  const full = path.join(ROOT, file.name);
  const rel = path.relative(ROOT, full).replace(/\\/g, "/");
  try {
    const text = fs.readFileSync(full, "utf8");
    addBlock(rel, text, getPriority(full) < 999 ? "CRITICAL" : "");
  } catch (e) {}
}

writeBundle(true);

console.log("\n\n========================================");
console.log("✅ ЕКСПОРТ УСПІШНО ЗАВЕРШЕНО!");
console.log("========================================");
console.log(`📄 Файлів оброблено : ${totalFiles}`);
console.log(`🔢 Рядків коду      : ${totalLines}`);
console.log(`🧠 Токенів ≈        : ${totalTokens}`);
console.log(`📦 Бандлів (.xml)   : ${bundleIndex - 1}`);
console.log(`🗺️  FULL_PROJECT_MAP.md — читати першим!`);
console.log("========================================");

fs.writeFileSync(
  path.join(OUTPUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);
fs.writeFileSync(
  path.join(OUTPUT_DIR, "skipped.json"),
  JSON.stringify(skipped, null, 2),
);
