const fs = require("fs");
const path = require("path");

const outputFile = "telegram_audit.md";
fs.writeFileSync(outputFile, "# Аудит: Telegram Bot та Запуск\n\n");

// Точкові файли, які нам потрібні
const filesToCollect = [
  "apps/backend/src/telegram/telegram.module.ts",
  "apps/backend/src/telegram/telegram.service.ts",
  "apps/backend/src/main.ts",
  "apps/backend/package.json",
  "package.json", // root package.json
  "Procfile",
  "railway.json",
  "render.yaml"
];

let collectedCount = 0;
console.log("🚀 Починаю збір файлів для Telegram аудиту...\n");

filesToCollect.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`[!] Файл не знайдено (це нормально для конфігів деплою, пропускаю): ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const ext = path.extname(filePath).replace(".", "");

  let lang = ext;
  if (["ts", "tsx"].includes(ext)) lang = "typescript";
  if (ext === "md") lang = "markdown";
  if (ext === "json") lang = "json";
  if (ext === "yaml" || ext === "yml") lang = "yaml";
  if (filePath === "Procfile") lang = "text";

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано вміст: ${filePath}`);
  collectedCount++;
});

console.log(`\n✅ Готово! Зібрано файлів: ${collectedCount}. Результати збережено у ${outputFile}`);