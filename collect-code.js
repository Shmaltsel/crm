const fs = require("fs");
const path = require("path");

const outputFile = "cities_audit.md";
fs.writeFileSync(outputFile, "# Аудит: Міста (Навігація та Додавання)\n\n");

const filesToCollect = [
  "apps/frontend/src/pages/Cities.tsx",
  "apps/frontend/src/pages/CityProfile.tsx",
  "apps/frontend/src/components/cities/CityDesktopGrid.tsx",
  "apps/frontend/src/components/cities/CityMobileHeader.tsx",
  "apps/frontend/src/components/cities/CityMobileList.tsx",
  "apps/backend/src/cities/cities.controller.ts",
  "apps/backend/src/cities/cities.service.ts",
  "apps/backend/src/config/cities.config.ts",
  "apps/backend/src/config/cityConfig.ts",
  "apps/frontend/src/constants/cityConfig.ts",
  "apps/frontend/src/config/cityConfig.ts"
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