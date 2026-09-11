"use client";

import { useCallback, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { BarChart3, Database, GitBranch, LayoutDashboard } from "lucide-react";
import { EASE_FLUID } from "@/lib/motion";
import { useMotionActive } from "@/lib/useMotionActive";
import { cn } from "@/lib/cn";

/**
 * Hero right-side visual: one central analytics-workspace panel + ≤3 badges.
 *
 * To swap in a real dashboard screenshot later:
 * 1. Drop an image at `public/images/hero-dashboard.png` (or similar).
 * 2. Replace `<AnalyticsWorkspacePanel />` below with a Next.js `<Image>`
 *    inside the same `data-hero-illustration` frame (keep the browser chrome
 *    or remove it if the screenshot already includes chrome).
 * 3. Leave the floating badges as-is, or hide them if the screenshot is busy.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useMotionActive(rootRef, reduce);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.8 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || !active) return;
      if (e.pointerType !== "mouse") return;
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [reduce, active, pointerX, pointerY],
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const float = (delay: number, yRange = 10, rotate = 0.4) =>
    !active
      ? {}
      : {
          animate: {
            y: [0, -yRange * 0.7, -yRange, -yRange * 0.35, 0],
            rotate: [0, rotate, 0, -rotate * 0.5, 0],
          },
          transition: {
            duration: 7 + delay * 0.4,
            repeat: Infinity,
            ease: EASE_FLUID,
            delay,
          },
        };

  return (
    <motion.div
      ref={rootRef}
      className={cn(
        "relative aspect-[5/4] w-full max-w-md sm:max-w-lg",
        !active && "motion-paused",
      )}
      aria-hidden="true"
      tabIndex={-1}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
      }
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="glow-radial absolute inset-4 -z-10 blur-2xl opacity-70"
        aria-hidden
      />

      <div
        className="absolute inset-8 -z-10 rounded-3xl bg-grid-faint [background-size:24px_24px] opacity-50"
        aria-hidden
      />

      {/* Main analytics workspace — swap this block for a screenshot later */}
      <div
        data-hero-illustration
        className="absolute inset-x-4 inset-y-5 sm:inset-x-5 sm:inset-y-6"
      >
        <AnalyticsWorkspacePanel />
      </div>

      {/* Chips hang off the outer frame edges — not over panel interiors */}
      <motion.div
        {...float(0.4, 8, 0.35)}
        className="glass absolute -left-1 top-2 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 shadow-panel sm:-left-2 sm:top-3"
      >
        <Database className="h-3.5 w-3.5 text-brand" />
        <span className="text-[11px] font-medium text-foreground/75">
          SQL analysis
        </span>
      </motion.div>

      <motion.div
        {...float(1.1, 9, 0.4)}
        className="glass absolute -right-1 top-3 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 shadow-panel sm:-right-2 sm:top-4"
      >
        <GitBranch className="h-3.5 w-3.5 text-brand2" />
        <span className="text-[11px] font-medium text-foreground/75">
          Workflow mapping
        </span>
      </motion.div>

      <motion.div
        {...float(1.8, 7, 0.3)}
        className="glass absolute -bottom-1 left-3 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 shadow-panel sm:-bottom-2 sm:left-5"
      >
        <LayoutDashboard className="h-3.5 w-3.5 text-brand" />
        <span className="text-[11px] font-medium text-foreground/75">
          Dashboard reporting
        </span>
      </motion.div>
    </motion.div>
  );
}

function AnalyticsWorkspacePanel() {
  const categories = [
    { label: "Network", width: "88%" },
    { label: "Access", width: "64%" },
    { label: "Hardware", width: "72%" },
    { label: "Other", width: "40%" },
  ];
  const linePoints = "8,52 28,44 48,48 68,30 88,36 108,22 128,28 148,16";
  // Abstract funnel proportions — not real metrics
  const rows = [
    { label: "Intake", width: "100%" },
    { label: "Triage", width: "82%" },
    { label: "Handoff", width: "64%" },
    { label: "Resolve", width: "48%" },
  ];

  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-2xl shadow-panel">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border/[var(--border-alpha)] px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-overlay/20" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-border/[var(--border-alpha)] bg-overlay/[0.04] px-2.5 py-1">
          <BarChart3 className="h-3 w-3 shrink-0 text-foreground/45" />
          <span className="truncate text-[10px] text-foreground/50">
            analytics workspace
          </span>
        </div>
      </div>

      <div className="grid flex-1 gap-3 p-3.5 sm:grid-cols-[1.15fr_0.85fr] sm:gap-3.5 sm:p-4">
        {/* Line chart — shapes only, no numeric labels */}
        <div className="rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.03] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/55">
              Trend
            </span>
            <span className="h-1.5 w-10 rounded-full bg-brand/40" />
          </div>
          <svg
            viewBox="0 0 160 64"
            className="h-[72px] w-full sm:h-[88px]"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="hero-line-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(var(--brand))" stopOpacity="0.22" />
                <stop offset="100%" stopColor="rgb(var(--brand))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M${linePoints} L148,64 L8,64 Z`}
              fill="url(#hero-line-fill)"
            />
            <polyline
              points={linePoints}
              className="stroke-brand"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="68" cy="30" r="3" className="fill-background stroke-brand" strokeWidth="1.5" />
            <circle cx="108" cy="22" r="3" className="fill-background stroke-brand" strokeWidth="1.5" />
            <circle cx="148" cy="16" r="3" className="fill-background stroke-brand" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Category bars — short horizontal bars of varying length */}
        <div className="rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.03] p-3">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/55">
              Categories
            </span>
            <span className="h-1.5 w-8 rounded-full bg-brand2/40" />
          </div>
          <div className="flex h-[72px] flex-col justify-center gap-2 sm:h-[88px]">
            {categories.map((cat) => (
              <div key={cat.label} className="flex items-center gap-2">
                <span className="w-12 shrink-0 text-[9px] text-foreground/50">
                  {cat.label}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-overlay/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand2/55 to-brand2/25"
                    style={{ width: cat.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel stages — abstract proportions, no metrics */}
        <div className="rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.03] p-3 sm:col-span-2">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/55">
              Workflow stages
            </span>
            <span className="h-1.5 w-12 rounded-full bg-overlay/15" />
          </div>
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-[10px] text-foreground/55">
                  {row.label}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-overlay/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal/50 to-accent/40"
                    style={{ width: row.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
