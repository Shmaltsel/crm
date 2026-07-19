import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from "fs";

config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "..", ".env") });
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { Bot, InlineKeyboard } from "grammy";
import { z } from "zod";
import { createServer } from "http";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const AGENTS_DIR = resolve(ROOT, ".agents");
const MAILBOX_DIR = resolve(AGENTS_DIR, "mailbox");
const QUEUE_DIR = resolve(AGENTS_DIR, "tasks");
const INBOX_DIR = resolve(AGENTS_DIR, "inbox");

if (!existsSync(MAILBOX_DIR)) mkdirSync(MAILBOX_DIR, { recursive: true });
if (!existsSync(QUEUE_DIR)) mkdirSync(QUEUE_DIR, { recursive: true });
if (!existsSync(INBOX_DIR)) mkdirSync(INBOX_DIR, { recursive: true });

// ── File Lock ─────────────────────────────────────────────────────

const LOCK_TIMEOUT_MS = 15_000;

async function acquireLock(filePath: string): Promise<string> {
  const lockPath = `${filePath}.lock`;
  const lockId = `lock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const start = Date.now();

  while (Date.now() - start < LOCK_TIMEOUT_MS) {
    if (!existsSync(lockPath)) {
      writeFileSync(lockPath, lockId, "utf-8");
      // Verify we won the race
      const current = readFileSync(lockPath, "utf-8");
      if (current === lockId) return lockId;
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  // Force break stale lock
  if (existsSync(lockPath)) {
    const age = Date.now() - parseInt(readFileSync(lockPath, "utf-8").split("-")[1] || "0", 10);
    if (age > LOCK_TIMEOUT_MS) {
      unlinkSync(lockPath);
      return acquireLock(filePath);
    }
  }
  return lockId; // proceed anyway after timeout
}

function releaseLock(filePath: string, lockId: string): void {
  const lockPath = `${filePath}.lock`;
  if (existsSync(lockPath)) {
    try {
      const current = readFileSync(lockPath, "utf-8");
      if (current === lockId) unlinkSync(lockPath);
    } catch {
      // lock file gone or stale — ignore
    }
  }
}

async function withFileLock<T>(filePath: string, fn: () => T | Promise<T>): Promise<T> {
  const lockId = await acquireLock(filePath);
  try {
    return await fn();
  } finally {
    releaseLock(filePath, lockId);
  }
}

// ── Helpers ────────────────────────────────────────────────────────

/** Наступний вільний TASK id */
function nextTaskId(): string {
  const existing = readdirSync(QUEUE_DIR)
    .filter((f) => f.startsWith("TASK-") && f.endsWith(".md"))
    .map((f) => {
      const m = f.match(/TASK-(\d+)/);
      return m ? parseInt(m[1], 10) : 0;
    });
  const max = existing.length > 0 ? Math.max(...existing) : 0;
  return `TASK-${max + 1}`;
}

/** Записати TASK файл */
function writeTaskFile(
  id: string,
  title: string,
  body: string,
  owner: string,
  opts?: { wave?: number; blockedBy?: string[]; criteria?: string[]; checkpointAt?: string }
) {
  const fm = [
    `---`,
    `id: ${id}`,
    `title: "${title.replace(/"/g, '\\"')}"`,
    `owner: ${owner}`,
    `status: todo`,
    `wave: ${opts?.wave ?? 1}`,
    `blocked_by: ${opts?.blockedBy?.length ? `[${opts.blockedBy.join(", ")}]` : "[]"}`,
    `criteria:`,
    ...(opts?.criteria?.map((c) => `  - ${c}`) ?? ["  - виконано згідно опису"]),
    opts?.checkpointAt ? `checkpoint_at: "${opts.checkpointAt}"` : `contract_ref: ""`,
    `---`,
    ``,
    `# ${id}: ${title}`,
    ``,
    body,
    ``,
    `## Session notes`,
    `_(порожньо)_`,
  ].join("\n");

  writeFileSync(resolve(QUEUE_DIR, `${id}.md`), fm, "utf-8");
}

/** Прочитати стан черги */
function readQueueSummary(): string {
  if (!existsSync(QUEUE_DIR)) return "Черга порожня.";
  const files = readdirSync(QUEUE_DIR)
    .filter((f) => f.startsWith("TASK-") && f.endsWith(".md"))
    .sort();

  if (files.length === 0) return "Черга порожня.";

  const grouped: Record<string, string[]> = { todo: [], in_progress: [], done: [] };
  for (const f of files) {
    const raw = readFileSync(resolve(QUEUE_DIR, f), "utf-8");
    const fm = parseFrontmatter(raw);
    const status = (fm?.status as string) || "todo";
    const id = (fm?.id as string) || f;
    const title = (fm?.title as string) || "?";
    const owner = fm?.owner ? ` (${fm.owner})` : "";
    if (grouped[status]) grouped[status].push(`${id}: ${title}${owner}`);
  }

  const lines: string[] = [];
  if (grouped.in_progress.length)
    lines.push(`🔄 В роботі (${grouped.in_progress.length}):\n${grouped.in_progress.map((s) => `  • ${s}`).join("\n")}`);
  if (grouped.todo.length)
    lines.push(`📋 Черга (${grouped.todo.length}):\n${grouped.todo.map((s) => `  • ${s}`).join("\n")}`);
  if (grouped.done.length)
    lines.push(`✅ Готово (${grouped.done.length})`);
  return lines.join("\n\n");
}

// ── State ──────────────────────────────────────────────────────────

const pending = new Map<string, (answer: string) => void>();
let reqCounter = 0;

/** Очікування /plan-повідомлення (wait_for_goal) */
let goalWaiters: Array<(goal: string) => void> = [];

/** Лічильник ask_agent на фічу: { featureSlug: count } */
const askAgentCounts = new Map<string, number>();

/** Максимум ask_agent на одну фічу перед ескалацією в ask_human */
const MAX_AGENT_ITERATIONS = 3;

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
  const data = ctx.callbackQuery.data;

  // Спочатку перевіряємо чи це відповідь на ask_human (формат reqId::answer)
  const [reqId, answer] = data.split("::");
  if (pending.has(reqId)) {
    pending.get(reqId)!(answer);
    pending.delete(reqId);
    await ctx.answerCallbackQuery();
    await ctx.editMessageReplyMarkup(undefined);
    return;
  }

  // Обробка кнопок плану: Ок / Правки / Скасувати
  const APPROVAL_BUTTONS = ["✅ Ок", "✏️ Правки", "❌ Скасувати"];
  if (APPROVAL_BUTTONS.includes(data)) {
    const approvalPath = resolve(INBOX_DIR, "plan-approval.md");
    writeFileSync(approvalPath, `# Plan Approval\n\n- **time**: ${new Date().toISOString()}\n- **decision**: ${data}\n`, "utf-8");
    await ctx.answerCallbackQuery(`Записано: ${data}`);
    await ctx.editMessageReplyMarkup(undefined);
    return;
  }

  await ctx.answerCallbackQuery();
  await ctx.editMessageReplyMarkup(undefined);
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  // ── /task <текст> — створити задачу в черзі ──
  if (text.startsWith("/task ")) {
    const body = text.slice(6).trim();
    if (!body) {
      await ctx.reply("⚠️ Порожня задача. Напиши /task <опис задачі>");
      return;
    }

    // Визначаємо owner: якщо є слово "frontend" або "UI" → opencode, інакше mimo
    const lowerBody = body.toLowerCase();
    const isFrontend = /\b(frontend|ui|react|компонент|сторінка|вкладка|мобільн|дизайн)\b/.test(lowerBody);
    const owner = isFrontend ? "opencode" : "mimo";

    const id = nextTaskId();
    const title = body.length > 80 ? body.slice(0, 77) + "..." : body;
    writeTaskFile(id, title, body, owner);

    await ctx.reply(
      `✅ Задачу створено:\n• ID: ${id}\n• Власник: ${owner}\n• Назва: ${title}`
    );
    return;
  }

  // ── /tasks — показати чергу ──
  if (text === "/tasks" || text === "/status") {
    const summary = readQueueSummary();
    await ctx.reply(summary);
    return;
  }

  // ── /plan <текст> — нова ціль для планування ──
  if (text.startsWith("/plan ")) {
    const goal = text.slice(6).trim();
    if (!goal) {
      await ctx.reply("⚠️ Порожній план. Напиши /plan <текст цілі>");
      return;
    }

    // Зберігаємо в persistent inbox
    const inboxPath = resolve(INBOX_DIR, "pending-goal.md");
    writeFileSync(inboxPath, `# Pending Goal\n\n- **time**: ${new Date().toISOString()}\n- **goal**: ${goal}\n`, "utf-8");

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
        // Видаляємо inbox
        if (existsSync(inboxPath)) {
          unlinkSync(inboxPath);
        }
        await bot.api.sendMessage(CHAT_ID, "Скасовано.");
        return;
      }
      if (answer === "restart") {
        await bot.api.sendMessage(
          CHAT_ID,
          "♻️ Перезапуск: поточна черга буде очищена. Чекаю на планування..."
        );
        for (const w of goalWaiters) w(goal);
        goalWaiters = [];
        return;
      }
      // append — передаємо як звичайний план
    }

    // Сповістити всіх goal-waiter'ів
    for (const w of goalWaiters) w(goal);
    goalWaiters = [];
    await bot.api.sendMessage(CHAT_ID, `✅ Ціль прийнята: ${goal}\nЗбережено в inbox. Агент створить задачі при наступному старті.`);
    return;
  }

  // ── /inbox — показати pending goal ──
  if (text === "/inbox") {
    const inboxPath = resolve(INBOX_DIR, "pending-goal.md");
    if (existsSync(inboxPath)) {
      const content = readFileSync(inboxPath, "utf-8");
      await ctx.reply(`📥 Є невиконаний план:\n\n${content}`);
    } else {
      await ctx.reply("📭 Inbox порожній.");
    }
    return;
  }

  // ── /approve — затвердити поточний план ──
  if (text === "/approve" || text === "/ok") {
    const approvalPath = resolve(INBOX_DIR, "plan-approval.md");
    writeFileSync(approvalPath, `# Plan Approval\n\n- **time**: ${new Date().toISOString()}\n- **decision**: approved\n`, "utf-8");
    await ctx.reply("✅ План затверджено.");
    return;
  }

  // ── /reject — відхилити поточний план ──
  if (text === "/reject" || text === "/cancel") {
    const approvalPath = resolve(INBOX_DIR, "plan-approval.md");
    writeFileSync(approvalPath, `# Plan Approval\n\n- **time**: ${new Date().toISOString()}\n- **decision**: rejected\n`, "utf-8");
    await ctx.reply("❌ План відхилено.");
    return;
  }

  // ── /revision — попросити правки ──
  if (text.startsWith("/revision ")) {
    const reason = text.slice(10).trim();
    const approvalPath = resolve(INBOX_DIR, "plan-approval.md");
    writeFileSync(approvalPath, `# Plan Approval\n\n- **time**: ${new Date().toISOString()}\n- **decision**: revision\n- **reason**: ${reason || "без пояснення"}\n`, "utf-8");
    await ctx.reply(`✏️ Запитано правки: ${reason || "без пояснення"}`);
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
  "Блокуючий виклик: спочатку перевіряє inbox (/plan), якщо порожньо — чекає на нове /plan-повідомлення.",
  {},
  async () => {
    // Спочатку перевіряємо persistent inbox
    const inboxPath = resolve(INBOX_DIR, "pending-goal.md");
    if (existsSync(inboxPath)) {
      const content = readFileSync(inboxPath, "utf-8");
      const goalMatch = content.match(/\*\*goal\*\*:\s*(.+)/);
      if (goalMatch) {
        const goal = goalMatch[1].trim();
        unlinkSync(inboxPath);
        return { content: [{ type: "text", text: goal }] };
      }
    }

    // Inbox порожній — чекаємо на /plan
    const goal = await new Promise<string>((resolve) => {
      goalWaiters.push(resolve);
    });
    return { content: [{ type: "text", text: goal }] };
  }
);

// ── check_inbox ────────────────────────────────────────────────────

server.tool(
  "check_inbox",
  "Перевірити чи є невиконана ціль з /plan в inbox. Повертає goal або порожній рядок.",
  {},
  async () => {
    const inboxPath = resolve(INBOX_DIR, "pending-goal.md");
    if (existsSync(inboxPath)) {
      const content = readFileSync(inboxPath, "utf-8");
      const goalMatch = content.match(/\*\*goal\*\*:\s*(.+)/);
      if (goalMatch) {
        const goal = goalMatch[1].trim();
        unlinkSync(inboxPath);
        return { content: [{ type: "text", text: goal }] };
      }
    }
    return { content: [{ type: "text", text: "" }] };
  }
);

// ── check_plan_approval ────────────────────────────────────────────

server.tool(
  "check_plan_approval",
  "Перевірити чи людина затвердила план. Повертає 'approved'/'rejected'/'pending'.",
  {},
  async () => {
    const approvalPath = resolve(INBOX_DIR, "plan-approval.md");
    if (existsSync(approvalPath)) {
      const content = readFileSync(approvalPath, "utf-8");
      const decisionMatch = content.match(/\*\*decision\*\*:\s*(.+)/);
      if (decisionMatch) {
        const decision = decisionMatch[1].trim();
        unlinkSync(approvalPath);
        if (decision === "✅ Ок") return { content: [{ type: "text", text: "approved" }] };
        if (decision === "❌ Скасувати") return { content: [{ type: "text", text: "rejected" }] };
        if (decision === "✏️ Правки") return { content: [{ type: "text", text: "revision" }] };
      }
    }
    return { content: [{ type: "text", text: "pending" }] };
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
    const responseMarker = `## Response ${entryId}`;
    const requestBlock = `## Request ${entryId}`;
    const timestamp = new Date().toISOString();

    // ── Frequency monitoring ──
    const featureSlug = feature || "unknown";
    const currentCount = (askAgentCounts.get(featureSlug) || 0) + 1;
    askAgentCounts.set(featureSlug, currentCount);

    let warningSuffix = "";
    if (currentCount > MAX_AGENT_ITERATIONS) {
      // Circuit breaker: ескалація в ask_human замість чергового mailbox
      await bot.api.sendMessage(
        CHAT_ID,
        `🔴 Circuit breaker: ${currentCount} ask_agent на фічі "${featureSlug}" — перевищено ліміт ${MAX_AGENT_ITERATIONS}. Ескалація в людину.`
      );
      const reqId = `circuit:${reqCounter++}`;
      const answer = await new Promise<string>((resolve) => {
        pending.set(reqId, resolve);
        bot.api.sendMessage(
          CHAT_ID,
          `❓ [Circuit Breaker] ${question}\n\n(відповідай текстом)`,
        );
      });
      return { content: [{ type: "text", text: answer }] };
    }
    if (currentCount > 2) {
      warningSuffix = `\n\n⚠️ Часті ask_agent на цій фічі (${currentCount} викликів) — можливо контракт Wave 0 недостатньо чіткий`;
    }

    // Записати запит в mailbox з файловим локом
    const block = [
      ``,
      requestBlock,
      `- **from**: ${target === "mimo" ? "opencode" : "mimo"}`,
      `- **to**: ${target}`,
      `- **time**: ${timestamp}`,
      `- **status**: pending`,
      ``,
      `### Question`,
      question,
      ``,
      proposal ? `### Proposal\n${proposal}\n` : "",
      `### Response ${entryId}`,
      `_очікується..._`,
      ``,
      `---`,
    ].join("\n");

    await withFileLock(mailboxPath, () => {
      if (existsSync(mailboxPath)) {
        const existing = readFileSync(mailboxPath, "utf-8");
        writeFileSync(mailboxPath, existing + block, "utf-8");
      } else {
        writeFileSync(mailboxPath, `# Mailbox для ${target}\n` + block, "utf-8");
      }
    });

    // Сповістити людину
    await bot.api.sendMessage(
      CHAT_ID,
      `📬 Запит до ${target}: ${question}${warningSuffix}`
    );

    // Чекати відповіді (таймаут 10 хв) — шукаємо по entryId marker
    const TIMEOUT_MS = 10 * 60 * 1000;
    const start = Date.now();
    let response = null;

    while (Date.now() - start < TIMEOUT_MS) {
      await new Promise((r) => setTimeout(r, 3000));
      if (existsSync(mailboxPath)) {
        const content = readFileSync(mailboxPath, "utf-8");
        // Шукаємо саме наш marker: "### Response <entryId>" + НЕ _очікується
        const markerRegex = new RegExp(
          `${responseMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n(?!_очікується)([\\s\\S]*?)(?=\\n## Request|\\n---\\n|$)`
        );
        const m = content.match(markerRegex);
        if (m) {
          response = m[1].trim();
          break;
        }
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

const TRANSPORT = process.env.HB_TRANSPORT || "stdio";
const PORT = parseInt(process.env.HB_SSE_PORT || "3100", 10);

if (TRANSPORT === "sse") {
  const transports = new Map<string, StreamableHTTPServerTransport>();

  const httpServer = createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://localhost:${PORT}`);

    if (url.pathname === "/health" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", connected: transports.size }));
      return;
    }

    if (url.pathname === "/mcp") {
      if (req.method === "POST") {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        let transport: StreamableHTTPServerTransport;

        if (sessionId && transports.has(sessionId)) {
          transport = transports.get(sessionId)!;
        } else if (!sessionId) {
          let body: unknown;
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(chunk);
            body = JSON.parse(Buffer.concat(chunks).toString());
          } catch {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32700, message: "Parse error" }, id: null }));
            return;
          }

          if (!isInitializeRequest(body)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "Bad Request: no session ID" }, id: null }));
            return;
          }

          transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (sid) => {
              transports.set(sid, transport);
            },
          });

          transport.onclose = () => {
            const sid = transport.sessionId;
            if (sid) transports.delete(sid);
          };

          await server.connect(transport);
          await transport.handleRequest(req, res, body);
          return;
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "Bad Request: invalid session" }, id: null }));
          return;
        }

        await transport.handleRequest(req, res);
        return;
      }

      if (req.method === "GET") {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        if (!sessionId || !transports.has(sessionId)) {
          res.writeHead(400);
          res.end("Invalid or missing session ID");
          return;
        }
        await transports.get(sessionId)!.handleRequest(req, res);
        return;
      }

      if (req.method === "DELETE") {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        if (!sessionId || !transports.has(sessionId)) {
          res.writeHead(400);
          res.end("Invalid or missing session ID");
          return;
        }
        const transport = transports.get(sessionId)!;
        await transport.handleRequest(req, res);
        return;
      }
    }

    res.writeHead(404);
    res.end("Not found");
  });

  httpServer.listen(PORT, () => {
    console.log(`🔗 human-bridge StreamableHTTP on http://localhost:${PORT}`);
    console.log(`   MCP endpoint: http://localhost:${PORT}/mcp`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
  });
} else {
  await server.connect(new StdioServerTransport());
}
