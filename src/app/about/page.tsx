import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { experience, qualities, buildingToward } from "@/data/experience";
import { ArrowRight } from "lucide-react";
import { withCanonical } from "@/data/site";

export const metadata: Metadata = withCanonical("/about", {
  title: "About",
  description:
    "The story behind Ash Bhuiyan — software engineering, data, teaching, technical repair, and music, and what he's building toward.",
});

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Intro + story */}
      <section className="relative overflow-hidden">
        <div
          className="glow-radial pointer-events-none absolute inset-x-0 top-0 -z-10 h-96"
          aria-hidden
        />
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand">
              <span className="h-px w-6 bg-teal/50" aria-hidden />
              About Ash
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              A builder shaped by software, data, teaching, repair, and music.
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/65">
              <p>
                I&apos;m a Software Engineering student at Iowa State University
                with a minor in Data Science. What ties my interests together
                isn&apos;t a single field — it&apos;s a way of working: take
                something tangled, understand it deeply, and make it clearer for
                the people who have to use it.
              </p>
              <p>
                That instinct comes from doing real work in different worlds.
                I&apos;ve repaired hardware as a certified Apple/Dell technician,
                taught computing as a TA, worked with data, and spent years
                chasing tone on a guitar. Each one taught me something design
                can&apos;t teach on its own — patience, empathy, precision, and
                feel.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Background cards */}
      <section className="pt-14 sm:pt-16">
        <Container>
          <SectionHeader
            eyebrow="Background"
            title="Where I've spent my time"
            description="The experiences that shaped how I think and build."
          />
          <Reveal
            stagger
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {experience.map((item) => (
              <ExperienceCard key={item.id} item={item} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* What I'm building toward */}
      <section className="py-12">
        <Container>
          <Reveal className="rounded-3xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-8 sm:p-12">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
              Direction
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold text-foreground sm:text-3xl">
              What I&apos;m building toward
            </h2>
            <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {buildingToward.map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-teal/40 pl-5"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Personal qualities */}
      <section className="py-12">
        <Container>
          <Reveal className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
              How people describe working with me
            </span>
            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-3">
              {qualities.map((q) => (
                <span
                  key={q}
                  className="rounded-full border border-border/[var(--border-alpha)] bg-overlay/[0.03] px-5 py-2 text-sm text-foreground/70 transition-colors hover:border-border-strong/[var(--border-strong-alpha)] hover:text-foreground"
                >
                  {q}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12">
        <Container>
          <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Let&apos;s build something clear together
            </h2>
            <p className="max-w-md text-base text-foreground/70">
              I&apos;m looking for internship and early-career opportunities in
              product, design, and software.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/projects" size="lg">
                View Work
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
