const fs = require('fs');
const path = require('path');

const outputFile = 'combined_final_fixes.md';

fs.writeFileSync(outputFile, '# Фінальні файли для виправлення E2E тестів\n\n');

const filesToCollect = [
  'apps/backend/src/events/events.service.ts',
  'apps/backend/.env',
  'apps/backend/.env.test',
  'apps/backend/test/dashboard.e2e-spec.ts',
  'apps/backend/src/telegram/telegram.service.ts',
  'apps/frontend/e2e/login.spec.ts',
  'apps/frontend/src/pages/Login.tsx'
];

let collectedCount = 0;

console.log('🚀 Починаю збір фінальних файлів...\n');

filesToCollect.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    // Не виводимо помилку для .env файлів, оскільки вони опціональні
    if (!filePath.includes('.env')) {
      console.warn(`[!] Файл не знайдено: ${filePath}`);
    }
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath).replace('.', '');
  
  let lang = ext;
  if (['ts', 'tsx'].includes(ext)) lang = 'typescript';
  if (filePath.includes('.env')) lang = 'bash';

  // Базове маскування можливих секретів у .env (залишаємо тільки хост/базу)
  if (filePath.includes('.env')) {
    content = content.replace(/(DATABASE_URL="?postgresql:\/\/)[^:]+:[^@]+(@.*)/g, '$1***:***$2');
    content = content.replace(/(TELEGRAM_BOT_TOKEN="?).*("?)/g, '$1***$2');
    content = content.replace(/(JWT_SECRET="?).*("?)/g, '$1***$2');
  }

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
  collectedCount++;
});

console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);
console.log('⚠️  Будь ласка, швидко переглянь файл на наявність реальних паролів перед тим, як кидати його сюди.');