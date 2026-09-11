"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpSpring, hoverLift, tapScale } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MotionSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  as?: "article" | "div";
};

/** Scroll-reveal card shell with spring lift on hover (respects reduced motion). */
export function MotionSurface({
  children,
  className,
  as = "div",
}: MotionSurfaceProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      variants={fadeUpSpring}
      whileHover={reduce ? undefined : hoverLift}
      whileTap={reduce ? undefined : tapScale}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export const cardSurfaceClass = cn(
  "rounded-2xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] shadow-card",
  "transition-[border-color,background-color,box-shadow] duration-300",
  "hover:border-border-strong/[var(--border-strong-alpha)] hover:shadow-lift",
);
