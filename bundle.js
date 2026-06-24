const fs = require('fs');
const path = require('path');

const outputFile = 'project_code.xml';
const ROOT = process.cwd();

const ignoreDirs  = ['node_modules', '.git', 'dist', 'build', '.next', '.prisma', 'test', 'coverage', '.turbo', '.vercel'];
const ignoreFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', outputFile];
const allowedExts = ['.ts', '.tsx', '.js', '.css', '.prisma'];
const allowedNames = ['tsconfig.json', '.env.example']; // конкретні файли без розширення

function compact(content) {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n') // максимум один порожній рядок (не видаляємо всі)
    .trim();
}

function bundle(dir) {
  let content = '';
  const files = fs.readdirSync(dir).sort();

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath  = path.relative(ROOT, fullPath).replace(/\\/g, '/');
    const stat     = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) content += bundle(fullPath);
    } else {
      const ext = path.extname(file);
      const allowed = allowedExts.includes(ext) || allowedNames.includes(file);
      if (allowed && !ignoreFiles.includes(file)) {
        const raw = fs.readFileSync(fullPath, 'utf8');
        content += `<file path="${relPath}">${compact(raw)}</file>\n`;
      }
    }
  }
  return content;
}

fs.writeFileSync(outputFile, `<project>\n${bundle('.')}\n</project>`);
console.log(`✅ Зібрано: ${outputFile} (${(fs.statSync(outputFile).size / 1024).toFixed(0)} KB)`);