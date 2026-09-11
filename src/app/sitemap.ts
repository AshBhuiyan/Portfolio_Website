import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl as BASE_URL } from "@/data/site";

/** Stable per-route dates — avoid claiming every URL changed on every build. */
const ROUTE_DATES: Record<string, string> = {
  "": "2026-07-01",
  "/projects": "2026-07-01",
  "/music": "2026-07-01",
  "/about": "2026-07-01",
  "/resume": "2026-07-01",
  "/contact": "2026-07-01",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.keys(ROUTE_DATES).map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: ROUTE_DATES[route],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: "2026-07-01",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
