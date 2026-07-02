const fs = require('fs');
const path = require('path');

const outputFile = 'combined_core_config.md';

fs.writeFileSync(outputFile, '# Файли конфігурації, Main, AppModule та Seeder\n\n');

const targets = [
  'apps/backend/src/main.ts',
  'apps/backend/src/app.module.ts',
  'apps/backend/package.json',
  'apps/backend/prisma/seed-admin.js',
  'apps/backend/src/auth/csrf.guard.ts',
  'apps/backend/.env',
  { dir: 'apps/backend/src/config' } // Папка для перевірки
];

let collectedCount = 0;

console.log('🚀 Починаю збір кореневих файлів конфігурації...\n');

function appendFileToMd(filePath) {
  if (!fs.existsSync(filePath)) {
    // Не кричимо сильно, якщо це необов'язкові файли типу csrf.guard.ts або .env
    console.warn(`[!] Файл не знайдено: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath).replace('.', '');
  
  let lang = ext;
  if (['ts', 'tsx'].includes(ext)) lang = 'typescript';
  if (ext === 'json') lang = 'json';
  if (ext === 'js') lang = 'javascript';
  if (filePath.includes('.env')) lang = 'bash';

  // Маскування значень у .env (залишаємо тільки ключі для розуміння структури)
  if (filePath.includes('.env')) {
    content = content.replace(/^([A-Z_]+)=.*/gm, '$1=***');
  }

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
  collectedCount++;
}

function processDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`[i] Директорія конфігів відсутня (це нормально, якщо конфіг лежить в іншому місці): ${dirPath}`);
    return;
  }
  
  const items = fs.readdirSync(dirPath);
  let foundFiles = false;

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    if (fs.statSync(fullPath).isFile()) {
      appendFileToMd(fullPath);
      foundFiles = true;
    }
  });

  if (!foundFiles) {
    console.log(`[i] Директорія ${dirPath} існує, але вона порожня.`);
  }
}

targets.forEach(target => {
  if (typeof target === 'string') {
    appendFileToMd(target);
  } else if (target.dir) {
    processDir(target.dir);
  }
});

console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);