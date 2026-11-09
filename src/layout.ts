import { site, nav, services } from "../content/site";

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const icons: Record<string, string> = {
  signal:
    '<rect x="8" y="3" width="8" height="18" rx="4"/><circle cx="12" cy="8" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="16" r="1"/>',
  network:
    '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 11l10-4M7 13l10 4"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
  control:
    '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M7 9h4M7 12h7"/>',
  comms:
    '<path d="M4.5 11a7.5 7.5 0 0 1 15 0"/><path d="M8 11a4 4 0 0 1 8 0"/><circle cx="12" cy="11" r="1.4"/><path d="M12 14v6"/>',
  clipboard:
    '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M9 11h6M9 15h4"/>',
  route:
    '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h7"/>',
  spark:
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  pin: '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  linkedin:
    '<path d="M6.5 9.5v8M6.5 6.6v.1M11 17.5v-8M11 13.2c0-2 1.3-3.2 3.1-3.2 1.9 0 3 1.2 3 3.4v4.1"/>',
};

export function icon(name: string, cls = "icon"): string {
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.arrow}</svg>`;
}

export function arrowLink(label: string, href: string, cls = "link-arrow", ariaLabel?: string): string {
  const aria = ariaLabel ? ` aria-label="${esc(ariaLabel)}"` : "";
  return `<a class="${cls}" href="${href}"${aria}>${esc(label)}${icon("arrow")}</a>`;
}

export function logo(cls = "brand__logo", file = "mikado-logo-blue.png", alt = "Mikado Group"): string {
  return `<img class="${cls}" src="/assets/brand/${file}" alt="${esc(alt)}" width="1487" height="1191" decoding="async" />`;
}

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    identifier: `ABN ${site.abn}`,
    url: `${site.url}/`,
    logo: `${site.url}/assets/brand/favicon.png`,
    image: `${site.url}${site.ogImage}`,
    description:
      "Mikado Group is an Australian rail systems, signalling and project management consultancy supporting rail and infrastructure programs across Victoria, New South Wales, Queensland and South Australia.",
    telephone: "+61 3 9069 0018",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceAreas.map((name) => ({ "@type": "State", name })),
    sameAs: [site.linkedin, "https://en.railmarket.com/ap/profile/mikado-group"],
    parentOrganization: {
      "@type": "Organization",
      name: site.parent.name,
      url: site.parent.url,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+61 3 9069 0018",
      email: site.email,
      contactType: "sales",
      areaServed: "AU",
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Rail engineering and project services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${site.url}/services/${s.slug}/`,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    description: site.tagline,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-AU",
  };
}

export function breadcrumbSchema(path: string, name: string, parents: { name: string; path: string }[] = []) {
  const items = [
    { name: "Home", path: "/" },
    ...parents,
    ...(path === "/" ? [] : [{ name, path }]),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

type LayoutOptions = {
  path: string;
  title: string;
  description: string;
  body: string;
  schema?: object[];
  ogImage?: string;
  active?: string;
  bodyClass?: string;
};

export function layout(opts: LayoutOptions): string {
  const canonical = `${site.url}${opts.path}`;
  const ogImage = `${site.url}${opts.ogImage || site.ogImage}`;
  const schemas = [orgSchema(), websiteSchema(), ...(opts.schema || [])];

  const navLinks = nav
    .map((item) => {
      const isActive =
        opts.active === item.href ||
        (item.href !== "/" && opts.path.startsWith(item.href));
      return `<a href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}" />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<meta name="theme-color" content="#0D253C" />
<meta name="geo.region" content="AU-VIC" />
<meta name="geo.placename" content="Melbourne" />
<link rel="icon" type="image/png" href="/assets/brand/favicon.png" />
<link rel="apple-touch-icon" href="/assets/brand/favicon.png" />

<link rel="preload" href="/assets/fonts/inter-400-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/bricolage-grotesque-700-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/assets/fonts/fonts.css" />
<link rel="stylesheet" href="/assets/styles.css" />

<meta property="og:site_name" content="${site.name}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_AU" />
<meta property="og:title" content="${esc(opts.title)}" />
<meta property="og:description" content="${esc(opts.description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(opts.title)}" />
<meta name="twitter:description" content="${esc(opts.description)}" />
<meta name="twitter:image" content="${ogImage}" />

${schemas
  .map(
    (s) =>
      `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, "\\u003c")}</script>`,
  )
  .join("\n")}
</head>
<body class="${opts.bodyClass || ""}">
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" data-header>
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="Mikado Group home">
      ${logo("brand__logo brand__logo--header")}
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
      <span></span><span></span><span></span>
      <span class="sr-only">Menu</span>
    </button>
    <nav class="nav" id="site-nav" data-nav>
      ${navLinks}
      <a class="btn btn--sm btn--primary nav-cta" href="/contact/">Talk to us</a>
    </nav>
  </div>
</header>

<main id="main">
${opts.body}
</main>

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand brand--footer" href="/" aria-label="Mikado Group home">
        ${logo("brand__logo brand__logo--stacked")}
      </a>
      <p class="footer-tagline">${site.tagline}</p>
      <p class="footer-note">Rail systems, signalling and project delivery consultants. Part of ${site.parent.name} and the ${site.parent.group}.</p>
      <a class="footer-social" href="${site.linkedin}" rel="noopener" target="_blank">${icon("linkedin")} LinkedIn</a>
    </div>

    <div class="footer-col">
      <h2>Services</h2>
      <ul>
        ${services.map((s) => `<li><a href="/services/${s.slug}/">${esc(s.name)}</a></li>`).join("\n        ")}
      </ul>
    </div>

    <div class="footer-col">
      <h2>Company</h2>
      <ul>
        <li><a href="/about/">About</a></li>
        <li><a href="/projects/">Projects</a></li>
        <li><a href="/careers/">Careers</a></li>
        <li><a href="/ausrail-2026/">AusRAIL 2026</a></li>
        <li><a href="/news/mikado-group-joins-nippon-koei/">News</a></li>
      </ul>
    </div>

    <div class="footer-col footer-contact">
      <h2>Contact</h2>
      <address>
        <span>${site.address.street}<br />${site.address.locality} ${site.address.region} ${site.address.postcode}</span>
        <a href="tel:${site.phoneHref}">${site.phone}</a>
        <a href="mailto:${site.email}">${site.email}</a>
      </address>
    </div>
  </div>

  <div class="wrap footer-bottom">
    <p>© <span data-year>2026</span> ${site.name}. All rights reserved.</p>
    <p class="footer-legal">${site.legalName} · ABN ${site.abn}</p>
    <p class="footer-parent">Part of <a href="${site.parent.url}" rel="noopener" target="_blank">${site.parent.name}</a> · ${site.parent.group}</p>
  </div>
</footer>

<script src="/assets/main.js" defer></script>
</body>
</html>`;
}
