import type { Variants, Transition } from "framer-motion";

// Shared motion system — fluid, premium, consistent.
// Springs for interactive feedback; eased curves for entrances.

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Apple/Linear-style fluid deceleration */
export const EASE_FLUID = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  normal: 0.6,
  slow: 0.85,
} as const;

export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.85,
};

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 28,
  mass: 0.55,
};

const fluidTransition: Transition = {
  duration: DURATION.slow,
  ease: EASE_FLUID,
};

const baseTransition: Transition = {
  duration: DURATION.normal,
  ease: EASE_OUT,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_GENTLE,
  },
};

export const softReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: fluidTransition,
  },
};

export const fluidReveal: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: fluidTransition,
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_FLUID },
  },
};

export const heroVisual: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(16px)", rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotate: 0,
    transition: { ...SPRING_GENTLE, delay: 0.15 },
  },
};

export const staggerSpring: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.03 },
  },
};

export const hoverLift = {
  y: -8,
  transition: SPRING_SNAPPY,
};

export const tapScale = {
  scale: 0.98,
  transition: SPRING_SNAPPY,
};

export const viewportFluid = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -60px 0px",
} as const;
