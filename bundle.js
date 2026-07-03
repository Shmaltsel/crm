const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

/*
    code  - тільки вихідний код
    audit - код + конфіги + документація
    full  - усе, крім сміття
*/
const MODE = "audit";

// Орієнтовний ліміт на один bundle
const MAX_TOKENS = 90000;

const OUTPUT_DIR = "project_export";

const IGNORE_DIRS = new Set([
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    ".turbo",
    ".vercel",
    ".idea",
    ".vscode",
    ".cache",
    ".output",
    ".nuxt",
    ".parcel-cache",
    ".history",
    ".DS_Store",
    "coverage",
    "test-results",
    ".lighthouseci",
]);

const ROOTS = [
    "apps",
    "packages",
    "scripts",
    "prisma",
    "src",
];

const CODE_EXT = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".prisma",
]);

const AUDIT_EXT = new Set([
    ...CODE_EXT,

    ".json",
    ".css",
    ".scss",
    ".sass",
    ".less",

    ".sql",

    ".html",

    ".md",

    ".yaml",
    ".yml",

    ".env",

    ".sh",

    ".graphql",
    ".gql",
]);

const FULL_IGNORE_EXT = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".ico",

    ".woff",
    ".woff2",
    ".ttf",
    ".otf",

    ".mp3",
    ".mp4",
    ".avi",
    ".mov",

    ".zip",
    ".rar",
    ".7z",
    ".gz",
    ".tar",

    ".pdf",

    ".exe",
    ".dll",

    ".lock",
]);

let bundleIndex = 1;
let currentTokens = 0;
let currentBundle = "";

let totalFiles = 0;
let totalLines = 0;
let totalTokens = 0;

const manifest = [];
const skipped = [];
const extensionStats = {};
const folderStats = {};

if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, {
        recursive: true,
        force: true,
    });
}

fs.mkdirSync(OUTPUT_DIR);

function estimateTokens(text) {
    return Math.ceil(text.length / 4);
}

function writeBundle(force = false) {

    if (!force && currentTokens < MAX_TOKENS)
        return;

    const filename =
        `bundle_${String(bundleIndex).padStart(2, "0")}.md`;

    fs.writeFileSync(
        path.join(OUTPUT_DIR, filename),
        currentBundle
    );

    bundleIndex++;
    currentBundle = "";
    currentTokens = 0;
}

function addBlock(rel, text) {

    const block =
`# FILE: ${rel}

\`\`\`
${text.replace(/\r\n/g, "\n")}
\`\`\`

`;

    const tokens = estimateTokens(block);

    if (currentTokens + tokens > MAX_TOKENS) {
        writeBundle(true);
    }

    currentBundle += block;

    currentTokens += tokens;
    totalTokens += tokens;

    manifest.push({
        file: rel,
        bundle:
            `bundle_${String(bundleIndex).padStart(2, "0")}.md`,
        tokens,
        lines:
            text.split(/\r?\n/).length,
    });
}

function shouldInclude(file) {

    const ext =
        path.extname(file).toLowerCase();

    if (MODE === "code") {

        return (
            CODE_EXT.has(ext) ||
            path.basename(file) === "package.json"
        );

    }

    if (MODE === "audit") {

        return (
            AUDIT_EXT.has(ext) ||
            path.basename(file) === "package.json"
        );

    }

    return !FULL_IGNORE_EXT.has(ext);

}
function walk(dir) {

    if (!fs.existsSync(dir))
        return;

    const entries = fs.readdirSync(dir, {
        withFileTypes: true,
    });

    entries.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    for (const entry of entries) {

        const full =
            path.join(dir, entry.name);

        const rel =
            path.relative(ROOT, full)
                .replace(/\\/g, "/");

        if (entry.isDirectory()) {

            if (
                IGNORE_DIRS.has(entry.name) ||
                entry.name.startsWith(".")
            ) {
                skipped.push({
                    path: rel,
                    reason: "ignored directory",
                });
                continue;
            }

            walk(full);
            continue;
        }

        if (!shouldInclude(full)) {

            skipped.push({
                path: rel,
                reason: "extension",
            });

            continue;
        }

        try {

            const text =
                fs.readFileSync(
                    full,
                    "utf8"
                );

            totalFiles++;

            const lines =
                text.split(/\r?\n/).length;

            totalLines += lines;

            const ext =
                path.extname(full) || "(none)";

            extensionStats[ext] =
                (extensionStats[ext] || 0) + 1;

            const topFolder =
                rel.split("/")[0];

            folderStats[topFolder] =
                (folderStats[topFolder] || 0) + 1;

            process.stdout.write(
                `\r${totalFiles} files`
            );

            addBlock(rel, text);

        } catch (err) {

            skipped.push({
                path: rel,
                reason: err.message,
            });

        }

    }

}

function buildTree(dir, prefix = "") {

    if (!fs.existsSync(dir))
        return "";

    let result = "";

    const entries =
        fs.readdirSync(dir, {
            withFileTypes: true,
        })
        .filter(e => {

            if (
                e.isDirectory() &&
                IGNORE_DIRS.has(e.name)
            )
                return false;

            if (
                e.name.startsWith(".")
            )
                return false;

            return true;

        })
        .sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    entries.forEach((entry, index) => {

        const last =
            index === entries.length - 1;

        result +=
            prefix +
            (last ? "└── " : "├── ") +
            entry.name +
            "\n";

        if (entry.isDirectory()) {

            result += buildTree(
                path.join(dir, entry.name),
                prefix +
                (last
                    ? "    "
                    : "│   ")
            );

        }

    });

    return result;

}

console.log("Building tree...");

let tree = "";

for (const root of ROOTS) {

    const full =
        path.join(ROOT, root);

    if (!fs.existsSync(full))
        continue;

    tree +=
        root +
        "\n" +
        buildTree(full) +
        "\n";

}

fs.writeFileSync(
    path.join(
        OUTPUT_DIR,
        "tree.txt"
    ),
    tree
);

console.log("Scanning project...");

for (const root of ROOTS) {

    const full =
        path.join(ROOT, root);

    if (
        fs.existsSync(full)
    ) {
        walk(full);
    }

}

writeBundle(true);

const statistics = {
    mode: MODE,
    generatedAt: new Date().toISOString(),

    totals: {
        files: totalFiles,
        lines: totalLines,
        estimatedTokens: totalTokens,
        bundles: bundleIndex,
    },

    byExtension: extensionStats,

    byRootFolder: folderStats,
};

fs.writeFileSync(
    path.join(
        OUTPUT_DIR,
        "manifest.json"
    ),
    JSON.stringify(
        manifest,
        null,
        2
    )
);

fs.writeFileSync(
    path.join(
        OUTPUT_DIR,
        "statistics.json"
    ),
    JSON.stringify(
        statistics,
        null,
        2
    )
);

fs.writeFileSync(
    path.join(
        OUTPUT_DIR,
        "skipped.json"
    ),
    JSON.stringify(
        skipped,
        null,
        2
    )
);

console.log();
console.log("========================================");
console.log(" Export finished");
console.log("========================================");

console.log();

console.log(
    "Mode               :",
    MODE
);

console.log(
    "Files              :",
    totalFiles
);

console.log(
    "Lines              :",
    totalLines
);

console.log(
    "Estimated Tokens   :",
    totalTokens
);

console.log(
    "Bundles            :",
    bundleIndex - 1
);

console.log(
    "Skipped            :",
    skipped.length
);

console.log();

console.log("Output:");

console.log(
    "  " + OUTPUT_DIR + "/"
);

console.log(
    "   ├── tree.txt"
);

console.log(
    "   ├── manifest.json"
);

console.log(
    "   ├── statistics.json"
);

console.log(
    "   ├── skipped.json"
);

for (let i = 1; i < bundleIndex; i++) {

    console.log(
        "   ├── bundle_" +
        String(i).padStart(2, "0") +
        ".md"
    );

}

console.log();
console.log("========================================");
console.log();

console.log("Top extensions:");

Object.entries(extensionStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([ext, count]) => {

        console.log(
            ext.padEnd(12),
            count
        );

    });

console.log();

console.log("Top folders:");

Object.entries(folderStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([folder, count]) => {

        console.log(
            folder.padEnd(20),
            count
        );

    });

console.log();
console.log("Done.");