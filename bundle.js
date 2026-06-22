const fs = require('fs');
const path = require('path');

const outputFile = 'project_code.xml'; // Змінили на XML формат
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.prisma', 'test', 'coverage'];
const ignoreFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', outputFile];

// Функція для стиснення коду: видаляє зайві пробіли та переноси рядків
function compact(content) {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/\n\s*\n/g, '\n') // видаляє порожні рядки
    .replace(/[ \t]+/g, ' ')  // замінює множинні пробіли одним
    .trim();
}

function bundle(dir) {
  let content = '';
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) content += bundle(fullPath);
    } else {
      if (!ignoreFiles.includes(file) && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css'))) {
        const rawContent = fs.readFileSync(fullPath, 'utf8');
        // Загортаємо кожен файл у тег для кращого контексту ШІ
        content += `<file path="${fullPath}">${compact(rawContent)}</file>\n`;
      }
    }
  }
  return content;
}

fs.writeFileSync(outputFile, `<project>\n${bundle('.')}\n</project>`);
console.log(`Проєкт зібрано у компактний XML: ${outputFile}`);