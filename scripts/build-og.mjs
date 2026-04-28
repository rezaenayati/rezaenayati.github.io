// Render public/og-default.svg → public/og-default.png (1200x630).
// Uses `sharp`, which Astro already pulls in as a dependency.
// Run via `pnpm build:og`. Wired into `prebuild` so production builds always
// have a fresh PNG OG image.
import { readFile, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");
const inPath = resolve(root, "public/og-default.svg");
const outPath = resolve(root, "public/og-default.png");

async function main() {
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch (err) {
    console.warn(
      "[build-og] `sharp` not installed; skipping OG PNG generation.",
      "Run `pnpm install` first.",
    );
    return;
  }

  try {
    await stat(inPath);
  } catch {
    console.warn(`[build-og] No source SVG at ${inPath}; skipping.`);
    return;
  }

  const svg = await readFile(inPath);
  const png = await sharp(svg, { density: 192 })
    .resize(1200, 630, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(outPath, png);
  console.log(`[build-og] Wrote ${outPath} (${png.byteLength} bytes)`);
}

main().catch((err) => {
  console.error("[build-og] Failed:", err);
  process.exit(1);
});
