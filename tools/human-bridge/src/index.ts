import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "..", ".env") });
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Bot, InlineKeyboard } from "grammy";
import { z } from "zod";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const pending = new Map<string, (answer: string) => void>();
let reqCounter = 0;

bot.on("callback_query:data", async (ctx) => {
  const [reqId, answer] = ctx.callbackQuery.data.split("::");
  pending.get(reqId)?.(answer);
  pending.delete(reqId);
  await ctx.answerCallbackQuery();
  await ctx.editMessageReplyMarkup(undefined);
});

bot.on("message:text", async (ctx) => {
  const entry = [...pending.entries()].find(([id]) => id.startsWith("text:"));
  if (entry) {
    const [reqId, resolve] = entry;
    resolve(ctx.message.text);
    pending.delete(reqId);
  }
});

bot.start();

const server = new McpServer({ name: "human-bridge", version: "1.0.0" });

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

server.tool(
  "notify",
  "Надіслати повідомлення в Telegram без очікування відповіді.",
  { message: z.string() },
  async ({ message }) => {
    await bot.api.sendMessage(CHAT_ID, message);
    return { content: [{ type: "text", text: "sent" }] };
  }
);

await server.connect(new StdioServerTransport());
