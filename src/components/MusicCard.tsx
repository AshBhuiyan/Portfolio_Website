"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { MotionSurface, cardSurfaceClass } from "./MotionSurface";
import { Play, Lock, Clock } from "lucide-react";
import type { MusicTrack } from "@/data/music";
import { Tag } from "./Tag";
import { cn } from "@/lib/cn";
import { useMotionActive } from "@/lib/useMotionActive";

const statusStyles: Record<MusicTrack["status"], string> = {
  "Public Preview": "text-brand border-teal/30 bg-teal/10",
  Private: "text-brand2 border-accent/30 bg-accent/10",
  "In Progress": "text-foreground/70 border-border/[var(--border-alpha)] bg-overlay/[0.04]",
};

const accentBar: Record<MusicTrack["accent"], string> = {
  teal: "from-teal/30 to-teal/80",
  blue: "from-accent/30 to-accent/80",
  mixed: "from-accent/40 to-teal/80",
};

function Waveform({
  accent,
  active,
}: {
  accent: MusicTrack["accent"];
  active: boolean;
}) {
  const bars = Array.from(
    { length: 16 },
    (_, i) => 24 + Math.abs(Math.sin(i * 0.7)) * 76,
  );
  return (
    <div
      className={cn("flex h-12 items-center gap-[3px]", !active && "motion-paused")}
      aria-hidden
    >
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            "wave-bar w-full rounded-full bg-gradient-to-t",
            accentBar[accent],
          )}
          style={
            {
              height: `${h}%`,
              "--bar-delay": `${(i % 8) * 0.12}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function MusicCard({ track }: { track: MusicTrack }) {
  const isPrivate = track.status === "Private";
  const isInProgress = track.status === "In Progress";
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const active = useMotionActive(ref, reduce);

  return (
    <div ref={ref}>
      <MotionSurface
        as="article"
        className={cn("group flex h-full flex-col p-5", cardSurfaceClass)}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-wider text-foreground/65">
            {track.type}
          </span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
              statusStyles[track.status],
            )}
          >
            {track.status}
          </span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
          {track.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
          {track.description}
        </p>

        <div className="mt-5 rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.04] p-4">
          <Waveform accent={track.accent} active={active} />
          <div className="mt-4 flex items-center justify-between">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-border/[var(--border-alpha)] bg-overlay/[0.03] px-3 py-1.5 text-xs font-medium text-foreground/70"
              aria-label={
                isPrivate
                  ? "Private track — preview unavailable"
                  : isInProgress
                    ? `${track.title} — coming soon`
                    : `${track.title} — preview only`
              }
            >
              {isPrivate ? (
                <Lock className="h-3.5 w-3.5" aria-hidden />
              ) : isInProgress ? (
                <Clock className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Play className="h-3.5 w-3.5" aria-hidden />
              )}
              {isPrivate
                ? "Private"
                : isInProgress
                  ? "Coming soon"
                  : "Preview only"}
            </span>
            <Tag className="border-none bg-transparent px-0 text-foreground/60">
              No audio file
            </Tag>
          </div>
        </div>
      </MotionSurface>
    </div>
  );
}
