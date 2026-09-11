"use client";

import { motion } from "framer-motion";
import { Compass, X } from "lucide-react";

// Small, non-intrusive first-visit prompt anchored to the bottom corner.
// Never blocks browsing; the user can ignore, skip, or start.
export function TourPrompt({
  onStart,
  onSkip,
}: {
  onStart: () => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-[70] w-[min(20rem,calc(100vw-2.5rem))]"
      role="dialog"
      aria-label="Quick tour invitation"
    >
      <div className="glass rounded-2xl p-4 shadow-panel">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.03] text-brand">
            <Compass className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Take a quick tour?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/70">
              A 5-step look around the site — about 20 seconds.
            </p>
          </div>
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-foreground/65 transition-colors hover:text-foreground"
            aria-label="Dismiss tour invitation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-teal px-4 py-2 text-sm font-medium text-ink-950 transition-all hover:bg-teal-soft"
          >
            Start
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center justify-center rounded-full border border-border/[var(--border-alpha)] px-4 py-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            Skip
          </button>
        </div>
      </div>
    </motion.div>
  );
}
