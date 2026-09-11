// Background / experience entries used on the About page and (optionally)
// the resume page. Keep this honest and current.

import type { IconName } from "@/lib/icons";

export type ExperienceItem = {
  id: string;
  title: string;
  org: string;
  timeframe: string;
  description: string;
  icon: IconName;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "software-engineering",
    title: "Software Engineering Student",
    org: "Iowa State University",
    timeframe: "Current",
    description:
      "Studying software engineering with a minor in Data Science and computer science coursework. Building a foundation across systems, software design, and data.",
    icon: "code2",
    tags: ["Software Engineering", "Data Science minor", "CS coursework"],
  },
  {
    id: "teaching-assistant",
    title: "Teaching Assistant — COM S 1040 & COM S 1130",
    org: "Iowa State University",
    timeframe: "Current",
    description:
      "Supporting students through introductory computing courses — explaining concepts, debugging alongside them, and translating dense ideas into language that clicks.",
    icon: "graduationCap",
    tags: ["Teaching", "Communication", "Mentorship"],
  },
  {
    id: "apple-dell-technician",
    title: "Lead Technician — Certified Apple/Dell",
    org: "ISU Bookstore Service Center",
    timeframe: "Former",
    description:
      "Certified Apple and Dell lead technician handling diagnostics, repair, and customer communication. Learned firsthand how clear process and clear words reduce stress under pressure.",
    icon: "wrench",
    tags: ["Hardware Repair", "Diagnostics", "Customer Support"],
  },
  {
    id: "data-science",
    title: "Data Science Focus",
    org: "Minor + applied practice",
    timeframe: "Ongoing",
    description:
      "Working with data concepts, analysis, and the tools around them — and thinking about how to make data more understandable for the people who use it.",
    icon: "database",
    tags: ["Data Analysis", "Spreadsheets", "Systems thinking"],
  },
  {
    id: "musician",
    title: "Guitarist & Musician",
    org: "Personal practice & performance",
    timeframe: "Ongoing",
    description:
      "Playing guitar with a focus on tone, melody, and emotional phrasing — covers, tone demos, live takes, and original ideas. A discipline that shapes how I think about craft and feel.",
    icon: "music4",
    tags: ["Guitar", "Tone", "Performance", "Songwriting"],
  },
];

// Personal qualities surfaced on the About page (tasteful, not boastful).
export const qualities = [
  "Clear thinker",
  "Builder",
  "Teacher",
  "Problem solver",
  "Detail-oriented",
  "Creative",
  "Empathetic",
  "Resilient",
];

// Directions Ash is building toward.
export const buildingToward = [
  {
    title: "UX / Product Design",
    description:
      "Designing interfaces and flows that feel obvious in the moment someone needs them.",
  },
  {
    title: "Product & Data Systems",
    description:
      "Connecting design with data so products can learn and improve responsibly.",
  },
  {
    title: "Human-centered tools",
    description:
      "Software that respects attention, reduces friction, and earns trust.",
  },
  {
    title: "Healthcare technology",
    description:
      "A long-term interest in bringing clarity to high-stakes, human moments.",
  },
];
