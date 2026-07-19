#!/usr/bin/env node
// auto-dispatch.mjs — Background poller: checks .agents/inbox/pending-goal.md
// every 2 minutes and spawns mimo + opencode agents when a new goal arrives.

import { existsSync, readFileSync, unlinkSync, mkdirSync, appendFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const INBOX_DIR = resolve(ROOT, ".agents", "inbox");
const INBOX_FILE = resolve(INBOX_DIR, "pending-goal.md");
const LOG_FILE = resolve(ROOT, ".agents", "dispatch.log");
const POLL_INTERVAL = 120_000;

const TELEGRAM_NOTIFY = resolve(ROOT, "tools", "queue-tools", "telegram-notify.js");

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try {
    if (!existsSync(dirname(LOG_FILE))) mkdirSync(dirname(LOG_FILE), { recursive: true });
    appendFileSync(LOG_FILE, line + "\n", "utf-8");
  } catch {}
}

function parseGoal(content) {
  const match = content.match(/\*\*goal\*\*:\s*(.+)/);
  return match ? match[1].trim() : null;
}

function notifyTelegram(msg) {
  try {
    if (!existsSync(TELEGRAM_NOTIFY)) return;
    const child = spawn("node", [TELEGRAM_NOTIFY, msg], {
      cwd: ROOT, shell: true, stdio: "ignore", detached: true,
    });
    child.unref();
  } catch {}
}

function dispatch(goal) {
  log(`Dispatching goal: ${goal}`);

  try {
    const mimo = spawn("mimo", ["run", goal], {
      cwd: ROOT, shell: true, stdio: "ignore", detached: true,
    });
    mimo.unref();
    log(`Spawned mimo (pid=${mimo.pid})`);
  } catch (err) {
    log(`Failed to spawn mimo: ${err.message}`);
  }

  try {
    const oc = spawn("opencode", ["run", goal], {
      cwd: ROOT, shell: true, stdio: "ignore", detached: true,
    });
    oc.unref();
    log(`Spawned opencode (pid=${oc.pid})`);
  } catch (err) {
    log(`Failed to spawn opencode: ${err.message}`);
  }

  notifyTelegram(`Агенти запущені автоматично.\nЦіль: ${goal}`);
}

function poll() {
  try {
    if (!existsSync(INBOX_FILE)) return;

    const content = readFileSync(INBOX_FILE, "utf-8");
    const goal = parseGoal(content);
    if (!goal) {
      log("Inbox file exists but no goal found, removing stale file.");
      unlinkSync(INBOX_FILE);
      return;
    }

    unlinkSync(INBOX_FILE);
    dispatch(goal);
  } catch (err) {
    log(`Poll error: ${err.message}`);
  }
}

log("auto-dispatch started. Polling every 2 minutes.");
log(`Watching: ${INBOX_FILE}`);

poll();

const timer = setInterval(poll, POLL_INTERVAL);

function shutdown(sig) {
  log(`Received ${sig}, shutting down.`);
  clearInterval(timer);
  process.exit(0);
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
