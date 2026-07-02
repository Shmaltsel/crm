const fs = require('fs');
const path = require('path');

const outputFile = 'combined_auth_users.md';

fs.writeFileSync(outputFile, '# Файли Auth, Users та Seeder\n\n');

const filesToCollect = [
  'apps/backend/src/auth/guards/roles.guard.ts',
  'apps/backend/src/auth/decorators/roles.decorator.ts',
  'apps/backend/src/auth/interfaces/jwt-user.interface.ts',
  'apps/backend/src/users/users.service.ts',
  'apps/backend/prisma/seed-admin.js',
  'apps/backend/src/auth/auth.service.ts'
];

let collectedCount = 0;

console.log('🚀 Починаю збір файлів...\n');

filesToCollect.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.warn(`[!] Файл не знайдено: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath).replace('.', '');
  let lang = 'typescript';
  if (ext === 'js') lang = 'javascript';

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
  collectedCount++;
});

console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);