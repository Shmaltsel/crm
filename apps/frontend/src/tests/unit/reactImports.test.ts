import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const HOOKS = [
  "useState", "useEffect", "useCallback", "useMemo", "useRef",
  "useContext", "useReducer", "useLayoutEffect", "useImperativeHandle",
  "useDebugValue", "useTransition", "useDeferredValue", "useId",
  "useSyncExternalStore", "useInsertionEffect",
];

const pagesDir = path.resolve(__dirname, "../../pages");

function getAllImportedFromReact(content: string): Set<string> {
  const imported = new Set<string>();

  // Normalize multi-line imports: join lines from `import` to `;`
  const normalized = content.replace(/import\s+[\s\S]*?;/g, (match) =>
    match.replace(/\n\s*/g, " "),
  );

  for (const line of normalized.split("\n")) {
    if (!/from\s+["']react["']/.test(line)) continue;

    // default import: import React from "react" or import React, { ... }
    const defaultMatch = line.match(/^import\s+(\w+)/);
    if (defaultMatch) imported.add(defaultMatch[1]);

    // named imports: { useState, useEffect }
    const namedMatch = line.match(/\{([^}]+)\}/);
    if (namedMatch) {
      const raw = namedMatch[1].replace(/\s+/g, " ");
      for (const name of raw.split(",")) {
        const trimmed = name.trim();
        if (trimmed) imported.add(trimmed);
      }
    }
  }

  return imported;
}

function getUsedHooks(content: string): string[] {
  const used: string[] = [];
  for (const hook of HOOKS) {
    const regex = new RegExp(`\\b${hook}\\b`, "g");
    if (regex.test(content)) {
      used.push(hook);
    }
  }
  return used;
}

describe("React hooks imports in page files", () => {
  const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    it(`${file} має всі необхідні імпорти React-хуків`, () => {
      const content = fs.readFileSync(path.join(pagesDir, file), "utf-8");
      const imported = getAllImportedFromReact(content);
      const usedHooks = getUsedHooks(content);
      const missingHooks = usedHooks.filter((hook) => !imported.has(hook));

      expect(
        missingHooks,
        `${file}: використовує ${missingHooks.join(", ")}, але не імпортує з "react"`,
      ).toEqual([]);
    });
  }
});
