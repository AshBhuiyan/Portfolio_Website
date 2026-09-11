"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import type { RefObject } from "react";

/** True when the tab is visible (not backgrounded). */
export function useDocumentVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return visible;
}

/**
 * Run looping animations only when the element is near the viewport and the
 * tab is visible. Off-screen / hidden-tab work is paused.
 */
export function useMotionActive(
  ref: RefObject<Element | null>,
  reduceMotion: boolean | null,
) {
  const inView = useInView(ref, { margin: "120px 0px", amount: 0.05 });
  const docVisible = useDocumentVisible();
  return Boolean(!reduceMotion && inView && docVisible);
}

/** Pauses CSS keyframe animations site-wide while the document is hidden. */
export function DocumentVisibilityClass() {
  useEffect(() => {
    const sync = () => {
      document.documentElement.dataset.anim =
        document.visibilityState === "visible" ? "on" : "off";
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      delete document.documentElement.dataset.anim;
    };
  }, []);
  return null;
}
