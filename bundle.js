const fs = require('fs');
const path = require('path');

const outputFile = 'project_bundle.md';
const ROOT = process.cwd();

const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.prisma', 'test', 'coverage', '.turbo', '.vercel'];
const ignoreFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', outputFile];
const allowedExts = ['.ts', '.tsx', '.js', '.css', '.prisma'];
const allowedNames = ['tsconfig.json', '.env.example'];

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
        const raw = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
        const lang = ext.slice(1);
        content += `\n### File: ${relPath}\n\`\`\`${lang}\n${addLineNumbers(raw)}\n\`\`\`\n`;
      }
    }
  }
  return content;
}

const header = `# Project Source Code\n\n## Structure\n\`\`\`\n${getTree('.')}\`\`\`\n`;
fs.writeFileSync(outputFile, header + bundle('.'));
console.log(`✅ Зібрано у Markdown з номерами рядків: ${outputFile}`);