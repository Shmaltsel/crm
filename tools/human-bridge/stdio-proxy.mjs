#!/usr/bin/env node
import { createInterface } from "node:readline";

const MCP_URL = process.env.HB_MCP_URL || "http://localhost:3100/mcp";
let sessionId = null;
let initialized = false;

function parseSSE(buffer) {
  const messages = [];
  const parts = buffer.split("\n\n");
  const remaining = parts.pop();
  for (const part of parts) {
    let data = "";
    for (const line of part.split("\n")) {
      if (line.startsWith("data: ")) data += line.slice(6);
    }
    if (data && data !== "[DONE]") {
      try { messages.push(JSON.parse(data)); } catch {}
    }
  }
  return { messages, remaining };
}

async function connectSSE() {
  try {
    const headers = { "Accept": "text/event-stream" };
    if (sessionId) headers["mcp-session-id"] = sessionId;
    const resp = await fetch(MCP_URL, { method: "GET", headers });
    if (!resp.ok) return;
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const result = parseSSE(buffer);
      buffer = result.remaining;
      for (const msg of result.messages) {
        process.stdout.write(JSON.stringify(msg) + "\n");
      }
    }
  } catch {}
}

async function post(msg) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
  };
  if (sessionId) headers["mcp-session-id"] = sessionId;

  const resp = await fetch(MCP_URL, { method: "POST", headers, body: JSON.stringify(msg) });
  const sid = resp.headers.get("mcp-session-id");
  if (sid) sessionId = sid;

  const ct = resp.headers.get("content-type") || "";
  if (ct.includes("text/event-stream")) {
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const result = parseSSE(buffer);
      buffer = result.remaining;
      for (const m of result.messages) {
        process.stdout.write(JSON.stringify(m) + "\n");
      }
    }
  } else {
    const body = await resp.json();
    process.stdout.write(JSON.stringify(body) + "\n");
  }

  if (msg.method === "initialize" && !initialized) {
    initialized = true;
    connectSSE();
  }
}

const rl = createInterface({ input: process.stdin });
let queue = Promise.resolve();
rl.on("line", (line) => {
  try {
    const msg = JSON.parse(line);
    queue = queue.then(() => post(msg)).catch((err) => {
      process.stderr.write(`proxy error: ${err.message}\n`);
    });
  } catch {}
});
