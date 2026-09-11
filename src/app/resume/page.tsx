import type { Metadata } from "next";
import { Download, FileText, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { siteConfig, withCanonical } from "@/data/site";

const requestMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Resume request — Ash Bhuiyan",
)}&body=${encodeURIComponent(
  "Hi Ash,\n\nI'd love a copy of your resume. A bit about me / the opportunity:\n\n",
)}`;

export const metadata: Metadata = withCanonical("/resume", {
  title: "Resume",
  description:
    "Download the resume of Ash Bhuiyan — Software Engineering student focused on data and systems analysis.",
});

/**
 * No build-time filesystem gate. Both download and email paths are always
 * offered. If `public/resume.pdf` is missing, the download link 404s until
 * the file is added (no redeploy logic required beyond deploying the asset).
 */
export default function ResumePage() {
  return (
    <div className="pt-28 sm:pt-32">
      <Container className="max-w-2xl">
        <Reveal className="rounded-3xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-10 text-center sm:p-14">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border/[var(--border-alpha)] bg-overlay/[0.04] text-brand">
            <FileText className="h-6 w-6" />
          </span>

          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Resume
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
            A one-page overview of my background in software engineering, data,
            teaching, and technical repair. Prefer email? I&apos;ll send a copy
            directly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/Ash_Bhuiyan_Resume.pdf" download="Ash_Bhuiyan_Resume.pdf" size="lg">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
            <Button href={requestMailto} external variant="secondary" size="lg">
              <Mail className="h-4 w-4" />
              Request via email
            </Button>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
