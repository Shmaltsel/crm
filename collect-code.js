const fs = require("fs");
const path = require("path");

const outputFile = "bugfix_audit.md";
fs.writeFileSync(outputFile, "# Аудит: Фікс тестів та сервісів\n\n");

const filesToCollect = [
  "apps/backend/src/dashboard/dashboard.service.ts",
  "apps/backend/src/dashboard/dashboard.service.spec.ts",
  "apps/backend/src/cities/cities.controller.spec.ts",
  "apps/backend/src/common/guards/ownership.guard.ts",
  "apps/backend/src/cities/cities.module.ts",
  "apps/backend/src/events/events.service.ts",
  "apps/backend/src/events/events.service.spec.ts",
  "apps/backend/src/schools/schools.service.ts",
  "apps/backend/src/schools/schools.service.spec.ts"
];

let collectedCount = 0;
console.log("🚀 Починаю збір файлів для аудиту...\n");

filesToCollect.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`[!] Файл не знайдено: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const ext = path.extname(filePath).replace(".", "");

  let lang = ext;
  if (["ts", "tsx"].includes(ext)) lang = "typescript";
  if (ext === "md") lang = "markdown";
  if (ext === "json") lang = "json";
  if (ext === "yaml" || ext === "yml") lang = "yaml";
  
  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано вміст: ${filePath}`);
  collectedCount++;
});

console.log(`\n✅ Готово! Зібрано файлів: ${collectedCount}. Результати збережено у ${outputFile}`);