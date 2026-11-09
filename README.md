# Mikado Group — Website V2

A static, multi-page replacement for the current single-page Carrd site at
[www.mikadogroup.com.au](https://www.mikadogroup.com.au).

Built for search and AI-agent visibility: 18 crawlable pages, unique metadata,
structured data, a machine-readable `llms.txt`, and a short direct answer at the
top of every page.

---

## Quick start

No dependencies. Requires [Bun](https://bun.sh).

```bash
bun build.ts            # generate the site into dist/
bun scripts/serve.ts    # preview at http://localhost:4173
bun scripts/check.ts    # crawl the build for broken links / SEO issues
```

`bun scripts/fetch-fonts.ts` re-downloads the brand fonts (only needed if you
clear `assets/fonts/`).

## Project structure

```
Website/
  build.ts               # renders pages, sitemap, robots.txt, llms.txt, 404
  content/
    site.ts              # company facts, services, projects, client logos
    pages.ts             # page copy and composition
  src/
    layout.ts            # head, header, footer, JSON-LD, helpers
    components.ts        # hero, cards, logo wall, FAQ, CTA
    styles.css           # design system (copied to dist/assets/styles.css)
    main.js              # nav + contact form enhancement
  scripts/
    serve.ts             # local preview server
    check.ts             # post-build QA crawl
    fetch-fonts.ts       # self-host font downloader
  assets/
    brand/               # official blue logo, favicon, group lockup
    fonts/               # Inter + Bricolage Grotesque (woff2)
    images/              # project imagery + client logos
  dist/                  # generated site — deploy this folder
```

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Home |
| `/services/` | Services index |
| `/services/railway-signalling-design/` | Signalling |
| `/services/rail-systems-engineering/` | Rail systems |
| `/services/traction-power-ohle/` | Traction power & OHLE |
| `/services/train-control-systems/` | TCS / ETCS / CBTC |
| `/services/ocs-communications/` | OCS, SCADA, communications |
| `/services/project-management/` | Project & design management |
| `/projects/` | Project index |
| `/projects/level-crossing-removal/` | LXRP |
| `/projects/vida-rail-initiatives/` | VIDA |
| `/projects/tram-grade-separation/` | Adelaide tram |
| `/about/` | About, philosophy, company details |
| `/careers/` | Careers + expression of interest |
| `/contact/` | Contact + mailto form |
| `/ausrail-2026/` | AusRAIL 2026, Booth 25 |
| `/news/` | News index |
| `/news/mikado-group-joins-nippon-koei/` | Acquisition article |

## Brand rules enforced

- **Official blue lockup only** — `/assets/brand/mikado-logo-blue.png`
  (`#00699F`). The old black and white logo files were removed so they cannot be
  reused by mistake.
- Header and footer use light surfaces so the blue lockup keeps its contrast.
  The navy appears in heroes, feature bands and the CTA.
- Colours: navy `#0D253C`, blue `#1F75BF`, signage blue `#006AA0`, paper
  `#F4F7FA`.
- Type: **Bricolage Grotesque** for headings, **Inter** for body. Both are
  self-hosted from `assets/fonts/`.
- The `Mikado Group` wordmark inside the lockup is never retyped or re-set — the
  supplied artwork is used as-is.

## Client logos

The 12 logos in `assets/images/clients/` were downloaded from the current
Mikado Group website and are presented as a logo wall (not a text list). Alt
text uses the client name. They remain the trademarks of their owners; usage
mirrors the current site's "Our Clients" presentation. Confirm usage permission
with each client before launch if that is required by contract.

## Facts and sources

Nothing on the site is invented. Claims map to:

| Claim | Source |
| --- | --- |
| Legal entity `Mikado Rail Pty Ltd`, ABN `41 693 662 118` | ABN Lookup |
| Address, phone, email | Current website |
| 16+ level crossing removals, every LXRP Alliance, since 2020 | Current website |
| VIDA, Transport Standards Taskforce, 10 years of Big Build | Current website |
| Tram Grade Separation: 3 bridges, 3 grade separations, OCS/SCADA | Current website |
| Victoria, NSW, Queensland, South Australia | Current website |
| Client and delivery-partner names | Current website logo slides |
| Nippon Koei majority acquisition, June 2026; ID&E Holdings parent; board appointments; CBTC/ETCS capability | Rail Express, 22 June 2026 |
| Managing Director Michael Lattouf and credentials | Public LinkedIn profile |
| AusRAIL 2026 dates, venue, Booth 25 | ausrail.com exhibitor listing |
| Regional Rail Revival | Rail Express, 22 June 2026 |

Deliberately **not** included because they could not be verified: founding year,
employee count, awards, project counts beyond the published 16+, specific
project names beyond the three published, and an AusRAIL event theme.

## SEO / AI-search features

- One `<h1>` per page and a 40–60 word direct-answer paragraph at the top.
- Unique `<title>`, meta description, canonical, Open Graph and Twitter tags.
- JSON-LD: `Organization` + `ProfessionalService`, `WebSite`,
  `BreadcrumbList`, `Service`, `FAQPage`, `NewsArticle`, `CreativeWork`.
- `sitemap.xml`, `robots.txt` and `llms.txt` generated on every build.
- Internal links between services, projects, about, contact and AusRAIL.
- Descriptive alt text on every image and descriptive link text.
- Self-hosted fonts, WebP imagery, no third-party scripts.
- Lighthouse (desktop, local build): **100 accessibility, 100 best practices,
  100 SEO**.

## GitHub Pages

This repository deploys automatically through
`.github/workflows/deploy.yml`.

- Repository: `https://github.com/dandycrypto/mikado_website`
- Preview: `https://dandycrypto.github.io/mikado_website/`

The workflow builds with:

```
SITE_URL=https://dandycrypto.github.io/mikado_website
BASE_PATH=/mikado_website
STAGING=1
```

`BASE_PATH` rewrites root-relative URLs (assets and internal links) so the
site works from the GitHub Pages project subpath. `SITE_URL` controls the
canonical URLs, Open Graph URLs, sitemap and `llms.txt`. `STAGING=1` adds
`noindex, nofollow` and a `Disallow: /` robots file so the preview cannot
compete with the live domain.

When the site moves to `www.mikadogroup.com.au`, update the workflow:

```
SITE_URL=https://www.mikadogroup.com.au
BASE_PATH=
```

Remove `STAGING` at the same time, then add the custom domain in the
repository's Pages settings and point DNS at GitHub Pages.

## Before go-live

1. **Confirm NAP.** The site uses `03 9069 0018`. Third-party directories list a
   different number (`+61 386395857` on ZoomInfo, older `0447 814 274` snippets).
   Pick one number and update Google Business Profile, LinkedIn and directories.
2. **Photography.** The three project images are the current site's images and
   are used illustratively. Replace them with approved project photography if
   available.
3. **Careers.** No vacancies are invented. The page links to LinkedIn jobs and
   an expression of interest. Add `JobPosting` schema only when real roles are
   advertised.
4. **Forms.** The contact form opens the visitor's email client (no server, no
   data stored). If you switch to a hosted form, add a privacy policy link.
5. **Search Console.** Verify the domain in Google Search Console and Bing
   Webmaster Tools, submit `https://www.mikadogroup.com.au/sitemap.xml`, and
   request indexing for the new URLs.
6. **Redirects.** Keep the old single URL and set up 301s from any legacy paths.
   The new home is `/`; the old site had no other pages.
7. **Deploy.** Upload the contents of `dist/` to any static host (Netlify,
   Vercel, Cloudflare Pages, S3, nginx). Clean URLs work because every route is
   a directory with an `index.html`. Configure `404.html` as the not-found page.

## Notes

- The site is generated, so edit `content/` and `src/`, not `dist/`.
- `dist/` is disposable and rebuilt from source.
- The local preview server has no caching, so a rebuild is visible on refresh.
