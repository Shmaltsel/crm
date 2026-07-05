const fs = require('fs');
const path = require('path');

// Твій список файлів
const filesToCollect = [
  'apps/frontend/src/pages/SchoolProfile.tsx',
  'apps/frontend/src/pages/Cities.tsx',
  'apps/frontend/src/pages/CalendarView.tsx',
  'apps/frontend/src/components/schools/VirtualSchoolList.tsx',
  'apps/frontend/src/components/school-profile/modals/CrewModal.tsx',
  'apps/frontend/src/components/school-profile/modals/EventModal.tsx',
  'apps/frontend/src/components/calendar/DayOffModal.tsx',
  'apps/backend/src/schools/schools.controller.ts',
  'apps/backend/src/events/events.controller.ts',
  'apps/backend/src/events/events.service.ts',
  'apps/backend/src/schools/dto/update-school.dto.ts',
  'apps/frontend/src/hooks/useApi.ts'
];

const outputFile = 'final_diagnostic_bundle.md';

// Очищення старого файлу
if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

// Використовуємо filesToCollect, а не неіснуючий fileList
filesToCollect.forEach(relativePath => {
  try {
    const fullPath = path.resolve(relativePath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`[!] Файл не знайдено: ${relativePath}`);
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const ext = path.extname(fullPath).slice(1);
    const lang = (ext === 'tsx' || ext === 'ts') ? 'typescript' : 'javascript';
    
    const mdBlock = `### \`${relativePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
    fs.appendFileSync(outputFile, mdBlock);
    console.log(`[+] Додано: ${relativePath}`);
  } catch (err) {
    console.error(`[!] Помилка при обробці ${relativePath}:`, err.message);
  }
});

console.log(`\n✅ Готово! Твій бандл лежить у: ${outputFile}`);