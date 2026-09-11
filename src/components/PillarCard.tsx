"use client";

import { MotionSurface, cardSurfaceClass } from "./MotionSurface";
import { iconMap, type IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

export type Pillar = {
  title: string;
  description: string;
  icon: IconName;
};

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = iconMap[pillar.icon];
  return (
    <MotionSurface className={cn("group h-full p-6", cardSurfaceClass)}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.03] text-brand transition-colors group-hover:border-border-strong/[var(--border-strong-alpha)]">
        <Icon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
        {pillar.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        {pillar.description}
      </p>
    </MotionSurface>
  );
}
