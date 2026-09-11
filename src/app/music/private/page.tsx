import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { siteConfig, withCanonical } from "@/data/site";

export const metadata: Metadata = withCanonical("/music/private", {
  title: "Private Listening Room",
  description:
    "Restricted listening area for unreleased and full-length tracks. Access is by request.",
  robots: { index: false, follow: false },
});

/**
 * PRIVATE LISTENING ROOM — REQUEST ACCESS
 * ---------------------------------------
 * There is no fake unlock form here. Access is by email request only.
 *
 * SECURITY NOTE (important):
 *  - Do NOT store full/private audio files in the `public/` folder. Anything in
 *    `public/` is served openly and is trivially downloadable.
 *
 * FOR REAL PROTECTION, a future version should use:
 *  - Auth: Supabase Auth or Clerk to gate who can reach this page.
 *  - Storage: private Supabase Storage, AWS S3, or Cloudflare R2 buckets
 *    (objects NOT publicly readable).
 *  - Delivery: server-generated, short-lived SIGNED URLs created in a route
 *    handler / server action only after the user is verified.
 *  - No public MP3 paths and no direct download links in the markup.
 *
 * HONEST LIMITATION: No client-side technique can fully prevent a determined
 * user from capturing audio they are allowed to hear. The goal is access
 * control and friction for unreleased work — not unbreakable DRM.
 */
export default function PrivateMusicPage() {
  const requestMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Private listening access — Ash Bhuiyan",
  )}&body=${encodeURIComponent(
    "Hi Ash,\n\nI'd like access to a private demo / full track. A bit about me:\n\n",
  )}`;

  return (
    <div className="pb-8 pt-24 sm:pt-28">
      <Container className="max-w-2xl">
        <Link
          href="/music"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Music
        </Link>

        <div className="mt-10 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border/[var(--border-alpha)] bg-overlay/[0.04] text-brand">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Access is by request
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
            Unreleased demos and full tracks aren&apos;t hosted on this site.
            If you&apos;d like to hear something specific, email me and I&apos;ll
            share a private link when it makes sense.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={requestMailto} external size="lg">
              <Mail className="h-4 w-4" />
              Request access by email
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact form
            </Button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border/[var(--border-alpha)] bg-surface p-6 text-sm leading-relaxed text-foreground/70 shadow-card dark:border-border/[var(--border-alpha)]">
          <h2 className="font-display text-base font-semibold text-foreground">
            How this will work later
          </h2>
          <p className="mt-3">
            A future version may add verified listening with temporary signed
            playback links. Full files will live in private cloud storage —
            never in a public folder — and there will be no fake “unlock” UI
            that pretends otherwise.
          </p>
        </div>
      </Container>
    </div>
  );
}
