"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "./ProjectPreview";
import { Tag } from "./Tag";
import { MotionSurface, cardSurfaceClass } from "./MotionSurface";
import { projectStatusStyles } from "@/lib/statusStyles";
import { cn } from "@/lib/cn";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <MotionSurface as="article" className="group h-full">
      <Link
        href={`/projects/${project.slug}`}
        className={cn("flex h-full flex-col p-5", cardSurfaceClass)}
      >
        <ProjectPreview
          accent={project.accent}
          label={project.previewLabel}
          variant={project.previewVariant}
          bars={project.previewBars}
          image={project.previewImage}
        />
        {project.dataSource && (
          <p className="mt-2 text-[11px] leading-snug text-foreground/65">
            {project.dataSource}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
              projectStatusStyles[project.status],
            )}
          >
            {project.status}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-foreground/65">
            {project.category}
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors group-hover:text-brand">
          View Case Study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </MotionSurface>
  );
}
