import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Container } from "./Container";
import { Tag } from "./Tag";
import { ProjectPreview } from "./ProjectPreview";
import { Reveal } from "./Reveal";
import { projectStatusStyles } from "@/lib/statusStyles";
import { cn } from "@/lib/cn";

// A labeled metadata row used in the project sidebar.
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/[var(--border-alpha)] py-3 last:border-none">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-foreground/65">
        {label}
      </dt>
      <dd className="text-sm text-foreground/75">{value}</dd>
    </div>
  );
}

// A content block for a single case-study section.
function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-foreground/65">
        {children}
      </div>
    </Reveal>
  );
}

export function CaseStudyLayout({
  project,
  next,
}: {
  project: Project;
  next?: Project;
}) {
  return (
    <article className="pb-10 pt-28 sm:pt-32">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                projectStatusStyles[project.status],
              )}
            >
              {project.status}
            </span>
            <span className="text-xs uppercase tracking-wider text-foreground/65">
              {project.category}
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/65">
            {project.subtitle}
          </p>
        </Reveal>

        {/* Preview banner */}
        <Reveal className="mt-10">
          <ProjectPreview
            accent={project.accent}
            label={project.previewLabel}
            variant={project.previewVariant}
            bars={project.previewBars}
            image={project.previewImage}
            className="p-8"
          />
          {project.dataSource && (
            <p className="mt-3 text-sm text-foreground/65">{project.dataSource}</p>
          )}
          {project.keyInsight && (
            <p className="mt-1 text-sm font-medium text-foreground/80">
              {project.keyInsight}
            </p>
          )}
        </Reveal>

        {/* Body grid: metadata sidebar + content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <dl className="rounded-2xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-5">
              <MetaRow label="Project type" value={project.projectType} />
              <MetaRow label="Role" value={project.role} />
              <MetaRow label="Timeline" value={project.timeline} />
              <div className="py-3">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-foreground/65">
                  Tools
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Tag key={tool}>{tool}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>

          {/* Content */}
          <div className="space-y-12">
            {project.overview && (
              <Block heading="Overview">
                <p>{project.overview}</p>
              </Block>
            )}
            {project.problem && (
              <Block heading="The problem">
                <p>{project.problem}</p>
              </Block>
            )}
            {project.targetUsers && (
              <Block heading="Target users">
                <p>{project.targetUsers}</p>
              </Block>
            )}
            {project.designApproach && (
              <Block heading="Design approach">
                <p>{project.designApproach}</p>
              </Block>
            )}
            {project.keyDecisions && project.keyDecisions.length > 0 && (
              <Block heading="Key decisions">
                <ul className="space-y-3">
                  {project.keyDecisions.map((d, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
            {project.prototypeDirection && (
              <Block heading="Prototype direction">
                <p>{project.prototypeDirection}</p>
              </Block>
            )}
            {project.whatILearned && (
              <Block heading="What I learned">
                <p>{project.whatILearned}</p>
              </Block>
            )}
            {project.nextSteps && (
              <Block heading="Next steps">
                <p>{project.nextSteps}</p>
              </Block>
            )}
          </div>
        </div>

        {/* Next project */}
        {next && (
          <Reveal className="mt-20 border-t border-border/[var(--border-alpha)] pt-10">
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/65">
              Next project
            </span>
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-3 flex items-center justify-between gap-4"
            >
              <span className="font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-brand sm:text-3xl">
                {next.title}
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </Container>
    </article>
  );
}
