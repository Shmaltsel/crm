const fs = require('fs');
const path = require('path');

const outputFile = 'combined_roles_controllers.md';

fs.writeFileSync(outputFile, '# Файли Roles Guard та Контролерів\n\n');

const filesToCollect = [
  'apps/backend/src/auth/guards/roles.guard.ts',
  'apps/backend/src/auth/decorators/roles.decorator.ts',
  'apps/backend/src/auth/interfaces/jwt-user.interface.ts',
  'apps/backend/src/schools/schools.controller.ts',
  'apps/backend/src/events/events.controller.ts',
  'apps/backend/src/finance/finance.controller.ts',
  'apps/backend/src/cities/cities.controller.ts'
];

let collectedCount = 0;

console.log('🚀 Починаю збір файлів Role Guard та контролерів...\n');

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