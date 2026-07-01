const fs = require('fs');
const path = require('path');

// Назва вихідного файлу
const outputFile = 'combined_debug_and_tests.md';

// Створюємо або очищуємо файл із заголовком
fs.writeFileSync(outputFile, '# Файли для дебагу рендерингу та тестування Guard/Controller\n\n');

// Список точних шляхів до файлів
const exactFiles = [
  'apps/frontend/src/components/school-profile/EventsTable.tsx',
  'apps/frontend/src/tests/component/SchoolCard.test.tsx',
  'apps/frontend/src/hooks/useSchools.ts',
  'apps/frontend/src/tests/unit/hooks/useSchools.test.ts',
  'apps/frontend/src/components/schools/schoolUtils.ts',
  'apps/frontend/src/tests/unit/hooks/useSchoolsFilter.test.ts',
  'apps/backend/src/auth/auth.guard.ts',
  'apps/backend/src/users/users.controller.spec.ts',
  'apps/backend/src/schools/schools.controller.spec.ts',
  'apps/backend/src/auth/auth.controller.spec.ts'
];

// Функція для додавання вмісту файлу в Markdown
function appendFileToMd(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[!] Файл не знайдено: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath).replace('.', '');
  const lang = ['ts', 'tsx'].includes(ext) ? 'typescript' : ext;

  const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
  console.log(`[+] Додано: ${filePath}`);
  return content;
}

// --- Запуск процесу збору ---

console.log('🚀 Початок збору файлів для аналізу...\n');

exactFiles.forEach(file => {
  const content = appendFileToMd(file);

  // Динамічний пошук імпортованого компонента всередині SchoolCard.test.tsx
  if (file === 'apps/frontend/src/tests/component/SchoolCard.test.tsx' && content) {
    console.log('🔍 Аналіз імпортів у SchoolCard.test.tsx для пошуку цільового компонента...');
    
    const testFileDir = path.dirname(file); // apps/frontend/src/tests/component
    // Регулярний вираз для пошуку відносних імпортів компонентів
    const importRegex = /import\s+.*\s+from\s+['"](\..+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const relativeImportPath = match[1];
      
      // Фільтруємо, щоб знайти саме компонент (зазвичай лежить вище в структурі або містить School)
      if (relativeImportPath.includes('school') || relativeImportPath.includes('components')) {
        let absolutePath = path.resolve(testFileDir, relativeImportPath);
        let finalPath = null;

        // Перевіряємо можливі розширення файлу
        if (fs.existsSync(absolutePath + '.tsx')) finalPath = absolutePath + '.tsx';
        else if (fs.existsSync(absolutePath + '.ts')) finalPath = absolutePath + '.ts';
        else if (fs.existsSync(absolutePath)) {
          const stat = fs.statSync(absolutePath);
          if (stat.isFile()) finalPath = absolutePath;
        }

        if (finalPath) {
          // Переводяться шляхи назад у відносні від кореня проєкту для красивого відображення
          const projectRelativePath = path.relative(process.cwd(), finalPath).replace(/\\/g, '/');
          console.log(`🎯 Знайдено імпортований компонент: ${projectRelativePath}`);
          appendFileToMd(projectRelativePath);
        }
      }
    }
  }
});

console.log(`\n✅ Готово! Весь знайдений код збережено у: ${outputFile}`);