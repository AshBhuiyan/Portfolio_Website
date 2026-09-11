import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ash Bhuiyan — Data & Systems Analysis",
    short_name: "Ash Bhuiyan",
    description:
      "Personal website and portfolio of Ash Bhuiyan — data analysis, systems analysis, and music.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f4f8",
    theme_color: "#f1f4f8",
    icons: [
      {
        src: "/logo/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logo/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
