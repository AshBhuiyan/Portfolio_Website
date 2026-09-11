import type { Project } from "@/data/projects";

export const projectStatusStyles: Record<Project["status"], string> = {
  "Concept Study": "text-brand border-teal/30 bg-teal/10",
  "In Progress": "text-brand2 border-accent/30 bg-accent/10",
  Completed: "text-foreground/70 border-border/[var(--border-alpha)] bg-overlay/[0.04]",
};
