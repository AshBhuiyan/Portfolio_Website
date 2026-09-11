import Link from "next/link";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { siteConfig, navLinks } from "@/data/site";
import { Container } from "./Container";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border/[var(--border-alpha)]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + tagline */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3">
              <BrandLogo variant="footer" />
              <span className="font-display text-base font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              {siteConfig.role} — building clear, human-centered digital
              systems shaped by software, data, teaching, technical repair, and
              music.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-foreground/65">
              <MapPin className="h-4 w-4 text-brand/70" />
              {siteConfig.location}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/65">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-foreground/70 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/65">
              Connect
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-brand"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-brand"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-brand"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/[var(--border-alpha)] pt-6 text-sm text-foreground/65 sm:flex-row sm:items-center">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-foreground/60">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
