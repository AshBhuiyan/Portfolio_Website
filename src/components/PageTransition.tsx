"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_FLUID } from "@/lib/motion";

/**
 * Subtle route-level entrance — only on client-side navigations.
 * First paint / SSR renders children with no opacity:0 so the page is
 * visible without JS and LCP is not gated on hydration.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);
  const [navKey, setNavKey] = useState(0);

  useEffect(() => {
    // First effect run is hydration for the current path — do not animate.
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    setNavKey((k) => k + 1);
  }, [pathname]);

  if (reduce || navKey === 0) {
    return <div key={pathname}>{children}</div>;
  }

  return (
    <motion.div
      key={`${pathname}-${navKey}`}
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: EASE_FLUID }}
      onAnimationComplete={() => {
        if (ref.current) {
          ref.current.style.transform = "none";
          ref.current.style.filter = "none";
        }
      }}
    >
      {children}
    </motion.div>
  );
}
