const fs = require('fs');
const path = require('path');

// Сюди просто вписуйте шляхи до файлів, які ви хочете зібрати
const filesToCollect = [
  'apps/backend/prisma/schema.prisma',
  'apps/backend/src/projects/dto/create-project.dto.ts',
  'apps/frontend/src/types.ts',
  'apps/backend/src/common/interceptors/sanitize.interceptor.ts',
  'apps/backend/src/schools/dto/find-schools-query.dto.ts',
  'apps/backend/src/schools/dto/find-contacts-query.dto.ts',
  'apps/frontend/src/components/school-profile/modals/EventModal.tsx',
  'apps/frontend/src/pages/Employees.tsx'
];

const outputFile = 'diagnostic_bundle_final.md';

if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

filesToCollect.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const ext = path.extname(filePath).replace('.', '');
    // Визначаємо мову для підсвітки
    const lang = (ext === 'tsx' || ext === 'ts') ? 'typescript' : (ext === 'prisma' ? 'prisma' : 'javascript');
    
    const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
    fs.appendFileSync(outputFile, mdBlock);
    console.log(`[+] Додано: ${filePath}`);
  } else {
    console.warn(`[!] Файл не знайдено, пропускаємо: ${filePath}`);
  }
});

console.log(`\n✅ Готово! Усі файли зібрано у: ${outputFile}`);