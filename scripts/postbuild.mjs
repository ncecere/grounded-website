// Runs after `next build`:
//  1. Hashes every inline <script> in out/**/*.html (Next.js inlines its page
//     payload) and writes build/security-headers.conf with those hashes in the
//     Content-Security-Policy, so script-src needs no 'unsafe-inline'.
//  2. Fails if the output references another origin for scripts, styles or
//     fonts (the site must load nothing from third parties at runtime).
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const files = walk(out);
const hashes = new Set();
const problems = [];

for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    if (m[1].length === 0) continue;
    hashes.add(`'sha256-${createHash("sha256").update(m[1], "utf8").digest("base64")}'`);
  }
  for (const m of html.matchAll(/<(script|link)\b[^>]*\b(?:src|href)="(https?:)?\/\/([^"/]+)[^"]*"[^>]*>/g)) {
    const tag = m[0];
    const isCanonicalOrAlternate = /rel="(canonical|alternate)"/.test(tag);
    if (!isCanonicalOrAlternate && !m[3].endsWith("grounded.bitop.dev")) {
      problems.push(`${relative(root, file)}: third-party resource ${tag.slice(0, 120)}`);
    }
  }
}
for (const file of files.filter((f) => f.endsWith(".css"))) {
  const css = readFileSync(file, "utf8");
  for (const m of css.matchAll(/url\(\s*["']?(https?:)?\/\/[^)]*\)|@import\s+["']?(https?:)?\/\//g)) {
    problems.push(`${relative(root, file)}: third-party url ${m[0].slice(0, 120)}`);
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const template = readFileSync(join(root, "nginx", "security-headers.conf"), "utf8");
const conf = template.replace("__CSP_SCRIPT_HASHES__", [...hashes].sort().join(" "));
mkdirSync(join(root, "build"), { recursive: true });
writeFileSync(join(root, "build", "security-headers.conf"), conf);
console.log(`postbuild: ${hashes.size} inline script hashes in build/security-headers.conf; no third-party resources`);
