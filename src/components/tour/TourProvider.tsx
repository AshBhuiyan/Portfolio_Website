"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { TourOverlay } from "./TourOverlay";
import { TourPrompt } from "./TourPrompt";

const DONE_KEY = "ab_tour_done";

type TourContextValue = {
  startTour: () => void;
};

const TourContext = createContext<TourContextValue | null>(null);

export function useTour(): TourContextValue {
  const ctx = useContext(TourContext);
  if (!ctx) {
    throw new Error("useTour must be used within TourProvider");
  }
  return ctx;
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // First-visit prompt: homepage only, md+ viewports, after intro has settled.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;
    if (localStorage.getItem(DONE_KEY)) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const t = window.setTimeout(() => setShowPrompt(true), 2800);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const markDone = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(DONE_KEY, "1");
    }
  }, []);

  const startTour = useCallback(() => {
    setShowPrompt(false);
    setActive(true);
  }, []);

  const endTour = useCallback(() => {
    setActive(false);
    markDone();
  }, [markDone]);

  const dismissPrompt = useCallback(() => {
    setShowPrompt(false);
    markDone();
  }, [markDone]);

  const value = useMemo(() => ({ startTour }), [startTour]);

  return (
    <TourContext.Provider value={value}>
      {children}
      {showPrompt && !active && (
        <TourPrompt onStart={startTour} onSkip={dismissPrompt} />
      )}
      {active && <TourOverlay onClose={endTour} />}
    </TourContext.Provider>
  );
}
