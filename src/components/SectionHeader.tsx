"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  fluidReveal,
  softReveal,
  staggerSpring,
  viewportFluid,
  EASE_FLUID,
} from "@/lib/motion";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading level — use h1 on dedicated page intros. */
  as?: "h1" | "h2";
};

const lineDraw = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: EASE_FLUID, delay: 0.05 },
  },
};

// Consistent, animated section heading with an optional eyebrow label.
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionHeaderProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const inView = useInView(ref, {
    once: true,
    amount: viewportFluid.amount,
    margin: viewportFluid.margin,
  });
  const seenOnMount = useRef<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || seenOnMount.current !== null) return;
    seenOnMount.current = inView;
  }, [mounted, inView]);

  const show =
    reduce ||
    !mounted ||
    seenOnMount.current === true ||
    inView;

  const TitleTag = as === "h1" ? motion.h1 : motion.h2;

  return (
    <motion.div
      ref={ref}
      variants={staggerSpring}
      initial={false}
      animate={show ? "visible" : "hidden"}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={staggerSpring}
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand",
            align === "center" && "justify-center",
          )}
        >
          <motion.span
            variants={lineDraw}
            className="h-px w-6 origin-left bg-teal/50"
            aria-hidden
          />
          <motion.span variants={softReveal}>{eyebrow}</motion.span>
        </motion.span>
      )}
      <TitleTag
        variants={fluidReveal}
        className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </TitleTag>
      {description && (
        <motion.p
          variants={softReveal}
          className="mt-4 text-base leading-relaxed text-foreground/70"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
