/**
 * Post-build QA: crawls every page in the sitemap, checks internal links,
 * JSON-LD, titles, descriptions, canonicals and H1 counts.
 * Usage: bun scripts/check.ts   (site must be served on localhost:4173)
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "dist");
const base = "http://localhost:4173";
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = urls.map((u) => new URL(u).pathname);

const internal = new Set<string>();
const errors: string[] = [];
const warnings: string[] = [];
let jsonLdCount = 0;

const fileFor = (p: string) =>
  p.endsWith("/") ? join(root, p.slice(1), "index.html") : join(root, p.slice(1));

for (const path of paths) {
  const res = await fetch(base + path);
  if (!res.ok) {
    errors.push(`${path} → HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const h1s = [...html.matchAll(/<h1[^>]*>/g)].length;

  if (!title) errors.push(`${path}: missing title`);
  if (title.length > 65) warnings.push(`${path}: title ${title.length} chars`);
  if (!desc) errors.push(`${path}: missing description`);
  if (desc.length < 70 || desc.length > 175) warnings.push(`${path}: description ${desc.length} chars`);
  if (!canonical.startsWith("https://www.mikadogroup.com.au")) errors.push(`${path}: bad canonical ${canonical}`);
  if (h1s !== 1) errors.push(`${path}: ${h1s} H1 elements`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLdCount++;
    try {
      const parsed = JSON.parse(m[1].replace(/\\u003c/g, "<"));
      if (!parsed["@context"]) errors.push(`${path}: JSON-LD missing @context`);
    } catch {
      errors.push(`${path}: invalid JSON-LD`);
    }
  }

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    if (clean.startsWith("/assets/")) {
      if (!existsSync(join(root, clean.slice(1)))) errors.push(`${path}: missing asset ${clean}`);
    } else {
      internal.add(clean);
      if (!existsSync(fileFor(clean))) errors.push(`${path}: broken link ${clean}`);
    }
  }
}

const imagesWithoutAlt: string[] = [];
for (const path of paths) {
  const html = await (await fetch(base + path)).text();
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) imagesWithoutAlt.push(`${path}: ${m[0].slice(0, 80)}`);
  }
}

console.log(`Pages checked: ${paths.length}`);
console.log(`Internal links checked: ${internal.size}`);
console.log(`JSON-LD blocks parsed: ${jsonLdCount}`);
console.log(`Errors: ${errors.length}`);
errors.forEach((e) => console.log(`  ✗ ${e}`));
console.log(`Warnings: ${warnings.length}`);
warnings.forEach((w) => console.log(`  ! ${w}`));
console.log(`Images missing alt: ${imagesWithoutAlt.length}`);
imagesWithoutAlt.forEach((i) => console.log(`  ! ${i}`));

if (errors.length) process.exit(1);
