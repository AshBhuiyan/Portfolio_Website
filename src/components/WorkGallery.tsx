"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, projectCategories } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { staggerSpring, SPRING_SNAPPY } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Filter = "All" | (typeof projectCategories)[number];

const filters: Filter[] = ["All", ...projectCategories];

export function WorkGallery() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter)}
              className={cn(
                "relative inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-teal/40 text-brand"
                  : "border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] text-foreground/70 hover:border-border-strong/[var(--border-strong-alpha)] hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filterPill"
                  className="absolute inset-0 rounded-full bg-teal/10"
                  transition={SPRING_SNAPPY}
                  aria-hidden
                />
              )}
              <span className="relative z-[1]">{filter}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {filtered.length === 0
          ? `No projects in ${active}.`
          : `Showing ${filtered.length} project${filtered.length === 1 ? "" : "s"}${
              active === "All" ? "" : ` in ${active}`
            }.`}
      </p>

      {filtered.length > 0 ? (
        <motion.div
          key={active}
          variants={staggerSpring}
          initial={false}
          animate="visible"
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-12 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            Nothing here yet
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-foreground/70">
            No projects in this category right now. Try another filter — more
            work is on the way.
          </p>
          <button
            type="button"
            onClick={() => setActive("All")}
            className="mt-5 inline-flex min-h-11 items-center rounded-full border border-border/[var(--border-alpha)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong/[var(--border-strong-alpha)]"
          >
            View all work
          </button>
        </div>
      )}
    </div>
  );
}
