const fs = require('fs');
const path = require('path');

const outputFile = 'project_code.txt';
// Список папок, які ігноруємо
const ignoreDirs = ['node_modules', '.git', 'dist', '.next', '.prisma'];
// Розширення файлів, які збираємо
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.prisma'];

function bundle(dir) {
  let content = '';
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        content += bundle(fullPath);
      }
    } else if (extensions.includes(path.extname(file))) {
      content += `\n\n--- FILE: ${fullPath} ---\n\n`;
      content += fs.readFileSync(fullPath, 'utf8');
    }
  }
  return content;
}

fs.writeFileSync(outputFile, bundle('.'));
console.log(`Проєкт успішно зібрано у файл: ${outputFile}`);