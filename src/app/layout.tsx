import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTransition } from "@/components/PageTransition";
import { TourProvider } from "@/components/tour/TourProvider";
import { DocumentVisibilityClass } from "@/lib/useMotionActive";
import { siteUrl, withCanonical } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const SITE_TITLE = "Ash Bhuiyan — Data & Systems Analysis";
const SITE_DESCRIPTION =
  "Software Engineering student at Iowa State with a Data Science minor — data analysis, systems, and workflow analysis.";
const SITE_URL = siteUrl;

export const metadata: Metadata = withCanonical("/", {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Ash Bhuiyan",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Ash Bhuiyan",
    "Data Analysis",
    "Systems Analysis",
    "Business Analysis",
    "Information Systems",
    "Software Engineering",
    "Data Science",
    "Iowa State University",
    "Portfolio",
  ],
  authors: [{ name: "Ash Bhuiyan" }],
  creator: "Ash Bhuiyan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Ash Bhuiyan",
    images: [
      {
        url: "/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ash Bhuiyan — Data & Systems Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/logo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
});

// App default theme is light (class-based, enableSystem=false). Pin chrome to
// light so a dark-OS visitor doesn't get dark browser UI around a light site.
export const viewport: Viewport = {
  themeColor: "#f1f4f8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="ash-theme-v1"
        >
          <DocumentVisibilityClass />
          <TourProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-ink-950"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </TourProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
