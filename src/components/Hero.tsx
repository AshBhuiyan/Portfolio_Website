"use client";

import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { HeroVisual } from "./HeroVisual";
import { HeroParticles } from "./HeroParticles";
import { heroStagger, heroItem, heroVisual } from "@/lib/motion";

const CREDIBILITY = [
  "Teaching Assistant",
  "Apple & Dell Certified",
  "1250+ Device Repairs @ TechCyte",
  "SQL",
  "Python",
];

export function Hero() {
  const reduce = useReducedMotion();
  const copyControls = useAnimation();
  const visualControls = useAnimation();

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        void copyControls.set("hidden");
        void visualControls.set("hidden");
        void copyControls.start("visible");
        void visualControls.start("visible");
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [reduce, copyControls, visualControls]);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div
        className="glow-radial pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
        aria-hidden
      />
      <HeroParticles />

      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <motion.div
          variants={heroStagger}
          initial={false}
          animate={reduce ? "visible" : copyControls}
        >
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 rounded-full border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand"
          >
            Hello, I&apos;m
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Ash Bhuiyan
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-5 max-w-md text-balance text-lg leading-snug text-foreground/80 sm:text-xl"
          >
            I turn data, systems, and user needs into practical solutions.
          </motion.p>

          <motion.p
            variants={heroItem}
            className="mt-4 max-w-md text-base leading-relaxed text-foreground/65"
          >
            I&apos;m a Software Engineering student at Iowa State University with a
            Data Science minor and experience in technical support, teaching,
            analytics, and workflow improvement.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/projects" size="md" className="group/btn">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href="/resume" variant="secondary" size="md">
              View Resume
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={heroVisual}
          initial={false}
          animate={reduce ? "visible" : visualControls}
          className="flex justify-center lg:justify-end"
        >
          <HeroVisual />
        </motion.div>
      </Container>

      <Container className="pb-12 pt-8 lg:pb-16 lg:pt-10">
        <div
          aria-label="Highlights"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] px-5 py-3.5 text-center text-sm text-foreground/65 shadow-card"
        >
          {CREDIBILITY.map((item, i, arr) => (
            <span key={item} className="whitespace-nowrap">
              {item}
              {i < arr.length - 1 && (
                <span className="ml-4 select-none opacity-40" aria-hidden>
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
