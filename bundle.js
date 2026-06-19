const fs = require('fs');
const path = require('path');

const outputFile = 'project_code.txt';

// Додали 'build' для фронтенду
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.prisma'];

// Додали '.json' для package.json та tsconfig.json
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.prisma', '.json'];

// Ігноруємо лок-файли та сам файл результату
const ignoreFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', outputFile];

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
    } else {
      // Перевіряємо розширення І переконуємося, що файлу немає в списку ігнору
      if (extensions.includes(path.extname(file)) && !ignoreFiles.includes(file)) {
        content += `\n\n--- FILE: ${fullPath} ---\n\n`;
        content += fs.readFileSync(fullPath, 'utf8');
      }
    }
  }
  return content;
}

fs.writeFileSync(outputFile, bundle('.'));
console.log(`Проєкт успішно зібрано у файл: ${outputFile}`);