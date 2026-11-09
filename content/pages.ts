import { site, services, projects, clients } from "./site";
import {
  homeHero,
  pageHero,
  clientStrip,
  serviceGrid,
  projectGrid,
  principlesGrid,
  partnerSection,
  ausrailNotice,
  faqBlock,
  ctaBand,
} from "../src/components";
import { breadcrumbSchema, faqSchema, esc, icon, arrowLink } from "../src/layout";

export type BuiltPage = {
  path: string;
  title: string;
  description: string;
  active?: string;
  ogImage?: string;
  schema: object[];
  body: string;
};

const homeFaqs = [
  {
    q: "What does Mikado Group do?",
    a: "Mikado Group is a project management and engineering consultancy to the Australian rail and infrastructure sectors. Its capability covers rail systems, railway signalling, traction power and OHLE, train control systems, operational control systems and communications, and project and design management.",
  },
  {
    q: "Where does Mikado Group work?",
    a: "Mikado Group is headquartered in Melbourne and supports projects across Victoria, New South Wales, Queensland and South Australia.",
  },
  {
    q: "Is Mikado Group part of Nippon Koei?",
    a: "Yes. In June 2026, Nippon Koei Co., Ltd. acquired a majority stake in Mikado Rail Pty Ltd (Mikado Group). Mikado continues to operate under Managing Director Michael Lattouf as part of the ID&E Group.",
  },
  {
    q: "Can Mikado Group mobilise at short notice?",
    a: "Mikado Group is structured to mobilise specialist resources quickly into client and alliance teams. The company describes itself as able to come onboard anytime, anywhere to accommodate a client's changing needs.",
  },
];

const serviceCopy: Record<string, string> = {
  "railway-signalling-design": `
    <p>Signalling is the control layer of a railway. It determines how trains are separated, how routes are set, and how the network operates safely and efficiently.</p>
    <p>Mikado Group supports signalling delivery inside client and alliance teams. Our signalling design management experience includes the Level Crossing Removal Program, where we have contributed to every LXRP Alliance across more than 16 crossing removals since 2020.</p>
    <p>We work alongside civil, structures, traction power, communications and commissioning teams so that interfaces are visible and design releases match the construction sequence.</p>
    <p>Our signalling capability connects to the wider Nippon Koei group, giving clients access to international experience in CBTC, ETCS and high-speed rail.</p>`,
  "rail-systems-engineering": `
    <p>Rail systems engineering is about making individual systems work as one railway. Signalling, traction power, train control, communications and operational control systems all have to meet at defined interfaces.</p>
    <p>Mikado Group provides rail systems engineering and technical leadership within project and alliance teams. On Victoria's VIDA rail initiatives, our people have provided technical leads for rail systems, alongside program and project management and initiative coordination.</p>
    <p>Our capability connects to the wider Nippon Koei group, which brings international experience in CBTC, ETCS and high-speed rail.</p>`,
  "traction-power-ohle": `
    <p>Electric railways depend on traction power and overhead line equipment to move trains. The discipline covers the conductors, masts, foundations, substations and electrical interfaces that supply the network.</p>
    <p>Mikado Group has delivered overhead wiring and HV substation design as part of the Level Crossing Removal Program, across more than 16 crossing removals since 2020.</p>
    <p>Traction power interfaces closely with signalling, civil and structures. Our rail systems and project management capability is set up to manage those interfaces within a single delivery team.</p>`,
  "train-control-systems": `
    <p>Train control systems manage the movement of trains across the network. They sit alongside signalling, communications and operational control, and depend on clear system boundaries.</p>
    <p>Mikado Group supports train control and operational control system delivery on Australian rail projects. Our core delivery capability is local: rail systems, signalling, power and project delivery.</p>
    <p>Following the Nippon Koei acquisition, clients can access Nippon Koei's international experience in communications-based train control (CBTC), ETCS and high-speed rail alongside Mikado's local team.</p>`,
  "ocs-communications": `
    <p>Operational control systems connect the railway's field equipment with the people and systems that run the network. SCADA and communications are central to that link.</p>
    <p>Mikado Group delivered OCS and SCADA on the Tram Grade Separation Project in Adelaide, as part of a scope that also covered project management, interdisciplinary review, construction staging and completions.</p>
    <p>We connect control system scopes with the wider rail systems design so that interfaces are visible across disciplines.</p>`,
  "project-management": `
    <p>Complex rail programs depend on disciplined project and design management. Scope has to be defined, interfaces tracked, design releases sequenced and completion evidenced.</p>
    <p>Mikado Group mobilises project and design management resources into client and alliance teams. Our experience includes every Level Crossing Removal Alliance in Victoria, the VIDA rail initiatives, and the Tram Grade Separation Project in Adelaide.</p>
    <p>Our project managers work alongside signalling, rail systems, traction power and OCS specialists, so delivery planning is grounded in the technical scope.</p>`,
};

function servicePage(s: (typeof services)[number]): BuiltPage {
  const url = `/services/${s.slug}/`;
  const related = s.related
    .map((slug) => services.find((x) => x.slug === slug)!)
    .map((r) => `<li><a href="/services/${r.slug}/">${esc(r.name)}</a></li>`)
    .join("");

  return {
    path: url,
    title: s.title,
    description: s.description,
    active: "/services/",
    schema: [
      breadcrumbSchema(url, s.name, [{ name: "Services", path: "/services/" }]),
      faqSchema(s.faqs),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.h1,
        serviceType: s.name,
        description: s.description,
        url: `${site.url}${url}`,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: site.serviceAreas.map((name) => ({ "@type": "State", name })),
      },
    ],
    body: `
${pageHero({
  eyebrow: s.eyebrow,
  h1: s.h1,
  lead: s.lead,
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: s.name },
  ],
})}

<section class="section">
  <div class="wrap">
    <div class="split split--start">
      <div class="prose">
        <h2>What we do</h2>
        ${serviceCopy[s.slug]}
        <h3>How this connects</h3>
        <p>${esc(s.name)} is one of six connected disciplines at Mikado Group. We deliver it alongside rail systems engineering, signalling, traction power, train control, OCS and project management, so interfaces are managed within one team.</p>
      </div>
      <aside class="service-aside">
        <div class="card">
          <h3>Capabilities</h3>
          <ul class="checklist">
            ${s.capabilities.map((c) => `<li>${esc(c)}</li>`).join("\n            ")}
          </ul>
        </div>
        <div class="card">
          <h3>Related services</h3>
          <ul class="plain-list">${related}</ul>
          <a class="btn btn--dark btn--sm" href="/contact/">Discuss a project ${icon("arrow")}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Experience</p>
        <h2>Delivered inside major Australian rail programs</h2>
      </div>
      ${arrowLink("See all projects", "/projects/")}
    </div>
    ${projectGrid()}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Questions</p>
      <h2>${esc(s.name)} — common questions</h2>
    </div>
    ${faqBlock(s.faqs)}
  </div>
</section>

${ctaBand()}`,
  };
}

const relatedByProject: Record<string, string[]> = {
  "level-crossing-removal": [
    "railway-signalling-design",
    "traction-power-ohle",
    "project-management",
  ],
  "vida-rail-initiatives": [
    "rail-systems-engineering",
    "project-management",
    "railway-signalling-design",
  ],
  "tram-grade-separation": [
    "ocs-communications",
    "project-management",
    "rail-systems-engineering",
  ],
};

function projectPage(p: (typeof projects)[number]): BuiltPage {
  const url = `/projects/${p.slug}/`;
  const relatedServices = (relatedByProject[p.slug] || [])
    .map((slug) => services.find((s) => s.slug === slug)!)
    .map((s) => `<li><a href="/services/${s.slug}/">${esc(s.name)}</a></li>`)
    .join("");

  return {
    path: url,
    title: p.title,
    description: p.description,
    active: "/projects/",
    schema: [
      breadcrumbSchema(url, p.name, [{ name: "Projects", path: "/projects/" }]),
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.name,
        description: p.description,
        url: `${site.url}${url}`,
        about: p.scope.map((sc) => ({ "@type": "Thing", name: sc })),
        creator: { "@id": `${site.url}/#organization` },
        locationCreated: { "@type": "Place", name: p.client },
      },
    ],
    body: `
${pageHero({
  eyebrow: "Project experience",
  h1: p.h1,
  lead: p.lead,
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" },
    { name: p.name },
  ],
})}

<section class="section">
  <div class="wrap">
    <div class="split split--start">
      <div class="prose">
        <h2>Project overview</h2>
        <p>${esc(p.context)}</p>
        <h2>Our scope</h2>
        <ul class="checklist">
          ${p.scope.map((sc) => `<li>${esc(sc)}</li>`).join("\n          ")}
        </ul>
        <h2>How we worked</h2>
        <p>Mikado Group provided specialist resources inside the delivery team, working alongside the client, alliance partners and other disciplines. Our scope was integrated with the wider program rather than delivered as a standalone review.</p>
      </div>
      <aside class="service-aside">
        <img class="project-side-image" src="${p.image.replace("-800", "-1600")}" alt="${esc(p.imageAlt)}" width="1280" height="853" loading="lazy" />
        <div class="card">
          <h3>At a glance</h3>
          <dl class="fact-list">
            <div><dt>Location</dt><dd>${esc(p.client)}</dd></div>
            <div><dt>Disciplines</dt><dd>${p.scope.length}</dd></div>
            <div><dt>Delivery</dt><dd>Inside client and alliance teams</dd></div>
          </dl>
          <h3>Related services</h3>
          <ul class="plain-list">${relatedServices}</ul>
          <a class="btn btn--dark btn--sm" href="/contact/">Talk to us ${icon("arrow")}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">More experience</p>
        <h2>Other programs we have supported</h2>
      </div>
      ${arrowLink("All projects", "/projects/")}
    </div>
    ${projectGrid()}
  </div>
</section>

${ctaBand()}`,
  };
}

export function buildPages(): BuiltPage[] {
  return [
    {
      path: "/",
      title: "Rail Systems & Signalling Consultancy | Mikado Group",
      description:
        "Mikado Group is a Melbourne rail systems, signalling and project management consultancy delivering design management, traction power and train control across Australia.",
      schema: [faqSchema(homeFaqs)],
      body: `
${homeHero()}
${clientStrip()}

<section class="section section--paper">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Services</p>
        <h2>Specialist capability across the rail systems lifecycle</h2>
        <p>Mikado Group provides specialist resources to lead and assist with complex project delivery programs. Our capability covers six connected disciplines.</p>
      </div>
      ${arrowLink("All services", "/services/")}
    </div>
    ${serviceGrid()}
  </div>
</section>

<section class="section section--navy">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Why Mikado</p>
      <h2>A strategic partner for complex delivery</h2>
      <p>Mikado Group works as an extension of client and alliance teams. We bring specialist people, practical delivery experience and a habit of challenging how things are done.</p>
    </div>
    ${principlesGrid()}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Projects</p>
        <h2>Selected project experience</h2>
        <p>Rail systems, signalling and project delivery across Victoria and South Australia.</p>
      </div>
      ${arrowLink("All projects", "/projects/")}
    </div>
    ${projectGrid()}
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    ${partnerSection()}
    <div style="margin-top: 2rem">${ausrailNotice()}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Questions</p>
      <h2>About Mikado Group</h2>
    </div>
    ${faqBlock(homeFaqs)}
  </div>
</section>

${ctaBand()}`,
    },

    {
      path: "/services/",
      title: "Rail Engineering & Project Services | Mikado Group",
      description:
        "Rail systems, signalling, traction power, train control, OCS and project management services for Australian rail and infrastructure programs.",
      schema: [
        breadcrumbSchema("/services/", "Services"),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Rail engineering and project services",
          url: `${site.url}/services/`,
          about: { "@id": `${site.url}/#organization` },
        },
      ],
      body: `
${pageHero({
  eyebrow: "Services",
  h1: "Rail engineering and project services",
  lead: "Mikado Group provides six connected service lines across the rail systems lifecycle: railway signalling, rail systems engineering, traction power and OHLE, train control systems, operational control systems and communications, and project and design management.",
  crumbs: [{ name: "Home", path: "/" }, { name: "Services" }],
})}

<section class="section">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Capability</p>
        <h2>Specialists who work inside the delivery team</h2>
        <p>Our people mobilise into client and alliance teams, leading and assisting with complex project delivery programs from concept through to completion.</p>
      </div>
      ${arrowLink("Talk to us", "/contact/")}
    </div>
    ${serviceGrid()}
  </div>
</section>

<section class="section section--navy">
  <div class="wrap">
    <div class="split split--start">
      <div>
        <p class="eyebrow">How we work</p>
        <h2>One team across the technical interfaces</h2>
        <p>Rail projects fail at the interfaces. Signalling, power, control, communications and civil all have to line up, and the design sequence has to match construction.</p>
        <p>Because our disciplines sit together, we can staff a scope with people who already work alongside each other. That reduces the handover risk between specialists and keeps technical decisions close to delivery.</p>
        ${arrowLink("About Mikado Group", "/about/")}
      </div>
      <div>
        <div class="grid grid--2">
          <div class="principle"><div class="card__icon">${icon("route")}</div><h3>Concept to completion</h3><p>Support at any stage of the project lifecycle.</p></div>
          <div class="principle"><div class="card__icon">${icon("bolt")}</div><h3>Rapid mobilisation</h3><p>Specialist resources ready to join client and alliance teams.</p></div>
          <div class="principle"><div class="card__icon">${icon("spark")}</div><h3>Better methods</h3><p>Process improvement, systems review and challenge.</p></div>
          <div class="principle"><div class="card__icon">${icon("pin")}</div><h3>Across Australia</h3><p>Victoria, New South Wales, Queensland and South Australia.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Proof</p>
      <h2>Experience behind the capability</h2>
    </div>
    ${projectGrid()}
  </div>
</section>

${ctaBand()}`,
    },

    ...services.map(servicePage),

    {
      path: "/projects/",
      title: "Rail Project Experience in Australia | Mikado Group",
      description:
        "Mikado Group project experience across the Level Crossing Removal Program, VIDA rail initiatives and the Adelaide Tram Grade Separation Project.",
      schema: [
        breadcrumbSchema("/projects/", "Projects"),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Rail project experience",
          url: `${site.url}/projects/`,
          about: { "@id": `${site.url}/#organization` },
        },
      ],
      body: `
${pageHero({
  eyebrow: "Projects",
  h1: "Rail project experience across Australia",
  lead: "Mikado Group has supported major rail programs in Victoria and South Australia, including every Level Crossing Removal Alliance, the VIDA rail initiatives and the Tram Grade Separation Project on Adelaide's Glenelg tram line.",
  crumbs: [{ name: "Home", path: "/" }, { name: "Projects" }],
})}

<section class="section">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Selected work</p>
        <h2>Programs we have supported</h2>
        <p>Our project work spans signalling design management, overhead wiring and HV substation design, OCS and SCADA, project management and completions.</p>
      </div>
      ${arrowLink("Talk to us", "/contact/")}
    </div>
    ${projectGrid()}
  </div>
</section>

<section class="section section--navy">
  <div class="wrap">
    <div class="stats">
      <div class="stat"><strong>16+</strong><span>crossing removals supported since 2020</span></div>
      <div class="stat"><strong>All</strong><span>LXRP Alliances supported</span></div>
      <div class="stat"><strong>4</strong><span>states served across Australia</span></div>
      <div class="stat"><strong>6</strong><span>connected service disciplines</span></div>
    </div>
  </div>
</section>

${clientStrip()}

${ctaBand()}`,
    },

    ...projects.map(projectPage),

    {
      path: "/about/",
      title: "About Mikado Group | Melbourne Rail Consultancy",
      description:
        "Mikado Group is a Melbourne-based rail systems, signalling and project management consultancy, part of Nippon Koei Co., Ltd. and the ID&E Group.",
      active: "/about/",
      schema: [
        breadcrumbSchema("/about/", "About"),
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Mikado Group",
          url: `${site.url}/about/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        },
      ],
      body: `
${pageHero({
  eyebrow: "About",
  h1: "A rail consultancy built on evolution, not revolution",
  lead: "Mikado Group is a Melbourne-based project management and engineering consultancy to the Australian rail and infrastructure sectors. We support projects across Victoria, New South Wales, Queensland and South Australia, and since 2026 have been part of Nippon Koei Co., Ltd. and the ID&E Group.",
  crumbs: [{ name: "Home", path: "/" }, { name: "About" }],
})}

<section class="section">
  <div class="wrap">
    <div class="split split--start">
      <div class="prose">
        <h2>The Mikado philosophy</h2>
        <p>During the peak of rail travel in the late 19th and early 20th centuries, the Mikado was the workhorse of steam locomotives, used for everything from passenger trains to freight. A minor difference in the wheel configuration gave it the perfect combination of power, pull and speed, and enabled it to dominate the rail industry.</p>
        <p>The Mikado is proof that even the smallest changes can have a substantial impact. This message forms part of the inspiration behind the name of the Mikado Group. As we strive to solve problems, we understand that solutions are often a matter of evolution, not revolution.</p>
        <h2>What we do</h2>
        <p>Mikado Group specialises in project delivery, project planning and business consulting across the rail and infrastructure industries. We provide specialist resources to lead and assist with complex project delivery programs covering rail systems, railway signalling, traction power and OHLE, train control systems, and operational control systems and communications.</p>
        <p>We help clients develop more efficient methodologies through process improvement, systems review and by challenging the way organisations operate. With experience delivering projects from concept through to completion, we can support any stage of the project lifecycle.</p>
      </div>
      <aside class="service-aside">
        <div class="card">
          <h3>Company details</h3>
          <dl class="fact-list">
            <div><dt>Legal entity</dt><dd>${site.legalName}</dd></div>
            <div><dt>ABN</dt><dd>${site.abn}</dd></div>
            <div><dt>Head office</dt><dd>${site.address.street}, ${site.address.locality} ${site.address.region} ${site.address.postcode}</dd></div>
            <div><dt>Phone</dt><dd><a href="tel:${site.phoneHref}">${site.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
            <div><dt>Parent</dt><dd>${site.parent.name} · ${site.parent.group}</dd></div>
          </dl>
        </div>
        <div class="card">
          <h3>Leadership</h3>
          <p><strong>Michael Lattouf</strong><br />Managing Director</p>
          <p class="meta">FIEAust · EngExec · CPEng · RPEV · RPEQ · NER</p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    ${partnerSection()}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Where we work</p>
      <h2>Supporting projects across four states</h2>
      <p>Mikado Group is headquartered in Melbourne and actively supports projects in Victoria, New South Wales, Queensland and South Australia.</p>
    </div>
    <div class="grid grid--4">
      ${["Victoria", "New South Wales", "Queensland", "South Australia"]
        .map(
          (s) => `<div class="card"><div class="card__icon">${icon("pin")}</div><h3>${s}</h3><p>Rail and infrastructure project support.</p></div>`,
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Services</p>
        <h2>What we can bring to your project</h2>
      </div>
      ${arrowLink("All services", "/services/")}
    </div>
    ${serviceGrid()}
  </div>
</section>

${ctaBand()}`,
    },

    {
      path: "/careers/",
      title: "Careers in Rail Engineering | Mikado Group",
      description:
        "Work on major Australian rail programs with Mikado Group. Signalling, rail systems, traction power, train control, OCS and project delivery roles.",
      active: "/careers/",
      schema: [breadcrumbSchema("/careers/", "Careers")],
      body: `
${pageHero({
  eyebrow: "Careers",
  h1: "Build your career on rail projects that matter",
  lead: "Mikado Group is a Melbourne-based rail systems, signalling and project management consultancy. We bring specialist engineers and project professionals into major rail programs across Australia. Current opportunities are advertised through our LinkedIn page, and we welcome expressions of interest from rail professionals.",
  crumbs: [{ name: "Home", path: "/" }, { name: "Careers" }],
})}

<section class="section">
  <div class="wrap">
    <div class="split split--start">
      <div class="prose">
        <h2>Work inside the delivery team</h2>
        <p>Our people work within client and alliance teams on live rail programs, not on the sidelines. You will sit alongside signalling, rail systems, traction power, train control, OCS and project delivery specialists, solving interface problems as they come up.</p>
        <p>Mikado Group's project experience includes every Level Crossing Removal Alliance in Victoria, the VIDA rail initiatives and the Tram Grade Separation Project in Adelaide.</p>
        <h2>Disciplines we hire</h2>
        <ul class="checklist">
          <li>Railway signalling engineers and design managers</li>
          <li>Rail systems and systems integration engineers</li>
          <li>Traction power and OHLE engineers</li>
          <li>Train control, OCS and communications specialists</li>
          <li>Project managers, design managers and commissioning managers</li>
        </ul>
        <h2>Current opportunities</h2>
        <p>We advertise current openings through LinkedIn. If there is no role listed that fits your experience, send us an expression of interest and we will keep it on file.</p>
        <div class="hero-actions">
          <a class="btn btn--primary" href="${site.linkedinJobs}" rel="noopener" target="_blank">View roles on LinkedIn ${icon("external")}</a>
          <a class="btn btn--outline" href="mailto:${site.email}?subject=Expression%20of%20interest%20%E2%80%94%20Mikado%20Group">Send an expression of interest</a>
        </div>
      </div>
      <aside class="service-aside">
        <div class="card">
          <h3>What to expect</h3>
          <ul class="checklist">
            <li>Work on live rail and infrastructure programs</li>
            <li>Client and alliance team environments</li>
            <li>Exposure across rail systems disciplines</li>
            <li>Projects in Victoria, New South Wales, Queensland and South Australia</li>
          </ul>
        </div>
        <div class="card">
          <h3>Equal opportunity</h3>
          <p>Mikado Group maintains an Equality and Non-Discrimination Policy and a Domestic and Family Violence Policy as part of its people and culture framework.</p>
          <a class="link-arrow" href="/about/">About Mikado Group ${icon("arrow")}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

${ctaBand({
  title: "Not seeing the right role?",
  text: "Send an expression of interest and tell us what you bring to rail delivery.",
  primary: "Email our team",
  primaryHref: `mailto:${site.email}?subject=Expression%20of%20interest%20%E2%80%94%20Mikado%20Group`,
})}`,
    },

    {
      path: "/contact/",
      title: "Contact Mikado Group | Melbourne Rail Consultancy",
      description:
        "Contact Mikado Group in Melbourne to discuss rail systems, signalling, traction power, train control, OCS or project delivery support across Australia.",
      active: "/contact/",
      schema: [
        breadcrumbSchema("/contact/", "Contact"),
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Mikado Group",
          url: `${site.url}/contact/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        },
      ],
      body: `
${pageHero({
  eyebrow: "Contact",
  h1: "Talk to our rail team",
  lead: "Mikado Group is based in Melbourne's CBD and supports rail and infrastructure projects across Victoria, New South Wales, Queensland and South Australia. Contact us to discuss signalling, rail systems, traction power, train control, OCS or project delivery support.",
  crumbs: [{ name: "Home", path: "/" }, { name: "Contact" }],
})}

<section class="section">
  <div class="wrap">
    <div class="contact-grid">
      <div>
        <h2>Send us a message</h2>
        <p>Tell us about your project, the discipline you need and the stage you are at. We will respond from our Melbourne office.</p>
        <form class="form" data-contact-form>
          <div class="form-row">
            <div class="field">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" required />
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="org">Organisation</label>
              <input id="org" name="org" type="text" autocomplete="organization" />
            </div>
            <div class="field">
              <label for="interest">What do you need?</label>
              <select id="interest" name="interest">
                <option>Railway signalling</option>
                <option>Rail systems engineering</option>
                <option>Traction power and OHLE</option>
                <option>Train control systems</option>
                <option>OCS and communications</option>
                <option>Project and design management</option>
                <option>Careers</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button class="btn btn--primary" type="submit">Send message ${icon("arrow")}</button>
          <p class="form-note">This form opens your email client with the details filled in. You can also email <a href="mailto:${site.email}">${site.email}</a> or call <a href="tel:${site.phoneHref}">${site.phone}</a>.</p>
          <p class="form-note" data-form-status role="status" aria-live="polite"></p>
        </form>
      </div>
      <aside>
        <div class="card">
          <h3>Melbourne office</h3>
          <ul class="contact-list">
            <li><span class="contact-list__label">Address</span><address>${site.address.street}<br />${site.address.locality} ${site.address.region} ${site.address.postcode}, Australia</address></li>
            <li><span class="contact-list__label">Phone</span><a href="tel:${site.phoneHref}">${site.phone}</a></li>
            <li><span class="contact-list__label">Email</span><a href="mailto:${site.email}">${site.email}</a></li>
            <li><span class="contact-list__label">LinkedIn</span><a href="${site.linkedin}" rel="noopener" target="_blank">Mikado Group on LinkedIn</a></li>
            <li><span class="contact-list__label">Legal entity</span>${site.legalName} · ABN ${site.abn}</li>
          </ul>
          <a class="btn btn--outline btn--sm" href="${site.mapUrl}" rel="noopener" target="_blank">Open in Google Maps ${icon("external")}</a>
        </div>
        <div class="card" style="margin-top: 1rem">
          <h3>Attending AusRAIL 2026?</h3>
          <p>Visit Mikado Group at Booth ${site.ausrail.booth}, ${site.ausrail.venue}, ${site.ausrail.displayDates}.</p>
          <a class="link-arrow" href="/ausrail-2026/">Plan your visit ${icon("arrow")}</a>
        </div>
      </aside>
    </div>
  </div>
</section>`,
    },

    {
      path: "/ausrail-2026/",
      title: "Meet Mikado Group at AusRAIL 2026 | Booth 25",
      description:
        "Visit Mikado Group at AusRAIL 2026, Booth 25, Brisbane Convention & Exhibition Centre, 23–25 November 2026. Meet our rail systems, signalling and project delivery team.",
      schema: [
        breadcrumbSchema("/ausrail-2026/", "AusRAIL 2026"),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Meet Mikado Group at AusRAIL 2026",
          url: `${site.url}/ausrail-2026/`,
          about: { "@id": `${site.url}/#organization` },
          mentions: {
            "@type": "Event",
            name: "AusRAIL 2026",
            startDate: site.ausrail.start,
            endDate: site.ausrail.end,
            location: {
              "@type": "Place",
              name: site.ausrail.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Brisbane",
                addressRegion: "QLD",
                addressCountry: "AU",
              },
            },
            organizer: { "@type": "Organization", name: "Australasian Railway Association" },
          },
        },
      ],
      body: `
${pageHero({
  eyebrow: "AusRAIL 2026",
  h1: "Meet Mikado Group at AusRAIL 2026",
  lead: "Mikado Group is exhibiting at AusRAIL 2026, the Australasian Railway Association's national conference and exhibition. Visit Booth 25 at the Brisbane Convention & Exhibition Centre from 23 to 25 November 2026 to meet our rail systems, signalling and project delivery team.",
  crumbs: [{ name: "Home", path: "/" }, { name: "AusRAIL 2026" }],
})}

<section class="section">
  <div class="wrap">
    <div class="split split--start">
      <div class="prose">
        <h2>Where to find us</h2>
        <p>AusRAIL 2026 runs from Monday 23 November to Wednesday 25 November 2026 at the Brisbane Convention & Exhibition Centre.</p>
        <p>Mikado Group will be on Booth 25. Come and talk to us about signalling design management, rail systems engineering, traction power and OHLE, train control, OCS and communications, or project and design management.</p>
        <h2>What to discuss</h2>
        <ul class="checklist">
          <li>Signalling design management and testing and commissioning</li>
          <li>Rail systems engineering and interface management</li>
          <li>Traction power, overhead wiring and HV substation design</li>
          <li>Train control, OCS, SCADA and communications</li>
          <li>Project, design and delivery management</li>
          <li>How the Nippon Koei group extends our capability</li>
        </ul>
        <h2>Book a meeting</h2>
        <p>If you would like to lock in a time during AusRAIL, email us with your preferred day and topic and we will confirm a slot on Booth 25.</p>
        <div class="hero-actions">
          <a class="btn btn--primary" href="mailto:${site.email}?subject=AusRAIL%202026%20meeting%20request">Request a meeting ${icon("arrow")}</a>
          <a class="btn btn--outline" href="${site.ausrail.exhibitorUrl}" rel="noopener" target="_blank">AusRAIL exhibitor listing ${icon("external")}</a>
        </div>
      </div>
      <aside class="service-aside">
        <div class="card">
          <h3>Event details</h3>
          <dl class="fact-list">
            <div><dt>Event</dt><dd>${site.ausrail.name}</dd></div>
            <div><dt>Dates</dt><dd>${site.ausrail.displayDates}</dd></div>
            <div><dt>Venue</dt><dd>${site.ausrail.venue}</dd></div>
            <div><dt>Location</dt><dd>${site.ausrail.city}</dd></div>
            <div><dt>Mikado stand</dt><dd>Booth ${site.ausrail.booth}</dd></div>
          </dl>
          <a class="btn btn--outline btn--sm" href="${site.ausrail.url}" rel="noopener" target="_blank">Official AusRAIL site ${icon("external")}</a>
        </div>
        <div class="card">
          <h3>Before the event</h3>
          <p>Read how Mikado Group supports rail systems and signalling delivery across Australia.</p>
          <a class="link-arrow" href="/services/">Our services ${icon("arrow")}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">At the stand</p>
      <h2>Talk to the people doing the work</h2>
      <p>Our team works inside client and alliance teams on live rail programs. Bring us the interface problem, the scope you are trying to staff, or the program you are planning to deliver.</p>
    </div>
    ${projectGrid()}
  </div>
</section>

${ctaBand({
  title: "Can't make AusRAIL?",
  text: "We are happy to talk before or after the event. Contact our Melbourne office.",
  primary: "Contact us",
})}`,
    },

    {
      path: "/news/",
      title: "News & Announcements | Mikado Group",
      description:
        "News and announcements from Mikado Group, including the Nippon Koei acquisition and our exhibitor presence at AusRAIL 2026 in Brisbane.",
      schema: [breadcrumbSchema("/news/", "News")],
      body: `
${pageHero({
  eyebrow: "News",
  h1: "News and announcements",
  lead: "Company news from Mikado Group, including the Nippon Koei acquisition and our presence at AusRAIL 2026.",
  crumbs: [{ name: "Home", path: "/" }, { name: "News" }],
})}

<section class="section">
  <div class="wrap">
    <div class="grid grid--2">
      <a class="project-card" href="/news/mikado-group-joins-nippon-koei/">
        <div class="project-card__media project-card__media--brand">
          <img src="/assets/brand/group-combo.png" alt="ID&E Group, Mikado Group and Nippon Koei Mobility" width="1273" height="217" loading="lazy" />
        </div>
        <div class="project-card__body">
          <span class="project-card__tag">June 2026</span>
          <h3>Mikado Group joins Nippon Koei</h3>
          <p>Nippon Koei Co., Ltd. acquired a majority stake in Mikado Group, adding global rail expertise to our Australian delivery team.</p>
          <span class="link-arrow">Read the announcement ${icon("arrow")}</span>
        </div>
      </a>
      <a class="project-card" href="/ausrail-2026/">
        <div class="project-card__media">
          <img src="/assets/images/project-corridor-800.webp" alt="Rail corridor and train" width="800" height="600" loading="lazy" />
        </div>
        <div class="project-card__body">
          <span class="project-card__tag">23–25 November 2026</span>
          <h3>Meet us at AusRAIL 2026</h3>
          <p>Visit Mikado Group at Booth 25, Brisbane Convention & Exhibition Centre, for the ARA's national rail conference and exhibition.</p>
          <span class="link-arrow">Event details ${icon("arrow")}</span>
        </div>
      </a>
    </div>
  </div>
</section>

${ctaBand()}`,
    },

    {
      path: "/news/mikado-group-joins-nippon-koei/",
      title: "Mikado Group joins Nippon Koei | Mikado Group",
      description:
        "In June 2026, Nippon Koei Co., Ltd. acquired a majority stake in Mikado Group, strengthening railway consultancy in Australia and adding global rail expertise.",
      schema: [
        breadcrumbSchema("/news/mikado-group-joins-nippon-koei/", "Mikado Group joins Nippon Koei", [
          { name: "News", path: "/news/" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: "Mikado Group joins Nippon Koei",
          description:
            "Nippon Koei Co., Ltd. acquired a majority stake in Mikado Rail Pty Ltd (Mikado Group) in June 2026.",
          datePublished: "2026-06-21",
          dateModified: "2026-11-09",
          author: { "@id": `${site.url}/#organization` },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/news/mikado-group-joins-nippon-koei/`,
          about: { "@id": `${site.url}/#organization` },
        },
      ],
      body: `
${pageHero({
  eyebrow: "News",
  h1: "Mikado Group joins Nippon Koei",
  lead: "In June 2026, Nippon Koei Co., Ltd. acquired a majority stake in Mikado Rail Pty Ltd (Mikado Group), strengthening its railway consultancy presence in Australia. Mikado Group continues to operate under Managing Director Michael Lattouf.",
  crumbs: [
    { name: "Home", path: "/" },
    { name: "News", path: "/news/" },
    { name: "Mikado Group joins Nippon Koei" },
  ],
})}

<section class="section">
  <div class="wrap">
    <article class="prose">
      <p class="meta"><span>June 2026</span><span>·</span><span>Mikado Group</span></p>
      <p>Japanese engineering consultancy Nippon Koei Co., Ltd. has acquired a majority stake in Melbourne-based railway systems specialist Mikado Rail Pty Ltd (Mikado Group). Nippon Koei is a subsidiary of ID&E Holdings.</p>
      <p>The acquisition brings Mikado Group into Nippon Koei's global rail portfolio. Mikado Group will continue to be led by Michael Lattouf as Managing Director, with Nippon Koei Group appointments strengthening the board.</p>
      <h2>What it means for clients</h2>
      <p>Mikado Group's local delivery team remains in place across rail systems, signalling, power, control systems and project delivery. The partnership adds access to Nippon Koei's international railway consultancy experience, including:</p>
      <ul>
        <li>Advanced signalling and train control systems</li>
        <li>Communication-based train control (CBTC) and ETCS</li>
        <li>High-capacity and high-speed rail</li>
        <li>Power systems, environmental consulting and architecture</li>
        <li>Technical assurance and rolling stock</li>
      </ul>
      <h2>Local delivery, global backing</h2>
      <p>Mikado Group has supported the delivery of major projects across Victoria, New South Wales and South Australia, including the Level Crossing Removal Program, Regional Rail Revival and the Tram Grade Separation Project.</p>
      <blockquote>
        <p>Mikado's project experience in Australia now sits alongside Nippon Koei's international railway capability, giving clients a local team with access to global expertise.</p>
      </blockquote>
      <h2>Source</h2>
      <p>Read the original report: <a href="https://www.railexpress.com.au/nippon-koei-acquires-mikado-group-to-expand-railway-consultancy-in-australia/" rel="noopener" target="_blank">Rail Express — Nippon Koei acquires Mikado Group to expand railway consultancy in Australia</a>.</p>
      <p>For project enquiries, <a href="/contact/">contact our Melbourne office</a>.</p>
    </article>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Related</p>
      <h2>Our services</h2>
    </div>
    ${serviceGrid()}
  </div>
</section>

${ctaBand()}`,
    },
  ];
}
