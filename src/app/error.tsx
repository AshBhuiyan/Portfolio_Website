"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center pt-32">
      <Container className="max-w-xl text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border/[var(--border-alpha)] bg-overlay/[0.04] text-brand">
          <AlertTriangle className="h-6 w-6" aria-hidden />
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="mt-3 text-base leading-relaxed text-foreground/70">
          An unexpected error stopped this page from loading. You can try again,
          or head home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" size="lg" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary" size="lg">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Button>
        </div>
        <p className="mt-6 text-xs text-foreground/60">
          Prefer email?{" "}
          <Link href="/contact" className="font-medium text-brand hover:underline">
            Contact me
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
