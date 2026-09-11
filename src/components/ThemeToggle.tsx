"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  // Light is the default — show Moon (action: switch to dark) before mount.
  const showMoon = !mounted || !isDark;

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.classList.add("theme-transition");
        window.setTimeout(() => {
          document.documentElement.classList.remove("theme-transition");
        }, 320);
        setTheme(isDark ? "light" : "dark");
      }}
      className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border/[var(--border-alpha)] text-foreground/70 transition-colors hover:border-border-strong/[var(--border-strong-alpha)] hover:text-foreground"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle color theme"
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={showMoon ? "moon" : "sun"}
          initial={false}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center"
        >
          {showMoon ? (
            <Moon className="h-[18px] w-[18px]" />
          ) : (
            <Sun className="h-[18px] w-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
