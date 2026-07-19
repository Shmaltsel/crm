#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

function decodeUnicodeEscapes(str) {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

const files = [
  {
    path: "apps/backend/src/categories/categories.service.ts",
    decode: true,
  },
  {
    path: "apps/backend/src/analytics/analytics.service.ts",
    decode: false,
    replacements: [
      ["'\uFFFD'", "'\u2014'"],
      ["'????'", "'\u0406\u043D\u0448\u0435'"],
    ],
  },
  {
    path: "apps/frontend/src/pages/CityLeaderboard.tsx",
    decode: false,
    replacements: [
      ["'???'", "'\u0412\u0441\u0456'"],
      ["'?????'", "'\u0428\u043A\u043E\u043B\u0438'"],
      ["'???????'", "'\u0421\u0430\u0434\u043E\u0447\u043A\u0438'"],
    ],
  },
];

for (const { path: filePath, decode, replacements } of files) {
  let content = readFileSync(filePath, "utf-8");
  let changed = false;

  if (decode) {
    const decoded = decodeUnicodeEscapes(content);
    if (decoded !== content) {
      content = decoded;
      changed = true;
    }
  }

  if (replacements) {
    for (const [from, to] of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
      }
    }
  }

  if (changed) {
    writeFileSync(filePath, content, "utf-8");
    console.log(`Fixed: ${filePath}`);
  } else {
    console.log(`Already OK: ${filePath}`);
  }
}
