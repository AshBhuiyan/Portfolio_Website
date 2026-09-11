"use client";

import { MotionSurface, cardSurfaceClass } from "./MotionSurface";
import type { ExperienceItem } from "@/data/experience";
import { iconMap } from "@/lib/icons";
import { Tag } from "./Tag";
import { cn } from "@/lib/cn";

export function ExperienceCard({ item }: { item: ExperienceItem }) {
  const Icon = iconMap[item.icon];
  return (
    <MotionSurface
      as="article"
      className={cn("group flex h-full flex-col p-6", cardSurfaceClass)}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.03] text-brand transition-all group-hover:border-border-strong/[var(--border-strong-alpha)]">
          <Icon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110" />
        </span>
        <span className="rounded-full border border-border/[var(--border-alpha)] bg-overlay/[0.03] px-3 py-1 text-[11px] font-medium text-foreground/70">
          {item.timeframe}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-foreground">
        {item.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-brand">{item.org}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </MotionSurface>
  );
}
