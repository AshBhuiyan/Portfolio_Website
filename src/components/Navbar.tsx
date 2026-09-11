"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { Container } from "./Container";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./Button";
import { useTour } from "./tour/TourProvider";
import { cn } from "@/lib/cn";

function getFocusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { startTour } = useTour();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setOpen(false);
    };
    onChange(mq);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel ? getFocusable(panel) : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = getFocusable(panel);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Return focus to the toggle when the menu closes (after it was open).
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      toggleRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/[var(--border-alpha)] bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.name} — home`}
        >
          <BrandLogo
            variant="nav"
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-semibold text-foreground">
              {siteConfig.name}
            </span>
            <span className="text-[11px] text-foreground/65">
              {siteConfig.roleShort}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-tour={link.label.toLowerCase()}
              className={cn(
                "group relative rounded-full px-4 py-2 text-sm transition-colors",
                isActive(link.href)
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground",
              )}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
              <span
                className={cn(
                  "pointer-events-none absolute bottom-1 left-4 right-4 h-px origin-center rounded-full bg-brand/70 transition-transform duration-300 ease-out",
                  isActive(link.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100",
                )}
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={startTour}
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-border/[var(--border-alpha)] text-foreground/70 transition-colors hover:border-border-strong/[var(--border-strong-alpha)] hover:text-foreground md:inline-flex"
            aria-label="Start a quick guided tour of the site"
            title="Quick tour"
          >
            <Compass className="h-[18px] w-[18px]" />
          </button>

          <ThemeToggle />

          <Button
            href="/contact"
            size="md"
            className="hidden lg:inline-flex"
          >
            Let&apos;s Connect
            <ArrowUpRight className="h-4 w-4" />
          </Button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/[var(--border-alpha)] text-foreground/80 transition-colors hover:border-border-strong/[var(--border-strong-alpha)] hover:text-foreground md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id={menuId}
          ref={panelRef}
          className="border-t border-border/[var(--border-alpha)] bg-background/95 backdrop-blur-xl md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm transition-colors",
                  isActive(link.href)
                    ? "bg-overlay/[0.04] text-foreground"
                    : "text-foreground/70 hover:bg-overlay/[0.03] hover:text-foreground",
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" size="md" className="mt-2 w-full">
              Let&apos;s Connect
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
