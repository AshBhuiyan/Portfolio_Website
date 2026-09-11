"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  fadeUpSpring,
  fluidReveal,
  staggerSpring,
  viewportFluid,
} from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  /** Richer blur + scale entrance for hero sections and CTAs */
  fluid?: boolean;
  as?: "div" | "ul" | "section";
};

/**
 * Scroll-triggered reveal. SSR and the first client paint are always visible
 * (no opacity:0 in HTML). After mount, above-fold content stays visible;
 * below-fold content animates in when it enters the viewport.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  fluid = false,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const inView = useInView(ref, {
    once: true,
    amount: viewportFluid.amount,
    margin: viewportFluid.margin,
  });
  // Capture whether the node was already on-screen when JS became ready.
  const seenOnMount = useRef<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || seenOnMount.current !== null) return;
    seenOnMount.current = inView;
  }, [mounted, inView]);

  const variants = stagger
    ? staggerSpring
    : fluid
      ? fluidReveal
      : fadeUpSpring;

  // Visible until we know it's below the fold post-mount.
  const show =
    reduce ||
    !mounted ||
    seenOnMount.current === true ||
    inView;

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as never}
      variants={variants}
      initial={false}
      animate={show ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export { fadeUpSpring as fadeUp } from "@/lib/motion";
