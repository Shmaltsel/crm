const fs = require('fs');
const path = require('path');

// Назва вихідного файлу
const outputFile = 'combined_methods_and_dto.md';

// Створюємо або очищуємо файл із заголовком
fs.writeFileSync(outputFile, '# Файли DTO та сервісів для фінальних правок\n\n');

// Список файлів
const filesToCollect = [
  'apps/backend/src/cities/dto/create-crew.dto.ts',
  'apps/backend/src/cities/cities.service.ts',
  'apps/backend/src/projects/dto/create-project.dto.ts',
  'apps/backend/src/projects/projects.service.ts',
  'apps/backend/src/users/users.service.ts',
  'apps/backend/src/dashboard/dashboard.service.ts'
];

console.log('🚀 Починаю збір DTO та сервісів...\n');

let collectedCount = 0;

filesToCollect.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.warn(`[!] Файл не знайдено: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath).replace('.', '');
  const lang = ['ts', 'tsx'].includes(ext) ? 'typescript' : ext;

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
  collectedCount++;
});

console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);