// Renders Open Graph PNGs into `public/`:
//   - public/og-default.png            (rendered from public/og-default.svg)
//   - public/og/<collection>/<slug>.png (one per case study / article)
//
// Uses `sharp` (explicit dep — pnpm 9+ does not allow importing transitive
// deps) and `gray-matter` to parse MDX frontmatter.
//
// Run as part of `pnpm build` (chained before `astro build`). The previous
// `prebuild` lifecycle hook does NOT work under pnpm 9+, which disables
// pre/post lifecycle scripts by default.
//
// Per-entry images are written under `public/og/`, which is gitignored: they
// regenerate on every CI build, so the repo stays binary-blob-free.
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");

const COLLECTIONS = [
  { dir: "case-studies", eyebrow: "CASE STUDY" },
  { dir: "articles", eyebrow: "NOTE" },
];

async function main() {
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    console.warn("[build-og] `sharp` not installed; skipping. Run `pnpm install` first.");
    return;
  }

  let matter;
  try {
    ({ default: matter } = await import("gray-matter"));
  } catch {
    console.warn("[build-og] `gray-matter` not installed; skipping per-entry OG.");
  }

  await renderDefault(sharp);

  if (matter) {
    for (const { dir, eyebrow } of COLLECTIONS) {
      await renderCollection({ sharp, matter, dir, eyebrow });
    }
  }
}

async function renderDefault(sharp) {
  const inPath = resolve(root, "public/og-default.svg");
  const outPath = resolve(root, "public/og-default.png");
  try {
    await stat(inPath);
  } catch {
    console.warn(`[build-og] No source SVG at ${inPath}; skipping default.`);
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

async function renderCollection({ sharp, matter, dir, eyebrow }) {
  const srcDir = resolve(root, "src/content", dir);
  let files;
  try {
    files = await readdir(srcDir);
  } catch {
    return;
  }
  files = files.filter((f) => /\.mdx?$/.test(f));
  if (files.length === 0) return;

  const outDir = resolve(root, "public/og", dir);
  await mkdir(outDir, { recursive: true });

  for (const file of files) {
    const srcPath = resolve(srcDir, file);
    const slug = basename(file).replace(/\.mdx?$/, "");
    const raw = await readFile(srcPath, "utf-8");
    const { data } = matter(raw);

    if (data.draft) continue;

    const svg = entrySvg({
      eyebrow,
      title: typeof data.title === "string" ? data.title : "Untitled",
      tags: Array.isArray(data.tags) ? data.tags : [],
    });

    const outPath = resolve(outDir, `${slug}.png`);
    const png = await sharp(Buffer.from(svg), { density: 192 })
      .resize(1200, 630, { fit: "cover" })
      .png({ compressionLevel: 9 })
      .toBuffer();
    await writeFile(outPath, png);
    console.log(`[build-og] Wrote ${outPath} (${png.byteLength} bytes)`);
  }
}

function escapeXml(s) {
  return String(s).replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c],
  );
}

// Very rough word-wrap. Good enough for predictable English titles at the
// font sizes we render. If a title overflows we truncate at 3 lines with "…".
function wrapText(text, maxCharsPerLine) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function entrySvg({ eyebrow, title, tags }) {
  let titleLines = wrapText(title, 28);
  if (titleLines.length > 3) {
    titleLines = titleLines.slice(0, 3);
    const last = titleLines[2];
    titleLines[2] = last.length > 27 ? `${last.slice(0, 27)}…` : `${last}…`;
  }

  const tagsText = tags.slice(0, 4).join(" · ").toUpperCase();

  const titleStartY = 230;
  const titleLineHeight = 78;
  const tagsY = titleStartY + (titleLines.length - 1) * titleLineHeight + 56;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#0c0c0d"/>
  <g font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
    <g transform="translate(80, 110)">
      <rect x="0" y="14" width="40" height="2" fill="#36363a"/>
      <text x="56" y="22" font-size="20" font-weight="500" letter-spacing="3" fill="#5e5e5e">${escapeXml(eyebrow)}</text>
    </g>
    ${titleLines
      .map(
        (line, i) =>
          `<text x="80" y="${titleStartY + i * titleLineHeight}" font-size="64" font-weight="600" letter-spacing="-1.5" fill="#ededed">${escapeXml(line)}</text>`,
      )
      .join("\n    ")}
    ${
      tagsText
        ? `<text x="80" y="${tagsY}" font-size="22" font-weight="500" letter-spacing="2.5" fill="#9aa6dc">${escapeXml(tagsText)}</text>`
        : ""
    }
    <line x1="80" y1="500" x2="1120" y2="500" stroke="#232325" stroke-width="1"/>
    <text x="80" y="540" font-size="22" fill="#b0b0b0">Reza Enayati · Senior Backend Engineer</text>
    <text x="1120" y="540" font-size="22" fill="#5e5e5e" text-anchor="end">rezaenayati.me</text>
  </g>
</svg>`;
}

main().catch((err) => {
  console.error("[build-og] Failed:", err);
  process.exit(1);
});
