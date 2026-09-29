// Copies the screenshots that exist into public/images as optimised WebP and
// records their sizes in lib/screenshots.json. Slots without a file keep
// showing a placeholder. Run locally (`npm run images`) and commit the result;
// CI never reads the screenshots directory.
//
// Only screenshots from the public "Example University" set are allowed:
// SCREENSHOTS_DIR defaults to ../grounded-assets/screenshots.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = resolve(process.env.SCREENSHOTS_DIR ?? join(root, "..", "grounded-assets", "screenshots"));
const outDir = join(root, "public", "images");
const slots = JSON.parse(readFileSync(join(root, "lib", "slots.json"), "utf8"));
const MAX_WIDTH = 1600;

mkdirSync(outDir, { recursive: true });
const manifest = {};
const missing = [];

for (const name of Object.keys(slots)) {
  // A slot may name its source file ("file"), when the screenshot set names it differently.
  const base = slots[name].file ?? name;
  const src = [".png", ".webp", ".jpg"].map((ext) => join(sourceDir, base + ext)).find((p) => existsSync(p));
  const dest = join(outDir, `${name}.webp`);
  if (!src) {
    missing.push(`${name}.png`);
    rmSync(dest, { force: true });
    continue;
  }
  const image = sharp(src).rotate();
  const meta = await image.metadata();
  const pipeline = meta.width > MAX_WIDTH ? image.resize({ width: MAX_WIDTH }) : image;
  const info = await pipeline.webp({ quality: 82, effort: 6 }).toFile(dest);
  manifest[name] = { src: `/images/${name}.webp`, width: info.width, height: info.height };
  console.log(`ok       ${name}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KiB`);
}

writeFileSync(join(root, "lib", "screenshots.json"), JSON.stringify(manifest, null, 2) + "\n");
for (const file of missing) console.log(`missing  ${file}`);
console.log(`${Object.keys(manifest).length} of ${Object.keys(slots).length} slots filled from ${sourceDir}`);
