const fs = require('fs');
const path = require('path');

const outputFile = 'project_bundle.md';
const ROOT = process.cwd();

const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.prisma', 'tests', 'e2e', 'coverage', '.turbo', '.vercel', 'test-results', '.lighthouseci'];
const ignoreFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', outputFile, 'bundle.js', 'project_code.txt', 'project_code.xml'];
const allowedExts = ['.ts', '.tsx', '.js', '.css', '.prisma'];
const allowedNames = ['tsconfig.json', '.env.example', 'package.json', 'vercel.json'];

// Функція для побудови дерева папок
function getTree(dir, prefix = '') {
  let tree = '';
  const files = fs.readdirSync(dir).sort();
  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (ignoreDirs.includes(file) || ignoreFiles.includes(file)) return;

    tree += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;
    if (stat.isDirectory()) {
      tree += getTree(fullPath, prefix + (isLast ? '    ' : '│   '));
    }
  });
  return tree;
}

// Функція для додавання номерів рядків (починаючи з 0)
function addLineNumbers(content) {
  return content
    .split('\n')
    .map((line, i) => `${i.toString().padStart(3, ' ')} | ${line}`)
    .join('\n');
}

function bundle(dir) {
  let content = '';
  const files = fs.readdirSync(dir).sort();

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) content += bundle(fullPath);
    } else {
      const ext = path.extname(file);
      const allowed = allowedExts.includes(ext) || allowedNames.includes(file);
      if (allowed && !ignoreFiles.includes(file)) {
        try {
          const raw = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
          const lang = ext.slice(1) || 'text';
          content += `\n### File: ${relPath}\n\`\`\`${lang}\n${addLineNumbers(raw)}\n\`\`\`\n`;
        } catch (e) {
          content += `\n### File: ${relPath}\n_(не вдалося прочитати: ${e.message})_\n`;
        }
      }
    }
  }
  return content;
}

const header = `# Project Source Code\n\n## Structure\n\`\`\`\n${getTree('.')}\`\`\`\n`;
const full = header + bundle('.');
fs.writeFileSync(outputFile, full);
const sizeKb = (Buffer.byteLength(full, 'utf8') / 1024).toFixed(1);
const approxTokens = Math.round(full.length / 4);
console.log(`✅ Зібрано: ${outputFile} (${sizeKb} KB, ~${approxTokens} токенів)`);