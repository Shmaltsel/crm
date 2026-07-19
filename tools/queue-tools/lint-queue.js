#!/usr/bin/env node
/**
 * lint-queue.js — перевіряє чергу задач на коректність.
 *
 * Перевірки:
 * 1. Наявність поля criteria у кожній задачі
 * 2. Відсутність посилань на неіснуючі id у blocked_by
 * 3. Відсутність циклів у blocked_by (топологічне сортування)
 * 4. Коректність значень owner та status
 *
 * Використання: node tools/queue-tools/lint-queue.js
 * Код виходу: 0 = OK, 1 = помилки знайдені
 */

import { readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { execSync } from "child_process";

const ROOT = resolve(import.meta.dirname, "../..");
const TASKS_DIR = join(ROOT, ".agents", "tasks");

const VALID_OWNERS = ["mimo", "opencode"];
const VALID_STATUSES = ["todo", "in_progress", "done"];

/** Пороги для size guardrail */
const SIZE_LINES_THRESHOLD = 400;
const SIZE_FILES_THRESHOLD = 6;

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
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    fm[key] = val;
    currentKey = key;
  }
  return fm;
}

function detectCycles(tasks) {
  const graph = new Map();
  for (const t of tasks) {
    const deps = Array.isArray(t.blocked_by)
      ? t.blocked_by
      : t.blocked_by
        ? [t.blocked_by]
        : [];
    graph.set(t.id, deps);
  }

  const visited = new Set();
  const inStack = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (inStack.has(node)) {
      const cycleStart = path.indexOf(node);
      cycles.push(path.slice(cycleStart).concat(node));
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    inStack.add(node);
    path.push(node);
    for (const dep of graph.get(node) || []) {
      dfs(dep, path);
    }
    path.pop();
    inStack.delete(node);
  }

  for (const id of graph.keys()) {
    dfs(id, []);
  }
  return cycles;
}

function main() {
  const errors = [];

  const files = readdirSync(TASKS_DIR)
    .filter((f) => f.startsWith("TASK-") && f.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    console.log("✓ Черга порожня, лайнтинг пройдено");
    process.exit(0);
  }

  const tasks = [];
  const allIds = new Set();

  for (const f of files) {
    const raw = readFileSync(join(TASKS_DIR, f), "utf-8");
    const fm = parseFrontmatter(raw);
    if (!fm) {
      errors.push(`${f}: відсутній frontmatter`);
      continue;
    }
    if (!fm.id) {
      errors.push(`${f}: відсутнє поле id`);
      continue;
    }
    allIds.add(fm.id);
    tasks.push({ file: f, ...fm });
  }

  for (const t of tasks) {
    if (!t.criteria || (Array.isArray(t.criteria) && t.criteria.length === 0)) {
      errors.push(`${t.file} (${t.id}): відсутнє або порожнє поле criteria`);
    }
    if (t.owner && !VALID_OWNERS.includes(t.owner)) {
      errors.push(`${t.file} (${t.id}): невідомий owner "${t.owner}" (дозволені: ${VALID_OWNERS.join(", ")})`);
    }
    if (t.status && !VALID_STATUSES.includes(t.status)) {
      errors.push(`${t.file} (${t.id}): невідомий status "${t.status}" (дозволені: ${VALID_STATUSES.join(", ")})`);
    }

    const deps = Array.isArray(t.blocked_by)
      ? t.blocked_by
      : t.blocked_by
        ? [t.blocked_by]
        : [];
    for (const dep of deps) {
      if (!allIds.has(dep)) {
        errors.push(`${t.file} (${t.id}): blocked_by містить неіснуючий id "${dep}"`);
      }
    }
  }

  const cycles = detectCycles(tasks);
  for (const cycle of cycles) {
    errors.push(`Цикл blocked_by: ${cycle.join(" → ")}`);
  }

  // ── Size guardrail (WARNING, не помилка) ──
  const warnings = [];
  for (const t of tasks) {
    if (t.status !== "done") continue;
    // Перевірка через git diff для закритих задач
    try {
      // Знаходимо коміт для цієї задачі
      const commitMsg = execSync(
        `git log --all --oneline --grep="${t.id}" -1 --format="%H"`,
        { cwd: ROOT, encoding: "utf-8", timeout: 5000 }
      ).trim();
      if (!commitMsg) continue;

      const diffStat = execSync(
        `git diff --stat ${commitMsg}^..${commitMsg} 2>/dev/null || echo ""`,
        { cwd: ROOT, encoding: "utf-8", timeout: 5000 }
      );

      // Підрахунок змінених рядків
      const totalMatch = diffStat.match(/(\d+) files? changed/);
      const filesChanged = totalMatch ? parseInt(totalMatch[1], 10) : 0;

      // Підрахунок рядків з change summary
      const lineMatches = [...diffStat.matchAll(/\+(\d+)\s/g)];
      const totalAdded = lineMatches.reduce((sum, m) => sum + parseInt(m[1], 10), 0);

      if (totalAdded > SIZE_LINES_THRESHOLD || filesChanged > SIZE_FILES_THRESHOLD) {
        warnings.push(
          `${t.file} (${t.id}): ${totalAdded}+/${filesChanged} файлів — задача можливо мала бути розбита на кілька`
        );
      }
    } catch {
      // git не доступний або коміт не знайдено — пропускаємо
    }
  }

  if (errors.length > 0) {
    console.error("❌ Лайнтинг черги знайшов помилки:");
    for (const e of errors) {
      console.error(`  • ${e}`);
    }
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn("⚠️ Попередження (size guardrail):");
    for (const w of warnings) {
      console.warn(`  • ${w}`);
    }
  }

  console.log(`✓ Лайнтинг черги пройдено (${tasks.length} задач, 0 помилок${warnings.length ? `, ${warnings.length} попереджень` : ""})`);
  process.exit(0);
}

main();
