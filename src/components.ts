import { site, services, projects, clients, principles } from "../content/site";
import { icon, arrowLink, esc } from "./layout";

export function homeHero(): string {
  return `
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Rail systems · Signalling · Project delivery</p>
        <h1>Rail systems, signalling and <em>project delivery</em> consultants</h1>
        <p class="hero-lead">Mikado Group is a Melbourne-based rail systems, signalling and project management consultancy. We support rail and infrastructure projects across Victoria, New South Wales, Queensland and South Australia, from planning and design management through to testing, commissioning and project close-out. Mikado Group is part of Nippon Koei Co., Ltd.</p>
        <div class="hero-actions">
          <a class="btn btn--primary" href="/services/">Explore our services ${icon("arrow")}</a>
          <a class="btn btn--ghost" href="/contact/">Talk to our team</a>
        </div>
      </div>
      <div class="hero-media">
        <img src="/assets/images/hero-station-1600.webp" alt="New railway station platform and tracks at dusk" width="1280" height="853" fetchpriority="high" />
        <div class="hero-badge">
          <span class="hero-badge__num">16+</span>
          <span class="hero-badge__label">level crossing removals supported since 2020</span>
        </div>
      </div>
    </div>

    <div class="hero-stats">
      <div class="hero-stat"><strong>16+</strong><span>crossing removals since 2020</span></div>
      <div class="hero-stat"><strong>All</strong><span>LXRP Alliances supported</span></div>
      <div class="hero-stat"><strong>6</strong><span>connected service disciplines</span></div>
      <div class="hero-stat"><strong>4</strong><span>states served across Australia</span></div>
    </div>
  </div>
</section>`;
}

export function pageHero(opts: {
  eyebrow: string;
  h1: string;
  lead: string;
  crumbs: { name: string; path?: string }[];
}): string {
  const crumbs = opts.crumbs
    .map((c, i) =>
      c.path
        ? `<a href="${c.path}">${esc(c.name)}</a><span aria-hidden="true">/</span>`
        : `<span aria-current="page">${esc(c.name)}</span>`,
    )
    .join("");
  return `
<section class="page-hero">
  <div class="wrap">
    <div class="page-hero__inner">
      <nav class="breadcrumbs" aria-label="Breadcrumb">${crumbs}</nav>
      <p class="eyebrow">${esc(opts.eyebrow)}</p>
      <h1>${esc(opts.h1)}</h1>
      <p class="hero-lead">${esc(opts.lead)}</p>
    </div>
  </div>
</section>`;
}

export function clientStrip(): string {
  return `
<section class="section section--tight" aria-labelledby="clients-heading">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Clients</p>
      <h2 id="clients-heading">Trusted by clients and delivery partners</h2>
      <p>Selected clients and delivery partners across Australia's rail and infrastructure sector.</p>
    </div>
    <div class="logo-wall">
      ${clients
        .map(
          (c) => `
      <div class="logo-wall__item">
        <img src="${c.logo}" alt="${esc(c.name)}" loading="lazy" />
      </div>`,
        )
        .join("")}
    </div>
  </div>
</section>`;
}

export function serviceGrid(): string {
  return `
<div class="grid grid--3">
  ${services
    .map(
      (s) => `
  <article class="card service-card">
    <div class="card__icon">${icon(s.icon)}</div>
    <h3><a href="/services/${s.slug}/">${esc(s.name)}</a></h3>
    <p>${esc(s.short)}</p>
    ${arrowLink(`Explore ${s.name.toLowerCase()}`, `/services/${s.slug}/`)}
  </article>`,
    )
    .join("")}
</div>`;
}

export function projectGrid(): string {
  return `
<div class="grid grid--3">
  ${projects
    .map(
      (p) => `
  <a class="project-card" href="/projects/${p.slug}/">
    <div class="project-card__media">
      <img src="${p.image}" alt="${esc(p.imageAlt)}" width="800" height="600" loading="lazy" />
    </div>
    <div class="project-card__body">
      <span class="project-card__tag">${esc(p.client)}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.short)}</p>
      <span class="link-arrow">View project ${icon("arrow")}</span>
    </div>
  </a>`,
    )
    .join("")}
</div>`;
}

export function principlesGrid(): string {
  return `
<div class="grid grid--4">
  ${principles
    .map(
      (p) => `
  <article class="principle">
    <div class="card__icon">${icon(p.icon)}</div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.body)}</p>
  </article>`,
    )
    .join("")}
</div>`;
}

export function partnerSection(): string {
  return `
<div class="partner-card">
  <img src="/assets/brand/group-combo.png" alt="ID&E Group, Mikado Group and Nippon Koei Mobility" width="1273" height="217" loading="lazy" />
  <div>
    <p class="eyebrow">Part of Nippon Koei</p>
    <h3>Australian rail delivery, backed by global rail expertise</h3>
    <p>In June 2026, Nippon Koei Co., Ltd. acquired a majority stake in Mikado Rail Pty Ltd (Mikado Group). Mikado continues to operate under Managing Director Michael Lattouf, with access to Nippon Koei's international railway consultancy capability.</p>
    <p>The partnership adds group experience in CBTC, ETCS, high-speed rail, power systems, technical assurance and rolling stock to Mikado's local rail systems and project delivery team.</p>
    ${arrowLink("Read the announcement", "/news/mikado-group-joins-nippon-koei/")}
  </div>
</div>`;
}

export function ausrailNotice(dark = true): string {
  return `
<div class="notice">
  <div>
    <span class="notice__label">${icon("pin")} AusRAIL 2026</span>
    <p><strong>Meet Mikado Group at Booth ${site.ausrail.booth}</strong> — ${site.ausrail.venue}, ${site.ausrail.displayDates}.</p>
  </div>
  <a class="btn btn--sm ${dark ? "btn--ghost" : "btn--primary"}" href="/ausrail-2026/">Plan your visit ${icon("arrow")}</a>
</div>`;
}

export function faqBlock(faqs: { q: string; a: string }[], heading = "Frequently asked questions"): string {
  if (!faqs.length) return "";
  return `
<div class="faq">
  ${faqs
    .map(
      (f) => `
  <details>
    <summary>${esc(f.q)}</summary>
    <p>${esc(f.a)}</p>
  </details>`,
    )
    .join("")}
</div>`;
}

export function ctaBand(opts?: { title?: string; text?: string; primary?: string; primaryHref?: string }): string {
  return `
<section class="cta-band">
  <div class="wrap cta-band__inner">
    <div>
      <h2>${esc(opts?.title || "Have a rail project to deliver?")}</h2>
      <p>${esc(opts?.text || "Talk to our team about signalling, rail systems, traction power, train control, OCS or project delivery support.")}</p>
    </div>
    <div class="hero-actions">
      <a class="btn btn--primary" href="${opts?.primaryHref || "/contact/"}">${esc(opts?.primary || "Talk to us")} ${icon("arrow")}</a>
      <a class="btn btn--ghost" href="/services/">Our services</a>
    </div>
  </div>
</section>`;
}

export function answerBlock(text: string, dark = false): string {
  return `<p class="answer${dark ? " answer--dark" : ""}">${esc(text)}</p>`;
}
