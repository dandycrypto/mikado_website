/**
 * Downloads the brand fonts (Inter + Bricolage Grotesque) as local woff2 files
 * and writes assets/fonts/fonts.css. Run once: `bun scripts/fetch-fonts.ts`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dir, "..", "assets", "fonts");
mkdirSync(OUT, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const families = [
  { family: "Inter", weights: [400, 500, 600, 700] },
  { family: "Bricolage Grotesque", weights: [400, 500, 600, 700, 800] },
];

type Face = { family: string; weight: number; style: string; url: string; unicodeRange: string };
const faces: Face[] = [];

for (const f of families) {
  const api = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f.family)}:wght@${f.weights.join(";")}&display=swap`;
  const css = await (await fetch(api, { headers: { "User-Agent": UA } })).text();

  // Split on @font-face blocks, keep latin + latin-ext subsets only.
  const blocks = css.split("@font-face").slice(1);
  for (const block of blocks) {
    const unicode = (block.match(/unicode-range:\s*([^;]+);/) || [])[1] || "";
    const isLatin = unicode.includes("U+0000-00FF") || unicode.includes("U+0100-02BA");
    if (!isLatin) continue;

    const url = (block.match(/url\((https:\/\/[^)]+\.woff2)\)/) || [])[1];
    const weight = Number((block.match(/font-weight:\s*(\d+)/) || [])[1] || 400);
    const style = (block.match(/font-style:\s*(\w+)/) || [])[1] || "normal";
    if (!url) continue;

    const file = `${f.family.replace(/\s+/g, "-").toLowerCase()}-${weight}${style === "italic" ? "-italic" : ""}-${isLatin ? (unicode.includes("U+0100") ? "latin-ext" : "latin") : "x"}.woff2`;
    const buf = new Uint8Array(await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer());
    writeFileSync(join(OUT, file), buf);
    faces.push({ family: f.family, weight, style, url: `/assets/fonts/${file}`, unicodeRange: unicode.trim() });
    console.log("saved", file, buf.byteLength);
  }
}

const faceCss = faces
  .map(
    (f) => `@font-face {
  font-family: "${f.family}";
  font-style: ${f.style};
  font-weight: ${f.weight};
  font-display: swap;
  src: url("${f.url}") format("woff2");
  unicode-range: ${f.unicodeRange};
}`,
  )
  .join("\n\n");

writeFileSync(join(OUT, "fonts.css"), faceCss + "\n");
console.log(`\n${faces.length} faces written to assets/fonts/fonts.css`);
