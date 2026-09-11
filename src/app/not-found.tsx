import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center pt-32">
      <Container className="max-w-xl text-center">
        <p className="font-display text-7xl font-semibold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
          This page wandered off
        </h1>
        <p className="mt-3 text-base leading-relaxed text-foreground/70">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Button>
        </div>
        <p className="mt-6 text-sm text-foreground/60">
          Or{" "}
          <Link href="/contact" className="font-medium text-brand hover:underline">
            get in touch
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
