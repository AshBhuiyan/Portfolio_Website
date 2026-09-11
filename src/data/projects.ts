// Central source of truth for work / case studies.
// Wording is intentionally honest: these are concept and portfolio projects.
// Do not add fabricated metrics, real users, or company outcomes here unless
// they are genuinely true.

export type ProjectStatus = "Completed" | "In Progress" | "Concept Study";
export type ProjectCategory = "UX/Product" | "Data/System" | "Interface";
export type PreviewVariant = "bars" | "lines" | "dots" | "flow";

export type CaseStudySection = {
  heading: string;
  body: string;
  // Optional bullet points rendered under the section body.
  points?: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  projectType: string;
  role: string;
  timeline: string;
  tools: string[];
  tags: string[];
  status: ProjectStatus;
  // A short accent label shown on the preview panel.
  previewLabel: string;
  // Visual accent used for the abstract preview ("teal" | "blue" | "mixed").
  accent: "teal" | "blue" | "mixed";
  // Abstract preview composition, differentiated per project.
  previewVariant?: PreviewVariant;
  // Bar heights for the "bars" variant (kept distinct per project).
  previewBars?: number[];
  // Optional real thumbnail (Figma export / screenshot). When set, it replaces
  // the abstract composition. TODO(assets): drop images into /public/projects/.
  previewImage?: string;
  // Optional synthetic-data / metric labelling (leave unset until real).
  dataSource?: string;
  keyInsight?: string;
  // Whether this project should appear on the homepage "Selected Projects".
  featured: boolean;
  // Rich case-study content. A project without these reads as a teaser.
  overview?: string;
  problem?: string;
  targetUsers?: string;
  designApproach?: string;
  keyDecisions?: string[];
  prototypeDirection?: string;
  whatILearned?: string;
  nextSteps?: string;
};

export const projects: Project[] = [
  {
    slug: "support-workflow-system",
    title: "Support Workflow System",
    subtitle: "Making technical support feel calm, clear, and accountable.",
    description:
      "A concept system designed to make technical support intake, troubleshooting, ticket updates, and team handoffs clearer.",
    category: "UX/Product",
    projectType: "Concept product / Workflow design",
    role: "Product design, UX, systems thinking",
    timeline: "2024 — ongoing concept",
    tools: ["Figma", "TypeScript", "Notion", "Whiteboarding"],
    tags: ["UX", "Systems", "Service Design"],
    status: "Concept Study",
    previewLabel: "Ticket flow",
    accent: "teal",
    previewVariant: "lines",
    featured: true,
    overview:
      "Support Workflow System is a concept born from real time spent as a certified Apple/Dell technician. It reimagines the intake-to-resolution journey for a technical service desk as one continuous, legible workflow rather than a stack of disconnected tools.",
    problem:
      "Technical support often breaks down not at the bench, but in the gaps: vague intake notes, lost context during handoffs, and customers left guessing about status. The hardest part of repair work is rarely the repair — it is keeping everyone aligned on what is happening and why.",
    targetUsers:
      "Front-line technicians, service-desk leads, and the customers waiting on an answer. Each group needs a different slice of the same truth.",
    designApproach:
      "I mapped the full lifecycle of a ticket and looked for the moments where information was created, lost, or duplicated. The interface is organized around a single source of truth for each device, with role-aware views layered on top so technicians, leads, and customers each see what is relevant to them.",
    keyDecisions: [
      "Structured intake that captures device, symptom, and reproduction steps up front to reduce back-and-forth.",
      "A timeline-first ticket view so anyone can understand history at a glance during a handoff.",
      "Plain-language status updates for customers, separated from internal technical notes.",
      "Lightweight templates for common repairs to keep documentation consistent without slowing technicians down.",
    ],
    prototypeDirection:
      "The current direction is a clickable Figma prototype of the technician and lead views, with a focus on the intake form, the ticket timeline, and the handoff flow. The customer-facing status view is the next surface to prototype.",
    whatILearned:
      "Designing for support taught me that clarity is a feature. The most valuable thing a system can do under pressure is remove ambiguity — about state, ownership, and next steps.",
    nextSteps:
      "Prototype the customer status experience, pressure-test the intake form with real repair scenarios, and explore how a small amount of structured data could surface common failure patterns over time.",
  },
  {
    slug: "data-learning-tool",
    title: "Data Learning Tool",
    subtitle: "Helping students understand data, not just memorize formulas.",
    description:
      "A learning concept inspired by teaching Excel and data concepts, designed to help students understand formulas, errors, and data workflows through guided feedback.",
    category: "Data/System",
    projectType: "Concept learning tool / Data UX",
    role: "Product design, learning design, front-end direction",
    timeline: "2024 — ongoing concept",
    tools: ["Figma", "TypeScript", "Spreadsheets", "Teaching notes"],
    tags: ["Data", "Education", "UX"],
    status: "Concept Study",
    previewLabel: "Guided formula",
    accent: "blue",
    previewVariant: "bars",
    previewBars: [28, 62, 40, 80, 50, 72],
    featured: true,
    overview:
      "Data Learning Tool grew directly out of teaching COM S students and watching where data concepts click — and where they stall. It is a concept for a guided environment that treats errors as teaching moments rather than dead ends.",
    problem:
      "Most spreadsheet and data tools assume you already understand the model. When a formula breaks or a result looks wrong, students get a cryptic error and no path forward. The gap is rarely intelligence — it is feedback.",
    targetUsers:
      "Students learning spreadsheets, formulas, and introductory data workflows, and the teaching assistants supporting them.",
    designApproach:
      "I focused on the moment of confusion. When something goes wrong, the tool explains what the system expected, what it received, and a next step — in plain language. The aim is to build an accurate mental model, not to hand over answers.",
    keyDecisions: [
      "Errors are rewritten as guidance: what happened, why, and what to try next.",
      "Step-by-step reveal of how a formula evaluates, so the logic is visible rather than hidden.",
      "Gentle nudges instead of solutions, preserving the productive struggle that learning needs.",
      "A clean, distraction-free layout that keeps attention on the data and the feedback.",
    ],
    prototypeDirection:
      "The prototype direction centers on the guided-error experience and the formula walkthrough view, designed in Figma with sample lessons drawn from real tutoring sessions.",
    whatILearned:
      "Teaching reshaped how I think about interface copy. The words a system chooses in a moment of failure can either build confidence or quietly erode it.",
    nextSteps:
      "Build an interactive prototype of the formula walkthrough, test the guidance copy with real students, and explore a small library of common error patterns.",
  },
  {
    slug: "interface-explorations",
    title: "Interface Explorations",
    subtitle: "Studies in hierarchy, clarity, accessibility, and polish.",
    description:
      "A collection of interface studies focused on visual hierarchy, interaction clarity, accessibility, and product polish.",
    category: "Interface",
    projectType: "Ongoing interface studies",
    role: "Interface design, front-end exploration",
    timeline: "Ongoing",
    tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    tags: ["UI", "Accessibility", "Motion"],
    status: "In Progress",
    previewLabel: "UI studies",
    accent: "mixed",
    previewVariant: "flow",
    featured: true,
    overview:
      "Interface Explorations is an ongoing set of focused studies — small, self-contained problems I use to sharpen craft: a settings layout, an empty state, a data table, a motion transition. Each one isolates a single question about clarity or polish.",
    problem:
      "Good interface work lives in details that are easy to skip: focus order, contrast, the rhythm of spacing, the feel of a transition. Studying them in isolation is how I keep those instincts sharp.",
    targetUsers:
      "Primarily a craft practice for myself — and a transparent look, for anyone evaluating my work, at how I think about the details.",
    designApproach:
      "Each study starts with one constraint and one question. I design it, build the parts worth building, and write down what I would carry into real product work.",
    keyDecisions: [
      "Accessibility treated as a baseline, not a finishing pass — contrast, focus states, and semantics from the start.",
      "Motion used to clarify state and direction, never as decoration.",
      "A restrained system of spacing and type so hierarchy comes from structure, not noise.",
    ],
    prototypeDirection:
      "This site itself is one of the explorations — built in Next.js, TypeScript, and Tailwind with accessible, responsive components and subtle Framer Motion.",
    whatILearned:
      "Polish is not a layer you add at the end. It is the accumulation of many small, deliberate decisions made all the way through.",
    nextSteps:
      "Keep the collection growing with new studies, and document the reasoning behind each one so the thinking is as visible as the result.",
  },
  {
    slug: "personal-portfolio-system",
    title: "Personal Portfolio System",
    subtitle: "A personal brand built as a real, maintainable product.",
    description:
      "The design system and front-end architecture behind this website — treated as a product, with reusable components, a content layer, and a clear visual language.",
    category: "Interface",
    projectType: "Design system + front-end build",
    role: "Design, front-end engineering",
    timeline: "2024",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    tags: ["Design System", "Next.js", "Branding"],
    status: "Completed",
    previewLabel: "This site",
    accent: "mixed",
    previewVariant: "bars",
    previewBars: [70, 40, 86, 52, 76, 34],
    featured: false,
    overview:
      "Rather than reach for a template, I built this site as a small product: a clear visual language, reusable components, and a data layer that drives the work and music sections. It doubles as evidence of how I bridge design and engineering.",
    problem:
      "A personal site is easy to start and hard to keep coherent. I wanted a system where adding a project or a track is a data change, not a redesign — and where the brand stays consistent across every page.",
    targetUsers:
      "Recruiters, collaborators, and anyone curious about how I work — across product, design, and engineering.",
    designApproach:
      "I defined a restrained dark theme with teal and blue accents, built a set of primitives (containers, glass panels, buttons, cards), and drove content from typed data files so the site scales cleanly.",
    keyDecisions: [
      "A typed content layer (projects, music, experience) so adding content never means touching layout code.",
      "Reusable, accessible components with visible focus states and semantic structure.",
      "Subtle, reduced-motion-aware animation that supports the content rather than competing with it.",
    ],
    prototypeDirection:
      "It is not a prototype — it is the shipped product you are reading now.",
    whatILearned:
      "Designing my own brand forced the same discipline I would apply to a client product: decide the rules early, then let the system do the work.",
    nextSteps:
      "Continue evolving the design system as new work is added — refining the type scale, motion language, and content model so the site scales gracefully as the portfolio grows.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export const projectCategories: ProjectCategory[] = [
  "UX/Product",
  "Data/System",
  "Interface",
];
