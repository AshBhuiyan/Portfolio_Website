"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useMotionActive } from "@/lib/useMotionActive";
import { cn } from "@/lib/cn";

// Slow-drifting ambient dots for the hero background. Pure CSS transforms/
// opacity (no layout thrash). Deterministic positions so SSR and client match.
// Paused off-screen / when the tab is hidden via .motion-paused + data-anim.

const PARTICLES = [
  { top: "18%", left: "8%", size: 6, delay: "0s", duration: "9s", accent: false },
  { top: "32%", left: "22%", size: 4, delay: "1.2s", duration: "11s", accent: true },
  { top: "12%", left: "44%", size: 5, delay: "2.1s", duration: "10s", accent: false },
  { top: "62%", left: "14%", size: 4, delay: "0.6s", duration: "12s", accent: true },
  { top: "74%", left: "38%", size: 6, delay: "1.8s", duration: "9.5s", accent: false },
  { top: "26%", left: "68%", size: 5, delay: "2.6s", duration: "10.5s", accent: true },
  { top: "55%", left: "82%", size: 4, delay: "0.9s", duration: "11.5s", accent: false },
  { top: "82%", left: "70%", size: 5, delay: "3.1s", duration: "9s", accent: true },
  { top: "44%", left: "52%", size: 3, delay: "1.4s", duration: "13s", accent: false },
  { top: "8%", left: "78%", size: 4, delay: "0.4s", duration: "10s", accent: false },
  { top: "48%", left: "6%", size: 3, delay: "2.8s", duration: "12.5s", accent: true },
  { top: "88%", left: "48%", size: 5, delay: "1.1s", duration: "11s", accent: false },
];

export function HeroParticles() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const active = useMotionActive(ref, reduce);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        !active && "motion-paused",
      )}
      aria-hidden
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`particle absolute rounded-full blur-[1px] ${
            p.accent ? "bg-accent/40" : "bg-teal/40"
          }`}
          style={
            {
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              "--p-delay": p.delay,
              "--p-duration": p.duration,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
