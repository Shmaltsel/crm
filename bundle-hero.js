const fs = require("fs");
const path = require("path");

const HERO_DIR = path.join(__dirname, "apps", "frontend", "hero");
const OUTPUT = path.join(HERO_DIR, "HERO-BUNDLE.md");

const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".mimocode", "public", "materials"]);
const SKIP_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff", ".woff2", ".ttf", ".eot"]);
const ROOT_CONFIGS = [
  "package.json", "vite.config.ts", "tsconfig.json",
  "tsconfig.app.json", "tsconfig.node.json", "postcss.config.js", ".oxlintrc.json",
];

function tree(dir, prefix = "", depth = 0) {
  if (depth > 6) return "";
  let out = "";
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => !SKIP_DIRS.has(e.name) && !e.name.startsWith("."))
    .sort((a, b) => (a.isDirectory() ? 0 : 1) - (b.isDirectory() ? 0 : 1) || a.name.localeCompare(b.name));

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const last = i === entries.length - 1;
    const conn = last ? "└── " : "├── ";
    const child = path.join(dir, e.name);

    if (e.isDirectory()) {
      out += `${prefix}${conn}${e.name}/\n`;
      out += tree(child, prefix + (last ? "    " : "│   "), depth + 1);
    } else if (!SKIP_EXTS.has(path.extname(e.name).toLowerCase())) {
      out += `${prefix}${conn}${e.name}\n`;
    }
  }
  return out;
}

function collectFiles(dir) {
  const files = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (SKIP_DIRS.has(e.name) || e.name.startsWith(".")) continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (SKIP_EXTS.has(path.extname(e.name).toLowerCase())) continue;
      files.push(full);
    }
  };
  walk(dir);
  return files;
}

function lang(ext) {
  const map = { ts: "typescript", tsx: "typescript", js: "javascript", jsx: "javascript", css: "css", json: "json", html: "html" };
  return map[ext] || "";
}

// --- build ---

const projectTree = tree(HERO_DIR);
const files = collectFiles(path.join(HERO_DIR, "src"));

// root configs first
const rootFiles = ROOT_CONFIGS
  .map(name => path.join(HERO_DIR, name))
  .filter(f => fs.existsSync(f));

let md = `# @svitlo/hero — Project Bundle\n\n`;
md += `**Generated:** ${new Date().toISOString()}\n\n`;
md += `## Project Tree\n\n\`\`\`\n${projectTree}\`\`\`\n\n---\n\n`;

// root configs
md += `## Root Configs\n\n`;
for (const f of rootFiles) {
  const rel = path.relative(HERO_DIR, f).replace(/\\/g, "/");
  const ext = path.extname(f).slice(1);
  const content = fs.readFileSync(f, "utf8");
  md += `### \`${rel}\`\n\`\`\`${lang(ext)}\n${content}\n\`\`\`\n\n`;
}

// source files
md += `## Source Files\n\n`;
let totalLines = 0;
for (const f of files) {
  const rel = path.relative(HERO_DIR, f).replace(/\\/g, "/");
  const ext = path.extname(f).slice(1);
  if (ext === "svg" || ext === "png") continue;
  const content = fs.readFileSync(f, "utf8");
  totalLines += content.split(/\r?\n/).length;
  md += `### \`${rel}\`\n\`\`\`${lang(ext)}\n${content}\n\`\`\`\n\n`;
}

const stats = `**Files:** ${files.length + rootFiles.length} | **Lines:** ${totalLines.toLocaleString()}`;
md += `---\n\n${stats}\n`;

fs.writeFileSync(OUTPUT, md);
console.log(`✅ HERO-BUNDLE.md — ${stats}`);
