"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

// Wraps next-themes. Light is the default in this project; the choice is persisted to
// localStorage by next-themes and applied as a `class` on <html> before paint
// (see the inline script next-themes injects), which avoids a flash/mismatch.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
