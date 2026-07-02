const fs = require("fs");
const path = require("path");

const outputFile = "combined_performance_files.md";

fs.writeFileSync(
  outputFile,
  "# Файли Dashboard, Schools, Events та Prisma Schema\n\n",
);

const filesToCollect = [
  "apps/backend/src/dashboard/dashboard.service.ts",
  "apps/backend/src/dashboard/dashboard.module.ts",
  "apps/backend/src/dashboard/dashboard.controller.ts",
  "apps/backend/prisma/schema.prisma",
  "apps/backend/src/schools/schools.service.ts",
  "apps/backend/src/common/dto/page-meta.dto.ts",
  "apps/backend/src/common/dto/page-options.dto.ts",
  "apps/backend/src/events/events.service.ts",
];

let collectedCount = 0;

console.log("🚀 Починаю збір файлів для аналізу оптимізації та пагінації...\n");

filesToCollect.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`[!] Файл не знайдено: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const ext = path.extname(filePath).replace(".", "");

  let lang = ext;
  if (["ts", "tsx"].includes(ext)) lang = "typescript";
  if (ext === "prisma") lang = "prisma";

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
  collectedCount++;
});

console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);
