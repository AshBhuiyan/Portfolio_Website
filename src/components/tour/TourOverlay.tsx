"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointer2, ArrowLeft, ArrowRight, X } from "lucide-react";
import { tourSteps } from "./steps";
import { EASE_OUT } from "@/lib/motion";

type Rect = { top: number; left: number; width: number; height: number };

const CARD_WIDTH = 340;
const TITLE_ID = "tour-step-title";

function getFocusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

export function TourOverlay({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const step = tourSteps[index];
  const isFirst = index === 0;
  const isLast = index === tourSteps.length - 1;

  const next = useCallback(() => {
    setIndex((i) => (i < tourSteps.length - 1 ? i + 1 : i));
  }, []);
  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  const measure = useCallback(() => {
    const el = document.querySelector<HTMLElement>(
      `[data-tour="${step.target}"]`,
    );
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        return;
      }
    }
    setRect(null);
  }, [step.target]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [measure]);

  // Focus trap, scroll lock, restore focus on close.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusCard = () => {
      const root = cardRef.current;
      if (!root) return;
      const focusables = getFocusable(root);
      (focusables[0] ?? root).focus();
    };
    // After AnimatePresence mounts the card.
    const t = window.setTimeout(focusCard, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") back();

      if (e.key !== "Tab" || !cardRef.current) return;
      const focusables = getFocusable(cardRef.current);
      if (focusables.length === 0) {
        e.preventDefault();
        cardRef.current.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [onClose, next, back]);

  // Re-focus the card when the step changes.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const root = cardRef.current;
      if (!root) return;
      const focusables = getFocusable(root);
      (focusables[0] ?? root).focus();
    }, 30);
    return () => window.clearTimeout(t);
  }, [index]);

  const anchored = rect !== null;
  let cardStyle: React.CSSProperties;
  if (anchored && rect) {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - CARD_WIDTH / 2, 16),
      vw - CARD_WIDTH - 16,
    );
    cardStyle = { top: rect.top + rect.height + 18, left, width: CARD_WIDTH };
  } else {
    cardStyle = {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: `min(${CARD_WIDTH}px, calc(100vw - 2rem))`,
    };
  }

  return (
    <div
      className="fixed inset-0 z-[90]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
    >
      {!anchored && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      )}

      <AnimatePresence>
        {anchored && rect && (
          <motion.div
            key={`ring-${index}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-none absolute rounded-full ring-2 ring-teal/70"
            style={{
              top: rect.top - 6,
              left: rect.left - 8,
              width: rect.width + 16,
              height: rect.height + 12,
              boxShadow: "0 0 0 9999px rgb(var(--background) / 0.6)",
            }}
          />
        )}
      </AnimatePresence>

      {anchored && rect && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 text-brand"
          initial={false}
          animate={{
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height + 2,
            opacity: 1,
          }}
          transition={{ type: "tween", duration: 0.5, ease: EASE_OUT }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <MousePointer2 className="h-5 w-5 -scale-x-100 drop-shadow" />
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          ref={cardRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="glass absolute rounded-2xl p-5 shadow-panel outline-none"
          style={cardStyle}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
              Step {index + 1} of {tourSteps.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="-mr-1 -mt-1 inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground/65 transition-colors hover:text-foreground"
              aria-label="End tour"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <h2
            id={TITLE_ID}
            className="mt-2 font-display text-lg font-semibold text-foreground"
          >
            {step.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">
            {step.body}
          </p>

          <div className="mt-5 flex items-center gap-1.5" aria-hidden>
            {tourSteps.map((s, i) => (
              <span
                key={s.target}
                className={
                  "h-1.5 rounded-full transition-all " +
                  (i === index ? "w-5 bg-teal" : "w-1.5 bg-overlay/20")
                }
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center px-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              Skip
            </button>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/[var(--border-alpha)] px-4 text-sm text-foreground/75 transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={isLast ? onClose : next}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-teal px-5 text-sm font-medium text-ink-950 transition-all hover:bg-teal-soft"
              >
                {isLast ? "Done" : "Next"}
                {!isLast && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
