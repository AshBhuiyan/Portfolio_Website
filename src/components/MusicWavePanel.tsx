"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, SkipBack, SkipForward, AudioLines } from "lucide-react";
import { useMotionActive } from "@/lib/useMotionActive";
import { cn } from "@/lib/cn";

// A tasteful, preview-only "player" visual for the music hero. Purely
// decorative — it plays nothing and offers no download, matching the
// preview-only nature of the public music page.
export function MusicWavePanel() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const active = useMotionActive(ref, reduce);

  const bars = Array.from(
    { length: 24 },
    (_, i) => 18 + Math.abs(Math.sin(i * 0.6)) * 82,
  );

  return (
    <div
      ref={ref}
      className={cn(
        "glass w-full max-w-md rounded-3xl p-6 shadow-panel",
        !active && "motion-paused",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-brand">
          <AudioLines className="h-4 w-4" aria-hidden />
          <span className="text-xs font-medium uppercase tracking-[0.18em]">
            Now previewing
          </span>
        </div>
        <span className="rounded-full border border-border/[var(--border-alpha)] bg-overlay/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70">
          Preview
        </span>
      </div>

      <p className="mt-4 font-display text-lg font-semibold text-foreground">
        Guitar Tone Demo
      </p>
      <p className="text-sm text-foreground/65">PRS SE Custom 24 · clean lead</p>

      <div aria-hidden="true">
        <div className="mt-5 flex h-16 items-center gap-[3px]">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-full rounded-full bg-gradient-to-t from-accent/30 to-teal/80"
              style={{ height: `${h}%` }}
              animate={
                active
                  ? { scaleY: [0.7, 1, 0.75], opacity: [0.65, 1, 0.7] }
                  : { scaleY: 1, opacity: 0.85 }
              }
              transition={{
                duration: 1.6,
                repeat: active ? Infinity : 0,
                ease: "easeInOut",
                delay: i * 0.04,
              }}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] tabular-nums text-foreground/65">—:—</span>
          <div className="flex items-center gap-4 text-foreground/70">
            <SkipBack className="h-4 w-4" />
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal text-ink-950">
              <Play className="h-4 w-4" />
            </span>
            <SkipForward className="h-4 w-4" />
          </div>
          <span className="text-[11px] tabular-nums text-foreground/65">—:—</span>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-foreground/60">
        Illustration — not a player
      </p>
    </div>
  );
}
