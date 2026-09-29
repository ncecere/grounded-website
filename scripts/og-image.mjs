// Builds the Open Graph card, public/og.png (1200x630), from the brand colours
// and, when it exists, the chat screenshot. Run locally (`npm run og`) after
// `npm run images` and commit the result.
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const shot = join(root, "public", "images", "chat-answer-with-claims.webp");
const hasShot = existsSync(shot);

const font = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.15" cy="0" r="1">
      <stop offset="0" stop-color="#4b4fd6" stop-opacity="0.55"/>
      <stop offset="0.6" stop-color="#4b4fd6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0b0d12"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g transform="translate(80 88)">
    <rect width="64" height="64" rx="14" fill="#4b4fd6"/>
    <rect x="37" y="37" width="17" height="17" rx="4" fill="#2dd4bf"/>
    <text x="88" y="46" font-family="${font}" font-size="44" font-weight="600" fill="#eceef2">Grounded</text>
  </g>
  <text font-family="${font}" font-weight="600" fill="#eceef2" font-size="${hasShot ? 50 : 60}" letter-spacing="-1">
    ${(hasShot
      ? ["Agents that answer", "only from your", "sources, with", "citations."]
      : ["Agents that answer only from", "your sources, with citations."]
    )
      .map((line, i) => `<tspan x="80" y="${260 + i * (hasShot ? 62 : 74)}">${line}</tspan>`)
      .join("")}
  </text>
  <text x="80" y="${H - 70}" font-family="${font}" font-size="26" fill="#9ba3b0">Open source (MIT) · Self-hosted · Multi-tenant</text>
</svg>`;

const layers = [];
if (hasShot) {
  const shotWidth = 560;
  const img = sharp(shot).resize({ width: shotWidth });
  const { data, info } = await img.png().toBuffer({ resolveWithObject: true });
  const height = Math.min(info.height, H - 120);
  const cropped = await sharp(data).extract({ left: 0, top: 0, width: info.width, height }).toBuffer();
  const mask = Buffer.from(
    `<svg width="${info.width}" height="${height}"><rect width="${info.width}" height="${height}" rx="16" fill="#fff"/></svg>`,
  );
  const rounded = await sharp(cropped).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  layers.push({ input: rounded, left: W - shotWidth - 60, top: Math.round((H - height) / 2) });
}

await sharp(Buffer.from(svg))
  .composite(layers)
  .png({ compressionLevel: 9, palette: false })
  .toFile(join(root, "public", "og.png"));
console.log(`wrote public/og.png${hasShot ? " (with the chat screenshot)" : ""}`);
