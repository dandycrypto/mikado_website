/**
 * Single source of truth for the Mikado Group site.
 * Every fact here is taken from the current public site, Mikado Group's public
 * LinkedIn company page, the AusRAIL 2026 exhibitor listing, ABN Lookup, or
 * Rail Express reporting on the Nippon Koei acquisition. Nothing is invented.
 */

export const site = {
  name: "Mikado Group",
  legalName: "Mikado Rail Pty Ltd",
  abn: "41 693 662 118",
  // Override at build time for staging/preview deployments.
  url: (process.env.SITE_URL || "https://www.mikadogroup.com.au").replace(/\/$/, ""),
  tagline: "Providing solutions to your projects",
  phone: "03 9069 0018",
  phoneHref: "+61390690018",
  email: "info@mikadogroup.com.au",
  address: {
    street: "Level 14, 333 Collins Street",
    locality: "Melbourne",
    region: "VIC",
    postcode: "3000",
    country: "AU",
  },
  mapUrl: "https://maps.app.goo.gl/KExXLHAmnNUEhBXB8",
  linkedin: "https://www.linkedin.com/company/mikadogroup/",
  linkedinJobs: "https://www.linkedin.com/company/mikadogroup/jobs/",
  parent: {
    name: "Nippon Koei Co., Ltd.",
    group: "ID&E Group",
    url: "https://www.nk-mobility.com",
  },
  ausrail: {
    name: "AusRAIL 2026",
    booth: "25",
    venue: "Brisbane Convention & Exhibition Centre",
    city: "Brisbane, Queensland",
    start: "2026-11-23",
    end: "2026-11-25",
    displayDates: "23–25 November 2026",
    url: "https://ausrail.com/",
    exhibitorUrl: "https://ausrail.com/01/mikado-group/",
  },
  serviceAreas: ["Victoria", "New South Wales", "Queensland", "South Australia"],
  ogImage: "/assets/images/og-default.jpg",
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  capabilities: string[];
  related: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "railway-signalling-design",
    name: "Railway signalling",
    short: "Signalling design, design management and commissioning support.",
    icon: "signal",
    title: "Railway Signalling Design & Management | Mikado Group",
    description:
      "Railway signalling design and design management for Australian rail projects. Mikado Group supports signalling scope from concept through to testing and commissioning.",
    h1: "Railway signalling design and design management",
    eyebrow: "Signalling",
    lead:
      "Mikado Group provides railway signalling design and signalling design management for rail projects across Australia. Our signalling specialists support design development, review and assurance, and testing and commissioning management, working inside alliance and client delivery teams from concept through to handover.",
    capabilities: [
      "Signalling design management",
      "Signalling design development and review",
      "Testing and commissioning management",
      "Design assurance and interdisciplinary review",
      "Interface management across rail systems",
    ],
    related: ["rail-systems-engineering", "train-control-systems", "project-management"],
    faqs: [
      {
        q: "What does a signalling design manager do on a rail project?",
        a: "A signalling design manager coordinates the signalling design scope across disciplines, consultants and construction teams. That includes scope definition, design review, interface management, assurance evidence and the sequence of design release through to testing and commissioning.",
      },
      {
        q: "Has Mikado Group delivered signalling work on major projects?",
        a: "Yes. Mikado Group has provided signalling design management on the Level Crossing Removal Program in Victoria, contributing to every LXRP Alliance across more than 16 crossing removals since 2020.",
      },
      {
        q: "Do you provide signalling support outside Victoria?",
        a: "Yes. Mikado Group supports projects across Victoria, New South Wales, Queensland and South Australia.",
      },
    ],
  },
  {
    slug: "rail-systems-engineering",
    name: "Rail systems engineering",
    short: "Systems engineering, integration and technical advisory.",
    icon: "network",
    title: "Rail Systems Engineering Consultancy | Mikado Group",
    description:
      "Rail systems engineering and integration for complex Australian rail programs. Mikado Group manages technical interfaces across signalling, power, control and communications.",
    h1: "Rail systems engineering and integration",
    eyebrow: "Rail systems",
    lead:
      "Mikado Group provides rail systems engineering for complex rail and infrastructure programs. We bring signalling, traction power, train control, communications and operational control systems together, managing technical interfaces and supporting design, delivery and commissioning across Australia.",
    capabilities: [
      "Rail systems engineering",
      "Systems integration and interface management",
      "Technical advisory and design review",
      "Requirements and assurance support",
      "Testing and commissioning support",
    ],
    related: ["railway-signalling-design", "traction-power-ohle", "ocs-communications"],
    faqs: [
      {
        q: "What is rail systems engineering?",
        a: "Rail systems engineering coordinates the technical systems that make a railway work together, including signalling, traction power, train control, communications and operational control. It focuses on requirements, interfaces, integration and assurance across the project lifecycle.",
      },
      {
        q: "How does Mikado Group work with client teams?",
        a: "Mikado Group provides specialist resources that mobilise into client, alliance and contractor teams. Our people lead and assist with complex project delivery programs rather than working only as an external reviewer.",
      },
      {
        q: "Which rail systems does Mikado Group cover?",
        a: "Our stated capability covers rail systems, railway signalling, traction power and OHLE, train control systems, and operational control systems and communications.",
      },
    ],
  },
  {
    slug: "traction-power-ohle",
    name: "Traction power & OHLE",
    short: "Overhead wiring, HV substation and traction power design.",
    icon: "bolt",
    title: "Traction Power & OHLE Design | Mikado Group",
    description:
      "Traction power and overhead line equipment (OHLE) design support for Australian rail projects, including overhead wiring and HV substation design.",
    h1: "Traction power and overhead line (OHLE) design",
    eyebrow: "Traction power",
    lead:
      "Mikado Group delivers traction power and overhead wiring design support for rail and infrastructure projects. Our capability covers overhead wiring and HV substation design, delivered alongside signalling, systems and project management teams on major Australian rail programs.",
    capabilities: [
      "Overhead wiring design",
      "HV substation design",
      "Traction power systems",
      "Design management and review",
      "Interface management with signalling and civil",
    ],
    related: ["rail-systems-engineering", "railway-signalling-design", "project-management"],
    faqs: [
      {
        q: "What is OHLE?",
        a: "OHLE stands for overhead line equipment, also called overhead wiring or OCS. It is the system that delivers traction power to electric trains through overhead conductors, masts, foundations and associated electrical infrastructure.",
      },
      {
        q: "Where has Mikado Group delivered overhead wiring design?",
        a: "Mikado Group has delivered overhead wiring and HV substation design as part of its work on the Level Crossing Removal Program in Victoria, across more than 16 crossing removals since 2020.",
      },
      {
        q: "Do you work with signalling and civil teams?",
        a: "Yes. Traction power and OHLE interfaces closely with signalling, civil, structures and commissioning. Mikado Group's rail systems and project management capability is set up to manage those interfaces.",
      },
    ],
  },
  {
    slug: "train-control-systems",
    name: "Train control systems",
    short: "TCS delivery support, with group access to ETCS and CBTC.",
    icon: "control",
    title: "Train Control Systems (TCS, ETCS, CBTC) | Mikado Group",
    description:
      "Train control system delivery support for Australian rail, with access through Nippon Koei to international ETCS, CBTC and high-speed rail expertise.",
    h1: "Train control systems (TCS, ETCS and CBTC)",
    eyebrow: "Train control",
    lead:
      "Mikado Group supports train control and operational control system delivery on Australian rail projects. Through the Nippon Koei group, clients can also access international expertise in communications-based train control (CBTC), ETCS and high-speed rail.",
    capabilities: [
      "Train control systems (TCS)",
      "Operational control systems and communications interfaces",
      "Systems integration",
      "Testing and commissioning",
      "Group access to CBTC, ETCS and high-speed rail expertise",
    ],
    related: ["rail-systems-engineering", "ocs-communications", "railway-signalling-design"],
    faqs: [
      {
        q: "What is the difference between TCS, ETCS and CBTC?",
        a: "TCS is the broad term for train control systems. ETCS is the European Train Control System, a standard for interoperable signalling and train protection. CBTC is communications-based train control, which uses continuous communication between trains and the network to manage movement.",
      },
      {
        q: "Does Mikado Group deliver ETCS and CBTC projects directly?",
        a: "Mikado Group's core delivery capability is in Australian rail systems, signalling and project delivery. Following the Nippon Koei acquisition, clients can access Nippon Koei's international experience in CBTC, ETCS and high-speed rail alongside Mikado's local delivery team.",
      },
      {
        q: "Can you support operational control systems too?",
        a: "Yes. Mikado Group's capability includes operational control systems (OCS), SCADA and communications, delivered as part of rail systems and project delivery scopes.",
      },
    ],
  },
  {
    slug: "ocs-communications",
    name: "OCS & communications",
    short: "Operational control systems, SCADA and communications.",
    icon: "comms",
    title: "Operational Control Systems & Comms | Mikado Group",
    description:
      "Operational control systems, SCADA and communications support for rail projects. Mikado Group connects control systems with wider rail systems design.",
    h1: "Operational control systems (OCS) and communications",
    eyebrow: "OCS & communications",
    lead:
      "Mikado Group delivers operational control systems, SCADA and communications support for rail and infrastructure projects. We work across project management, interdisciplinary review, construction staging and completions, connecting control systems with the wider rail systems design.",
    capabilities: [
      "Operational control systems (OCS)",
      "SCADA",
      "Communications systems",
      "Control system integration",
      "Interdisciplinary review and completions support",
    ],
    related: ["train-control-systems", "rail-systems-engineering", "project-management"],
    faqs: [
      {
        q: "What are operational control systems in rail?",
        a: "Operational control systems are the systems operators use to monitor and control the railway, including SCADA, communications and control room interfaces. They connect field equipment with the people and systems that run the network.",
      },
      {
        q: "Where has Mikado Group delivered OCS and SCADA work?",
        a: "Mikado Group delivered OCS and SCADA as part of the Tram Grade Separation Project on Adelaide's Glenelg tram line, alongside project management, interdisciplinary review and completions.",
      },
      {
        q: "Do you support communications systems?",
        a: "Yes. Communications is part of Mikado Group's stated rail systems capability, alongside operational control systems and train control.",
      },
    ],
  },
  {
    slug: "project-management",
    name: "Project & design management",
    short: "Project delivery, design management and commercial advisory.",
    icon: "clipboard",
    title: "Rail Project & Design Management | Mikado Group",
    description:
      "Rail project management, design management and delivery support for complex infrastructure programs across Australia. Concept through to commissioning and close-out.",
    h1: "Rail project and design management",
    eyebrow: "Project delivery",
    lead:
      "Mikado Group provides project management, design management and project delivery support for rail and infrastructure programs across Australia. We mobilise specialist resources into client and alliance teams, covering planning, commercial advisory, delivery, testing and commissioning, and project close-out.",
    capabilities: [
      "Project and program management",
      "Design management",
      "Commercial advisory and project development",
      "Construction staging",
      "Testing and commissioning management",
      "Completions and project close-out",
    ],
    related: ["rail-systems-engineering", "railway-signalling-design", "ocs-communications"],
    faqs: [
      {
        q: "What does design management involve on a rail project?",
        a: "Design management plans and controls the design process across disciplines. It coordinates consultants, manages design deliverables and reviews, tracks interfaces and assures that design outputs are released in the right sequence for construction and commissioning.",
      },
      {
        q: "Can Mikado Group mobilise at short notice?",
        a: "Mikado Group is structured to mobilise specialist resources quickly into client and alliance teams. The company describes itself as able to come onboard anytime, anywhere to accommodate a client's changing needs.",
      },
      {
        q: "Which delivery models do you work in?",
        a: "Mikado Group works within client teams and alliance delivery models. Its project experience includes every Level Crossing Removal Alliance in Victoria, the VIDA rail initiatives, and the Tram Grade Separation Project in Adelaide.",
      },
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  client: string;
  short: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  scope: string[];
  context: string;
};

export const projects: Project[] = [
  {
    slug: "level-crossing-removal",
    name: "Level Crossing Removal Program",
    client: "Victoria",
    short:
      "Every LXRP Alliance, across more than 16 crossing removals since 2020.",
    image: "/assets/images/hero-station-800.webp",
    imageAlt: "New railway station platform and tracks at dusk",
    title: "Level Crossing Removal Program Experience | Mikado Group",
    description:
      "Mikado Group has contributed to every Level Crossing Removal Alliance across more than 16 crossing removals since 2020, delivering signalling and project management.",
    h1: "Level Crossing Removal Program",
    lead:
      "Mikado Group has contributed to the success of every Level Crossing Removal Alliance across more than 16 crossing removals since 2020. Our teams have delivered project and design management, signalling design management, overhead wiring and HV substation design, and testing and commissioning management.",
    scope: [
      "Project and design management",
      "Commercial advisory and project development",
      "Signalling design management",
      "Overhead wiring and HV substation design",
      "Testing and commissioning management",
    ],
    context:
      "The Level Crossing Removal Program is the Victorian Government's program to remove dangerous and congested level crossings and rebuild stations across metropolitan Melbourne. It has delivered safer roads and railways, and new precincts, for over 10 years.",
  },
  {
    slug: "vida-rail-initiatives",
    name: "VIDA Rail Initiatives",
    client: "Victoria",
    short:
      "Program management and technical leadership for Victorian rail reform.",
    image: "/assets/images/project-viaduct-800.webp",
    imageAlt: "Elevated rail viaduct above a public urban space",
    title: "VIDA Rail Initiatives, Victoria | Mikado Group",
    description:
      "Mikado Group provided project management and technical resources to Victoria's VIDA rail initiatives, supporting the Transport Standards Taskforce and VIDA framework.",
    h1: "VIDA Rail Initiatives",
    lead:
      "Mikado Group has provided project management and technical resources to Victoria's VIDA rail initiatives, supporting the Transport Standards Taskforce and the VIDA Initiative Management Framework. Our work covers program and project management, initiative coordination and technical leadership across rail systems.",
    scope: [
      "Program and project management",
      "Initiative coordination",
      "Technical leads (rail systems)",
    ],
    context:
      "Following 10 years of the Big Build, the Victorian Government invested in improving practice across the rail sector through the Transport Standards Taskforce and the VIDA Initiative Management Framework. Mikado Group supported the scope and governance of these initiatives.",
  },
  {
    slug: "tram-grade-separation",
    name: "Tram Grade Separation Project",
    client: "Adelaide",
    short:
      "Project management, OCS and SCADA on Adelaide's Glenelg tram line renewal.",
    image: "/assets/images/project-corridor-800.webp",
    imageAlt: "Train on an elevated rail corridor through a suburban area",
    title: "Adelaide Tram Grade Separation Project | Mikado Group",
    description:
      "Mikado Group delivered project management, OCS and SCADA on Adelaide's Tram Grade Separation Project, including three new bridges and three grade separations.",
    h1: "Tram Grade Separation Project, Adelaide",
    lead:
      "Mikado Group delivered key disciplines on the renewal of Adelaide's Glenelg tram line, including three new bridges and three grade separations. Our scope covered project management, interdisciplinary review, construction staging, OCS and SCADA, and completions and project close-out.",
    scope: [
      "Project management",
      "Interdisciplinary review",
      "Construction staging",
      "OCS and SCADA",
      "Completions and project close-out",
    ],
    context:
      "The Tram Grade Separation Project renewed Adelaide's Glenelg tram line, including three new bridges and three grade separations, alongside corridor-wide upgrades.",
  },
];

/**
 * Client and delivery-partner logos shown on the current Mikado Group website.
 * Files were downloaded from mikadogroup.com.au and are used with their
 * existing alt text. Each name matches the image:title metadata on the site.
 */
export const clients = [
  {
    name: "Department of Transport and Planning",
    logo: "/assets/images/clients/dtp.webp",
  },
  {
    name: "Metro Trains Melbourne",
    logo: "/assets/images/clients/metro-trains-melbourne.webp",
  },
  {
    name: "McConnell Dowell",
    logo: "/assets/images/clients/mcconnell-dowell.webp",
  },
  {
    name: "VicTrack",
    logo: "/assets/images/clients/victrack.webp",
  },
  {
    name: "Alstom",
    logo: "/assets/images/clients/alstom.webp",
  },
  {
    name: "Wabtec",
    logo: "/assets/images/clients/wabtec.webp",
  },
  {
    name: "UGL",
    logo: "/assets/images/clients/ugl.webp",
  },
  {
    name: "Laing O'Rourke",
    logo: "/assets/images/clients/laing-orourke.webp",
  },
  {
    name: "Acciona",
    logo: "/assets/images/clients/acciona.webp",
  },
  {
    name: "CPB Contractors",
    logo: "/assets/images/clients/cpb-contractors.webp",
  },
  {
    name: "Decmil",
    logo: "/assets/images/clients/decmil.webp",
  },
  {
    name: "National Intermodal",
    logo: "/assets/images/clients/national-intermodal.webp",
  },
];

export const principles = [
  {
    title: "Mobilise quickly",
    body: "As a strategic partner for planning and delivery of complex projects, Mikado Group can swiftly mobilise and support successful delivery.",
    icon: "bolt",
  },
  {
    title: "Concept to completion",
    body: "Experience delivering projects from concept through to completion means we can support any stage of the project lifecycle.",
    icon: "route",
  },
  {
    title: "Improve the method",
    body: "We help clients develop more efficient methodologies through process improvement, systems review and by challenging the way organisations operate.",
    icon: "spark",
  },
  {
    title: "Anywhere, anytime",
    body: "Our team can come onboard anytime, anywhere to accommodate a client's changing needs across Australia.",
    icon: "pin",
  },
];

export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" },
  { label: "Careers", href: "/careers/" },
];
