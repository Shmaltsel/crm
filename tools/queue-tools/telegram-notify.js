#!/usr/bin/env node
/**
 * telegram-notify.js — надсилає повідомлення в Telegram (standalone, без MCP).
 *
 * Використання:
 *   node tools/queue-tools/telegram-notify.js "Текст"
 *   node tools/queue-tools/telegram-notify.js --file path/to/message.md
 *   node tools/queue-tools/telegram-notify.js --approve "Текст плану"
 *
 * Читає TELEGRAM_BOT_TOKEN та TELEGRAM_CHAT_ID з tools/human-bridge/.env
 */

import { readFileSync, mkdirSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(import.meta.dirname, "../..");
const ENV_PATH = resolve(ROOT, "tools", "human-bridge", ".env");
const INBOX_DIR = resolve(ROOT, ".agents", "inbox");

function loadEnv() {
  const raw = readFileSync(ENV_PATH, "utf-8");
  const vars = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

async function sendMessage(text, buttons) {
  const env = loadEnv();
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("❌ Відсутні TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID в .env");
    process.exit(1);
  }

  const body = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };

  if (buttons && buttons.length > 0) {
    const kb = { inline_keyboard: buttons.map((btn) => [{ text: btn, callback_data: btn }]) };
    body.reply_markup = kb;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error(`❌ Telegram API помилка (${resp.status}): ${err}`);
    process.exit(1);
  }

  const result = await resp.json();
  console.log(`✅ Повідомлення надіслано в Telegram (message_id: ${result.result?.message_id})`);
  return result.result;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Використання: node telegram-notify.js <текст>");
    console.error("             node telegram-notify.js --file <path>");
    console.error("             node telegram-notify.js --approve <текст плану>");
    process.exit(1);
  }

  if (args[0] === "--file" && args[1]) {
    const content = readFileSync(resolve(ROOT, args[1]), "utf-8");
    await sendMessage(content);
  } else if (args[0] === "--approve") {
    const text = args.slice(1).join(" ");
    await sendMessage(text, ["✅ Ок", "✏️ Правки", "❌ Скасувати"]);
  } else {
    await sendMessage(args.join(" "));
  }
}

main();
