const fs = require('fs');
const path = require('path');

// Назва вихідного файлу
const outputFile = 'combined_code.md';

// Очищуємо або створюємо файл із заголовком
fs.writeFileSync(outputFile, '# Зібраний код проєкту\n\n');

// Список файлів та папок
const targets = [
  'apps/backend/src/auth/auth.controller.ts',
  'apps/backend/src/cities/cities.controller.ts',
  'apps/backend/src/dashboard/dashboard.controller.ts',
  'apps/backend/src/events/events.controller.ts',
  // Обробка wildcard: читаємо всі .ts файли з папки
  { dir: 'apps/backend/src/events/dto', ext: '.ts' }, 
  'apps/backend/src/finance/finance.controller.ts',
  'apps/backend/src/finance/create-expense-item.dto.ts',
  'apps/backend/src/issues/issues.controller.ts',
  'apps/backend/src/projects/projects.controller.ts',
  'apps/backend/src/schools/schools.controller.ts',
  'apps/backend/src/users/users.controller.ts',
  'apps/backend/prisma/schema.prisma'
];

// Функція для додавання вмісту файлу в Markdown
function appendFileToMd(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[!] Попередження: Файл не знайдено - ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath).replace('.', '');
  // Налаштування підсвічування синтаксису
  const lang = ext === 'ts' ? 'typescript' : ext; 

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
}

// Основний цикл обробки
targets.forEach(target => {
  if (typeof target === 'string') {
    appendFileToMd(target);
  } else if (target.dir) {
    if (fs.existsSync(target.dir)) {
      const files = fs.readdirSync(target.dir)
        .filter(file => file.endsWith(target.ext))
        .map(file => path.join(target.dir, file));
        
      if (files.length === 0) {
        console.warn(`[i] Папка ${target.dir} порожня або не містить файлів ${target.ext}`);
      } else {
        files.forEach(appendFileToMd);
      }
    } else {
      console.warn(`[!] Попередження: Папку не знайдено - ${target.dir}`);
    }
  }
});

console.log(`\n✅ Готово! Весь код успішно зібрано у файл: ${outputFile}`);