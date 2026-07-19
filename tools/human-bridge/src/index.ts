import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";

config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "..", ".env") });
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Bot, InlineKeyboard } from "grammy";
import { z } from "zod";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const AGENTS_DIR = resolve(ROOT, ".agents");
const MAILBOX_DIR = resolve(AGENTS_DIR, "mailbox");
const QUEUE_DIR = resolve(AGENTS_DIR, "tasks");

if (!existsSync(MAILBOX_DIR)) mkdirSync(MAILBOX_DIR, { recursive: true });
if (!existsSync(QUEUE_DIR)) mkdirSync(QUEUE_DIR, { recursive: true });

// ── State ──────────────────────────────────────────────────────────

const pending = new Map<string, (answer: string) => void>();
let reqCounter = 0;

/** Очікування /plan-повідомлення (wait_for_goal) */
let goalWaiters: Array<(goal: string) => void> = [];

/** Лічильник ask_agent на фічу: { featureSlug: count } */
const askAgentCounts = new Map<string, number>();

/** Парсинг YAML frontmatter з підтримкою multiline списків */
function parseFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm: Record<string, unknown> = {};
  const lines = match[1].split("\n");
  let currentKey: string | null = null;
  for (const line of lines) {
    const listMatch = line.match(/^  - (.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      (fm[currentKey] as string[]).push(listMatch[1].trim());
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
    let finalVal: string | string[] = val;
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

/** Активна черга: true якщо є хоча б одна задача зі status != done */
function hasActiveQueue(): boolean {
  if (!existsSync(QUEUE_DIR)) return false;
  const files = readdirSync(QUEUE_DIR).filter(
    (f) => f.startsWith("TASK-") && f.endsWith(".md")
  );
  for (const f of files) {
    const raw = readFileSync(resolve(QUEUE_DIR, f), "utf-8");
    const fm = parseFrontmatter(raw);
    if (fm && fm.status && fm.status !== "done") return true;
  }
  return false;
}

// ── Telegram event handlers ────────────────────────────────────────

bot.on("callback_query:data", async (ctx) => {
  const [reqId, answer] = ctx.callbackQuery.data.split("::");
  pending.get(reqId)?.(answer);
  pending.delete(reqId);
  await ctx.answerCallbackQuery();
  await ctx.editMessageReplyMarkup(undefined);
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  // /plan <текст> — нова ціль для планування
  if (text.startsWith("/plan ")) {
    const goal = text.slice(6).trim();
    if (!goal) {
      await ctx.reply("⚠️ Порожній план. Напиши /plan <текст цілі>");
      return;
    }

    // Якщо є активна черга — попередити і запитати підтвердження
    if (hasActiveQueue()) {
      const reqId = `plan-confirm:${reqCounter++}`;
      const answer = await new Promise<string>((resolve) => {
        pending.set(reqId, resolve);
        const kb = new InlineKeyboard()
          .text("Перезапустити", `${reqId}::restart`)
          .text("Додати до існуючого", `${reqId}::append`)
          .text("Скасувати", `${reqId}::cancel`);
        bot.api.sendMessage(
          CHAT_ID,
          `⚠️ Є активна черга задач.\n\nНова ціль: ${goal}\n\nЩо зробити?`,
          { reply_markup: kb }
        );
      });

      if (answer === "cancel") {
        await bot.api.sendMessage(CHAT_ID, "Скасовано.");
        return;
      }
      if (answer === "restart") {
        await bot.api.sendMessage(
          CHAT_ID,
          "♻️ Перезапуск: поточна черга буде очищена. Чекаю на планування..."
        );
        // Сповістити всіх goal-waiter'ів
        for (const w of goalWaiters) w(goal);
        goalWaiters = [];
        return;
      }
      // append — передаємо як звичайний план
    }

    // Сповістити всіх goal-waiter'ів
    for (const w of goalWaiters) w(goal);
    goalWaiters = [];
    await bot.api.sendMessage(CHAT_ID, `✅ Ціль прийнята: ${goal}`);
    return;
  }

  // Звичайний текст — відповідь на ask_human
  const entry = [...pending.entries()].find(([id]) => id.startsWith("text:"));
  if (entry) {
    const [reqId, resolve] = entry;
    resolve(ctx.message.text);
    pending.delete(reqId);
  }
});

bot.start();

// ── MCP Server ─────────────────────────────────────────────────────

const server = new McpServer({ name: "human-bridge", version: "2.0.0" });

// ── ask_human ──────────────────────────────────────────────────────

server.tool(
  "ask_human",
  "Постав питання людині в Telegram. З варіантами — кнопки, без — чекає текст.",
  { question: z.string(), options: z.array(z.string()).optional() },
  async ({ question, options }) => {
    const reqId = (options ? "opt:" : "text:") + reqCounter++;
    const answer = await new Promise<string>((resolve) => {
      pending.set(reqId, resolve);
      if (options?.length) {
        const kb = new InlineKeyboard();
        options.forEach((o) => kb.text(o, `${reqId}::${o}`).row());
        bot.api.sendMessage(CHAT_ID, `❓ ${question}`, { reply_markup: kb });
      } else {
        bot.api.sendMessage(CHAT_ID, `❓ ${question}\n\n(відповідай текстом у чат)`);
      }
    });
    return { content: [{ type: "text", text: answer }] };
  }
);

// ── notify ─────────────────────────────────────────────────────────

server.tool(
  "notify",
  "Надіслати повідомлення в Telegram без очікування відповіді.",
  { message: z.string() },
  async ({ message }) => {
    await bot.api.sendMessage(CHAT_ID, message);
    return { content: [{ type: "text", text: "sent" }] };
  }
);

// ── wait_for_goal ──────────────────────────────────────────────────

server.tool(
  "wait_for_goal",
  "Блокуючий виклик: чекає на /plan-повідомлення від людини. Повертає текст цілі.",
  {},
  async () => {
    const goal = await new Promise<string>((resolve) => {
      goalWaiters.push(resolve);
    });
    return { content: [{ type: "text", text: goal }] };
  }
);

// ── ask_agent ──────────────────────────────────────────────────────

server.tool(
  "ask_agent",
  "Консультація з іншим агентом через mailbox. Пише в файл-мейлбокс і чекає відповіді (таймаут 10 хв).",
  {
    target: z.enum(["mimo", "opencode"]),
    question: z.string(),
    proposal: z.string().optional(),
    feature: z.string().optional(),
  },
  async ({ target, question, proposal, feature }) => {
    const mailboxPath = resolve(MAILBOX_DIR, `${target}.md`);
    const entryId = `msg-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // ── Frequency monitoring ──
    const featureSlug = feature || "unknown";
    const currentCount = (askAgentCounts.get(featureSlug) || 0) + 1;
    askAgentCounts.set(featureSlug, currentCount);

    let warningSuffix = "";
    if (currentCount > 2) {
      warningSuffix = `\n\n⚠️ Часті ask_agent на цій фічі (${currentCount} викликів) — можливо контракт Wave 0 недостатньо чіткий`;
    }

    // Записати запит в mailbox
    const requestBlock = [
      `## Request ${entryId}`,
      `- **from**: ${target === "mimo" ? "opencode" : "mimo"}`,
      `- **to**: ${target}`,
      `- **time**: ${timestamp}`,
      `- **status**: pending`,
      ``,
      `### Question`,
      question,
      ``,
      proposal ? `### Proposal\n${proposal}\n` : "",
      `### Response`,
      `_очікується..._`,
      ``,
      `---`,
      ``,
    ].join("\n");

    if (existsSync(mailboxPath)) {
      const existing = readFileSync(mailboxPath, "utf-8");
      writeFileSync(mailboxPath, existing + requestBlock, "utf-8");
    } else {
      writeFileSync(mailboxPath, `# Mailbox для ${target}\n\n` + requestBlock, "utf-8");
    }

    // Сповістити людину
    await bot.api.sendMessage(
      CHAT_ID,
      `📬 Запит до ${target}: ${question}${warningSuffix}`
    );

    // Чекати відповіді (таймаут 10 хв)
    const TIMEOUT_MS = 10 * 60 * 1000;
    const start = Date.now();
    let response = null;

    while (Date.now() - start < TIMEOUT_MS) {
      await new Promise((r) => setTimeout(r, 3000)); // перевірка кожні 3с
      if (existsSync(mailboxPath)) {
        const content = readFileSync(mailboxPath, "utf-8");
        // Шукаємо відповідь після нашого запиту
        const marker = `## Response ${entryId}`;
        // Шукаємо наступний блок після Response який НЕ є _очікується...
        const respRegex = new RegExp(
          `### Response\\n(?!_очікується)([\\s\\S]*?)(?=\\n---|$)`
        );
        const allAfterResponse = content.split(`### Response`).slice(1);
        for (const block of allAfterResponse) {
          const clean = block.split("\n---")[0].trim();
          if (clean && !clean.includes("_очікується")) {
            response = clean;
            break;
          }
        }
        if (response) break;
      }
    }

    if (!response) {
      // Ескалація в ask_human
      await bot.api.sendMessage(
        CHAT_ID,
        `⚠️ ${target} не відповів за 10 хв. Ескалація: ${question}`
      );
      const reqId = `escalation:${reqCounter++}`;
      response = await new Promise<string>((resolve) => {
        pending.set(reqId, resolve);
        bot.api.sendMessage(
          CHAT_ID,
          `❓ [Ескалація] ${question}\n\n(відповідай текстом)`,
        );
      });
    }

    return { content: [{ type: "text", text: response || "немає відповіді" }] };
  }
);

// ── assign_task (batch) ────────────────────────────────────────────

server.tool(
  "assign_task",
  "Надіслати задачу(і) в Telegram та запустити OpenCode. Приймає один task_id або масив task_id.",
  {
    tasks: z.array(z.string()).optional(),
    task: z.string().optional(),
    prompt: z.string(),
    description: z.string().optional(),
  },
  async ({ tasks, task, prompt, description }) => {
    const taskIds = tasks || (task ? [task] : [`task-${Date.now()}`]);

    const telegramMsg = [
      `🚀 **Задачі призначені**`,
      ``,
      `ID: ${taskIds.join(", ")}`,
      description ? `\nОпис: ${description}` : "",
      `\nПромпт:\n${prompt}`,
    ].join("\n");

    await bot.api.sendMessage(CHAT_ID, telegramMsg);

    const results: Array<{ taskId: string; status: string; pid: number }> = [];

    for (const taskId of taskIds) {
      const child = spawn("opencode", ["run", prompt], {
        cwd: process.cwd(),
        shell: true,
        detached: true,
      });
      child.unref();
      results.push({ taskId, status: "spawned", pid: child.pid! });
    }

    return {
      content: [{ type: "text", text: JSON.stringify(results) }],
    };
  }
);

// ── Start ──────────────────────────────────────────────────────────

await server.connect(new StdioServerTransport());
