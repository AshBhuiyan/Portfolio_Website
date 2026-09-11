import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { MusicCard } from "@/components/MusicCard";
import { PillarCard, type Pillar } from "@/components/PillarCard";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { getFeaturedProjects } from "@/data/projects";
import { getFeaturedMusic } from "@/data/music";

const pillars: Pillar[] = [
  {
    title: "Software + Systems",
    description:
      "An engineering foundation that lets me move from idea to working interface — and think in systems, not just screens.",
    icon: "code2",
  },
  {
    title: "Data + Analysis",
    description:
      "A Data Science minor and applied practice that shape how I make products measurable, honest, and easier to reason about.",
    icon: "database",
  },
  {
    title: "Teaching + Communication",
    description:
      "Time as a TA taught me to explain hard things simply — a skill that shows up in clearer interfaces and clearer copy.",
    icon: "graduationCap",
  },
  {
    title: "Music + Creative Identity",
    description:
      "Guitar and tone work keep me attuned to feel, rhythm, and emotion — the human texture behind good design.",
    icon: "music4",
  },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const featuredMusic = getFeaturedMusic();

  return (
    <>
      <Hero />

      {/* Selected Projects */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Selected Projects"
              title="Projects built around clarity"
              description="A few concept and portfolio projects that show how I approach systems, data, and interface craft."
            />
            <Button href="/projects" variant="secondary" size="sm">
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Reveal
            stagger
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Personal Pillars */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="What shapes my work"
            title="Four threads, one way of thinking"
            description="My background isn't a list of unrelated interests — each one feeds how I design and build."
          />
          <Reveal
            stagger
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pillars.map((pillar) => (
              <PillarCard key={pillar.title} pillar={pillar} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Featured Music */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Music"
              title="Where I explore feel and tone"
              description="Music is where I explore emotion, tone, rhythm, and storytelling."
            />
            <Button href="/music" variant="secondary" size="sm">
              Explore music
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Reveal
            stagger
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredMusic.map((track) => (
              <MusicCard key={track.id} track={track} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* About Preview */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal fluid className="relative overflow-hidden rounded-3xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-8 sm:p-14">
            <div
              className="glow-radial pointer-events-none absolute inset-0 -z-10 opacity-70"
              aria-hidden
            />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
              A little about me
            </span>
            <p className="mt-5 max-w-3xl text-balance font-display text-2xl font-medium leading-snug text-foreground/90 sm:text-3xl">
              I care about designing systems that feel clear when people need
              them most.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70">
              My path through software engineering, technical support, teaching,
              and music shaped how I think about design: practical, empathetic,
              expressive, and grounded in real human problems.
            </p>
            <div className="mt-8">
              <Button href="/about" size="md">
                More About Me
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
