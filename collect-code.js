const fs = require("fs");
const path = require("path");

const outputFile = "combined_security_audit.md";

fs.writeFileSync(outputFile, "# Файли Auth, Security та Prisma Schema\n\n");

const filesToCollect = [
  "apps/backend/prisma/schema.prisma",
  "apps/backend/src/auth/auth.module.ts",
  "apps/backend/src/auth/auth.service.ts",
  "apps/backend/src/auth/auth.controller.ts",
  "apps/backend/src/auth/auth.guard.ts",
  "apps/backend/src/auth/interfaces/jwt-user.interface.ts",
  "apps/backend/src/auth/dto/login.dto.ts",
  "apps/backend/src/main.ts",
  "apps/backend/src/app.module.ts",
  "apps/backend/package.json",
];

let collectedCount = 0;

console.log("🚀 Починаю збір файлів для Security & Audit...\n");

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
  if (ext === "json") lang = "json";

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
  collectedCount++;
});

console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);
