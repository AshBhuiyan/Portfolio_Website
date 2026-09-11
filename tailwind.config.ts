import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware tokens. Defined as CSS-variable channel
        // triplets so Tailwind's alpha modifiers (e.g. text-foreground/60)
        // continue to work in both light and dark themes.
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        // "overlay" is the neutral used for thin borders and translucent
        // glass surfaces: white-ish on dark, navy-ish on light.
        overlay: "rgb(var(--overlay) / <alpha-value>)",
        // Structural borders (theme-aware). Prefer these over overlay for edges.
        border: "rgb(var(--border) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        // Theme-adjusted accent colors used for TEXT/ICONS so contrast stays
        // accessible on both backgrounds.
        brand: "rgb(var(--brand) / <alpha-value>)",
        brand2: "rgb(var(--brand2) / <alpha-value>)",
        brand3: "rgb(var(--brand3) / <alpha-value>)",

        // Deep, near-black foundation layers (used by abstract visuals).
        ink: {
          950: "#05070d",
          900: "#080b14",
          800: "#0c111d",
          700: "#121829",
          600: "#1a2236",
        },
        // Fixed, vibrant brand accents used for buttons, glows, gradients,
        // and tinted chips/borders — kept consistent across themes.
        teal: {
          DEFAULT: "#5eead4",
          soft: "#7dd3c8",
          glow: "#2dd4bf",
        },
        accent: {
          DEFAULT: "#60a5fa",
          soft: "#93c5fd",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "serif"],
      },
      boxShadow: {
        // Soft, neutral elevation system (Stripe/Linear-style) that reads well
        // on light and dark. Used for cards, buttons, and panels.
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 14px 32px -12px rgba(15, 23, 42, 0.16)",
        lift: "0 2px 8px rgba(15, 23, 42, 0.08), 0 28px 52px -16px rgba(15, 23, 42, 0.24)",
        panel: "0 18px 48px -26px rgba(15, 23, 42, 0.30)",
        // Accent glows kept for small, intentional highlights only.
        glow: "0 0 60px -15px rgba(45, 212, 191, 0.35)",
        "glow-blue": "0 0 60px -15px rgba(96, 165, 250, 0.35)",
      },
      backgroundImage: {
        // Driven by --overlay so the hero grid reads in both light and dark.
        "grid-faint":
          "linear-gradient(to right, rgb(var(--overlay) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--overlay) / 0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
