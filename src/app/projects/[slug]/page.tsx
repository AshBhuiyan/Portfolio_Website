import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { projects, getProjectBySlug } from "@/data/projects";
import { withCanonical } from "@/data/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Case study not found" };
  }
  return withCanonical(`/projects/${project.slug}`, {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Ash Bhuiyan`,
      description: project.subtitle,
      images: [
        {
          url: "/logo/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} — Ash Bhuiyan`,
        },
      ],
    },
  });
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  // Pick the next project in the list (wrapping) for the footer link.
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <CaseStudyLayout
      project={project}
      next={next.slug === project.slug ? undefined : next}
    />
  );
}
