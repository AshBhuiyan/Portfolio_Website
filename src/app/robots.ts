import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /music/private keeps robots: noindex on the page itself. Do not disallow
      // it here — that would block crawlers from ever reading the noindex.
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
