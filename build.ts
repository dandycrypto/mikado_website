import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { buildPages } from "./content/pages";
import { layout } from "./src/layout";
import { site } from "./content/site";

const root = import.meta.dir;
const dist = join(root, "dist");

// GitHub Pages project sites are served from /<repo>/. Set BASE_PATH at build
// time (for example BASE_PATH=/mikado_website) to rewrite root-relative URLs.
const base = (process.env.BASE_PATH || "").replace(/\/$/, "");
const withBase = (html: string) =>
  base ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`) : html;

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true });
cpSync(join(root, "src", "styles.css"), join(dist, "assets", "styles.css"));
cpSync(join(root, "src", "main.js"), join(dist, "assets", "main.js"));

if (base) {
  const fontsCssPath = join(dist, "assets", "fonts", "fonts.css");
  const fontsCss = readFileSync(fontsCssPath, "utf8").replace(
    /url\("\/assets\//g,
    `url("${base}/assets/`,
  );
  writeFileSync(fontsCssPath, fontsCss);
}

const pages = buildPages();
const today = "2026-11-09";

for (const page of pages) {
  const html = layout({
    path: page.path,
    title: page.title,
    description: page.description,
    active: page.active,
    ogImage: page.ogImage,
    schema: page.schema,
    body: page.body,
  });
  const dir = join(dist, page.path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), withBase(html));
}

const urls = pages.map((p) => p.path);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${site.url}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);

writeFileSync(
  join(dist, "robots.txt"),
  process.env.STAGING === "1"
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
);

writeFileSync(
  join(dist, "llms.txt"),
  `# Mikado Group

> Mikado Group is an Australian rail systems, signalling and project management consultancy based in Melbourne. It supports rail and infrastructure projects across Victoria, New South Wales, Queensland and South Australia. Mikado Group is part of Nippon Koei Co., Ltd. and the ID&E Group.

## Company

- Legal entity: ${site.legalName}
- ABN: ${site.abn}
- Head office: ${site.address.street}, ${site.address.locality} ${site.address.region} ${site.address.postcode}, Australia
- Phone: ${site.phone}
- Email: ${site.email}
- LinkedIn: ${site.linkedin}
- Parent: ${site.parent.name} (${site.parent.group})

## Services

- Railway signalling design and design management: ${site.url}/services/railway-signalling-design/
- Rail systems engineering: ${site.url}/services/rail-systems-engineering/
- Traction power and OHLE design: ${site.url}/services/traction-power-ohle/
- Train control systems (TCS, ETCS, CBTC): ${site.url}/services/train-control-systems/
- Operational control systems (OCS) and communications: ${site.url}/services/ocs-communications/
- Project and design management: ${site.url}/services/project-management/

## Project experience

- Level Crossing Removal Program, Victoria — every LXRP Alliance, 16+ crossing removals since 2020: ${site.url}/projects/level-crossing-removal/
- VIDA Rail Initiatives, Victoria: ${site.url}/projects/vida-rail-initiatives/
- Tram Grade Separation Project, Adelaide: ${site.url}/projects/tram-grade-separation/

## Events

- AusRAIL 2026, Booth ${site.ausrail.booth}, ${site.ausrail.venue}, ${site.ausrail.displayDates}: ${site.url}/ausrail-2026/

## Key pages

- Home: ${site.url}/
- About: ${site.url}/about/
- Projects: ${site.url}/projects/
- Careers: ${site.url}/careers/
- Contact: ${site.url}/contact/
`,
);

writeFileSync(
  join(dist, "404.html"),
  withBase(`<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, follow" />
<title>Page not found | Mikado Group</title>
<link rel="icon" type="image/png" href="/assets/brand/favicon.png" />
<link rel="stylesheet" href="/assets/fonts/fonts.css" />
<link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>
<main class="section" style="min-height:70vh;display:grid;place-items:center;text-align:center">
  <div class="wrap">
    <img src="/assets/brand/mikado-logo-blue.png" alt="Mikado Group" width="1487" height="1191" style="margin:0 auto 2rem;width:120px;height:auto" />
    <p class="eyebrow" style="justify-content:center">404</p>
    <h1>Page not found</h1>
    <p>The page you were looking for has moved or no longer exists.</p>
    <div class="hero-actions" style="justify-content:center;margin-top:1.5rem">
      <a class="btn btn--primary" href="/">Back to home</a>
      <a class="btn btn--outline" href="/contact/">Contact us</a>
    </div>
  </div>
</main>
</body>
</html>
`),
);

console.log(`Built ${pages.length} pages to ${dist}`);
for (const p of urls) console.log(`  ${p}`);
