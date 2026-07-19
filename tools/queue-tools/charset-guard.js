#!/usr/bin/env node
/**
 * charset-guard.js — перевірка на биту кирилицю та невалідні символи.
 *
 * Використання:
 *   node tools/queue-tools/charset-guard.js                  # git diff --cached, або всі tracked
 *   node tools/queue-tools/charset-guard.js file1.ts ...    # конкретні файли
 *
 * Перевірки:
 *   a) \u04XX-escape у JSX/рядках (виняток: *test* файли)
 *   b) символ U+FFFD (�) будь-де
 *   c) 3+ знаків питання поспіль у рядках ('???', '?????') — слід перекодування
 *   d) BOM (EF BB BF) — warning, не fail
 *
 * Код виходу: 0 = OK, 1 = помилки, 2 = попередження (BOM only)
 */

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { resolve, relative } from "path";

const ROOT = resolve(import.meta.dirname, "../..");

// ── Отримання списку файлів ──

function getFileList() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args.filter((f) => existsSync(f));
  }

  // Спроба git diff --cached
  try {
    const staged = execSync("git diff --cached --name-only --diff-filter=ACM", {
      cwd: ROOT,
      encoding: "utf-8",
      timeout: 5000,
    }).trim();
    if (staged) return staged.split("\n").filter(Boolean);
  } catch {
    // git недоступний
  }

  // Фолбек: всі tracked *.ts/*.tsx у apps/
  try {
    const tracked = execSync(
      'git ls-files "apps/**/*.ts" "apps/**/*.tsx"',
      { cwd: ROOT, encoding: "utf-8", timeout: 10000 }
    ).trim();
    return tracked.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

// ── Перевірки ──

function checkFile(relPath) {
  const absPath = resolve(ROOT, relPath);
  let content;
  try {
    content = readFileSync(absPath, "utf-8");
  } catch {
    return [];
  }

  const lines = content.split("\n");
  const issues = [];
  const isTest = relPath.includes("test") || relPath.includes("spec");
  const isSource =
    relPath.startsWith("apps/frontend/src/") || relPath.startsWith("apps/backend/src/");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // a) \u04XX escape у JSX/рядках (не у тестах)
    if (!isTest && isSource) {
      const escapeMatches = line.matchAll(/\\u04[0-9a-fA-F]{2}/gi);
      for (const m of escapeMatches) {
        // Пропускаємо якщо це в коментарі
        const before = line.slice(0, m.index);
        if (before.trimStart().startsWith("//") || before.trimStart().startsWith("*")) continue;
        issues.push({
          file: relPath,
          line: lineNum,
          type: "unicode-escape",
          text: `\\uXXXX-escape: ${m[0]}`,
          fragment: line.trim().slice(0, 80),
        });
      }
    }

    // b) U+FFFD (�)
    if (line.includes("\uFFFD")) {
      issues.push({
        file: relPath,
        line: lineNum,
        type: "replacement-char",
        text: "Знайдено символ U+FFFD (�)",
        fragment: line.trim().slice(0, 80),
      });
    }

    // c) 3+ знаків питання поспіль у рядках
    if (!isTest) {
      // Шукаємо в рядкових літералах і JSX тексті
      const qMatches = line.matchAll(/['"`]\?{3,}['"`]|>\?{3,}</g);
      for (const m of qMatches) {
        issues.push({
          file: relPath,
          line: lineNum,
          type: "question-marks",
          text: `Послідовність '?' (${m[0].length - 2}+ шт): ${m[0]}`,
          fragment: line.trim().slice(0, 80),
        });
      }
    }
  }

  // d) BOM
  const buf = readFileSync(absPath);
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    issues.push({
      file: relPath,
      line: 0,
      type: "bom",
      text: "Файл містить BOM (EF BB BF) — warning",
      fragment: "",
    });
  }

  return issues;
}

// ── Main ──

function main() {
  const files = getFileList();
  if (files.length === 0) {
    console.log("✓ Немає файлів для перевірки");
    process.exit(0);
  }

  const allIssues = [];
  for (const f of files) {
    const rel = relative(ROOT, resolve(ROOT, f)).replace(/\\/g, "/");
    // Пропускаємо node_modules, dist, .git
    if (rel.includes("node_modules") || rel.includes("dist/") || rel.startsWith(".git/")) continue;
    // Перевіряємо тільки *.ts/*.tsx
    if (!rel.endsWith(".ts") && !rel.endsWith(".tsx")) continue;

    const issues = checkFile(rel);
    allIssues.push(...issues);
  }

  const errors = allIssues.filter((i) => i.type !== "bom");
  const warnings = allIssues.filter((i) => i.type === "bom");

  if (errors.length > 0) {
    console.error("❌ Charset-guard знайшов проблеми:");
    for (const e of errors) {
      const loc = e.line > 0 ? `:${e.line}` : "";
      console.error(`  ${e.file}${loc} [${e.type}] ${e.text}`);
      if (e.fragment) console.error(`    ${e.fragment}`);
    }
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn("⚠️ Charset-guard попередження:");
    for (const w of warnings) {
      console.warn(`  ${w.file} ${w.text}`);
    }
  }

  console.log(`✓ Charset-guard пройдено (${files.length} файлів, 0 помилок${warnings.length ? `, ${warnings.length} попереджень` : ""})`);
  process.exit(0);
}

main();
