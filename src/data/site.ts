import type { Metadata } from "next";

/**
 * Canonical site URL. Production builds (NODE_ENV=production) require
 * NEXT_PUBLIC_SITE_URL — failing closed beats publishing wrong OG/canonicals.
 * Local `next dev` falls back to localhost when unset.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set for production builds (e.g. https://ashbhuiyan.com). " +
        "See .env.example.",
    );
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Ash Bhuiyan",
  /** Full professional framing — Footer, metadata. */
  role: "Software Engineering Student · Data & Systems Analysis",
  /** Compact label for Navbar at narrower breakpoints. */
  roleShort: "Data & Systems Analysis",
  location: "Ames, IA",
  email: "m.ashfaque.bhuiyan@gmail.com",
  linkedin: "https://www.linkedin.com/in/ashfaque-bhuiyan/",
  github: "https://github.com/AshBhuiyan",
  tagline: "Built with care, clarity, and curiosity.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "About", href: "/about" },
  { label: "Music", href: "/music" },
  { label: "Contact", href: "/contact" },
] as const;

/** Attach a stable absolute canonical URL for a path (`/` or `/projects/...`). */
export function withCanonical(
  path: string,
  metadata: Metadata = {},
): Metadata {
  const normalized =
    path === "/" ? siteUrl : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: normalized,
    },
  };
}
