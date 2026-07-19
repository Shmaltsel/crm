#!/usr/bin/env node
/**
 * build-index.js — збирає всі TASK-*.md у .agents/queue.md (read-only, для перегляду).
 *
 * Використання: node tools/queue-tools/build-index.js
 * Результат: .agents/queue.md (перезаписується)
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "../..");
const TASKS_DIR = join(ROOT, ".agents", "tasks");
const OUTPUT = join(ROOT, ".agents", "queue.md");

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

function main() {
  const files = readdirSync(TASKS_DIR)
    .filter((f) => f.startsWith("TASK-") && f.endsWith(".md"))
    .sort();

  const tasks = files.map((f) => {
    const raw = readFileSync(join(TASKS_DIR, f), "utf-8");
    const fm = parseFrontmatter(raw);
    return { file: f, ...fm };
  });

  const grouped = { todo: [], in_progress: [], done: [], blocked: [] };
  for (const t of tasks) {
    const s = t.status || "todo";
    if (grouped[s]) grouped[s].push(t);
    else grouped.todo.push(t);
  }

  const lines = ["# Черга задач (auto-generated, не редагувати вручну)\n"];

  for (const [status, label] of [
    ["in_progress", "In Progress"],
    ["blocked", "Blocked"],
    ["todo", "TODO"],
    ["done", "Done"],
  ]) {
    if (grouped[status].length === 0) continue;
    lines.push(`## ${label}`);
    for (const t of grouped[status]) {
      const wave = t.wave !== undefined ? ` [W${t.wave}]` : "";
      const blocked = t.blocked_by?.length ? ` ⛔ blocked by: ${Array.isArray(t.blocked_by) ? t.blocked_by.join(", ") : t.blocked_by}` : "";
      const owner = t.owner ? ` (${t.owner})` : "";
      const checkpoint = t.checkpoint_at ? ` 📍 checkpoint: ${t.checkpoint_at}` : "";
      lines.push(`- **${t.id || t.file}**: ${t.title || "?"}${owner}${wave}${blocked}${checkpoint}`);
    }
    lines.push("");
  }

  writeFileSync(OUTPUT, lines.join("\n"), "utf-8");
  console.log(`✓ Згенеровано ${OUTPUT} (${tasks.length} задач)`);
}

main();
