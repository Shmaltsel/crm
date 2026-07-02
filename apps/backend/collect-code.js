const fs = require('fs');
const path = require('path');

// Шлях до папки з тестами
const targetDir = './src';
const outputFile = './all_tests_bundle.md';

const findTests = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTests(filePath, fileList);
    } else if (file.endsWith('.spec.ts')) {
      fileList.push(filePath);
    }
  });
  return fileList;
};

const testFiles = findTests(targetDir);

// Очищення попереднього файлу
if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

testFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const mdBlock = `### File: ${filePath}\n\n\`\`\`typescript\n${content}\n\`\`\`\n\n---\n\n`;
  fs.appendFileSync(outputFile, mdBlock);
});

console.log(`✅ Зібрано ${testFiles.length} файлів тестів у ${outputFile}`);