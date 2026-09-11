// Tour steps. Each `target` matches a `data-tour="..."` attribute rendered on
// the corresponding navbar link. Order matches primary nav.
export type TourStep = {
  target: string;
  title: string;
  body: string;
};

export const tourSteps: TourStep[] = [
  {
    target: "projects",
    title: "Projects",
    body: "Selected concept and portfolio projects, each with a full case study covering the problem, approach, and what I learned.",
  },
  {
    target: "resume",
    title: "Resume",
    body: "Download my resume when it's available, or request a copy directly. It mirrors the background shown across the site.",
  },
  {
    target: "about",
    title: "About",
    body: "The story behind the work: software engineering, data, teaching, technical repair, and music — and what I'm building toward.",
  },
  {
    target: "music",
    title: "Music",
    body: "A preview-only look at my guitar work — tone demos, covers, and original ideas. Previews only; nothing is downloadable here.",
  },
  {
    target: "contact",
    title: "Contact",
    body: "The fastest way to reach me about internships, data and systems work, collaborations, or music access.",
  },
];
