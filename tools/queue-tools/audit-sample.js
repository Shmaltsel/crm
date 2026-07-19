#!/usr/bin/env node
/**
 * audit-sample.js — випадкова вибірка DONE-задачі для ручного аудиту.
 *
 * Раз на ~10 закритих задач скрипт вибирає одну TASK-<N>.md зі статусом done
 * і виводить її criteria + список файлів, змінених у відповідному коміті.
 *
 * Використання: node tools/queue-tools/audit-sample.js
 */

import { readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { execSync } from "child_process";

const ROOT = resolve(import.meta.dirname, "../..");
const TASKS_DIR = join(ROOT, ".agents", "tasks");

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  const lines = match[1].split("\n");
  let currentKey = null;
  for (const line of lines) {
    const listMatch = line.match(/^  - (.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(listMatch[1].trim());
      continue;
    }
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val === "" || val === "[]") {
      currentKey = key;
      fm[key] = val === "[]" ? [] : [];
      continue;
    }
    let finalVal = val;
    if (val.startsWith("[") && val.endsWith("]")) {
      finalVal = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    fm[key] = finalVal;
    currentKey = key;
  }
  return fm;
}

function main() {
  const files = readdirSync(TASKS_DIR)
    .filter((f) => f.startsWith("TASK-") && f.endsWith(".md"))
    .sort();

  const doneTasks = [];
  for (const f of files) {
    const raw = readFileSync(join(TASKS_DIR, f), "utf-8");
    const fm = parseFrontmatter(raw);
    if (fm && fm.status === "done") {
      doneTasks.push({ file: f, ...fm });
    }
  }

  if (doneTasks.length === 0) {
    console.log("Немає закритих задач для аудиту.");
    return;
  }

  // Випадкова вибірка однієї задачі
  const idx = Math.floor(Math.random() * doneTasks.length);
  const task = doneTasks[idx];

  console.log("═".repeat(60));
  console.log(`🔍 АУДИТ: ${task.id || task.file}`);
  console.log("═".repeat(60));
  console.log(`Назва: ${task.title || "?"}`);
  console.log(`Власник: ${task.owner || "?"}`);
  console.log(`Хвиля: ${task.wave ?? "?"}`);
  console.log();

  // Критерії
  const criteria = Array.isArray(task.criteria) ? task.criteria : [];
  if (criteria.length > 0) {
    console.log("📋 Критерії:");
    for (const c of criteria) {
      console.log(`  ☐ ${c}`);
    }
  } else {
    console.log("📋 Критерії: не вказані");
  }
  console.log();

  // Session notes
  if (task["Session notes"] || task.session_notes) {
    console.log(`📝 Session notes: ${task["Session notes"] || task.session_notes}`);
    console.log();
  }

  // Знаходимо коміт для цієї задачі
  try {
    const commitHash = execSync(
      `git log --all --oneline --grep="${task.id}" -1 --format="%H"`,
      { cwd: ROOT, encoding: "utf-8", timeout: 5000 }
    ).trim();

    if (commitHash) {
      const commitMsg = execSync(
        `git log -1 --format="%s" ${commitHash}`,
        { cwd: ROOT, encoding: "utf-8", timeout: 5000 }
      ).trim();

      const diffStat = execSync(
        `git diff --stat ${commitHash}^..${commitHash} 2>/dev/null || echo "немає попереднього коміту"`,
        { cwd: ROOT, encoding: "utf-8", timeout: 5000 }
      );

      console.log(`📦 Коміт: ${commitHash.slice(0, 8)} — ${commitMsg}`);
      console.log();
      console.log("📂 Змінені файли:");
      console.log(diffStat);
    } else {
      console.log("📦 Коміт не знайдено за id задачі.");
    }
  } catch {
    console.log("📦 Помилка при пошуку коміту.");
  }

  console.log();
  console.log("─".repeat(60));
  console.log("👉 Зверни увагу: чи всі критерії дійсно виконані?");
  console.log("   Чи є файли поза scope? Чи задача не була занадто великою?");
  console.log("─".repeat(60));
}

main();
