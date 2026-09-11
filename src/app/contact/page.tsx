import type { Metadata } from "next";
import { Mail, Linkedin, Github, Music, Briefcase } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig, withCanonical } from "@/data/site";

export const metadata: Metadata = withCanonical("/contact", {
  title: "Contact",
  description:
    "Get in touch with Ash Bhuiyan about internships, product and design work, collaborations, or music.",
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: siteConfig.linkedin,
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "See my code",
    href: siteConfig.github,
    external: true,
  },
];

const inquiries = [
  {
    icon: Briefcase,
    title: "Internships & opportunities",
    description:
      "I'm actively looking for internships and early-career roles in product, design, and software.",
  },
  {
    icon: Music,
    title: "Music & private access",
    description:
      "Want to hear unreleased demos or full tracks? Ask here and I'll set up access.",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-8 pt-24 sm:pt-28">
      <Container>
        {/* Header */}
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand">
            <span className="h-px w-6 bg-teal/50" aria-hidden />
            Contact
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Let&apos;s Connect
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70">
            Whether it&apos;s an internship, a product or design problem, a
            collaboration, or a conversation about music — I&apos;d genuinely
            like to hear from you.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: channels + inquiries */}
          <Reveal className="space-y-8">
            <div className="space-y-3">
              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-4 transition-all hover:-translate-y-0.5 hover:border-border-strong/[var(--border-strong-alpha)] hover:bg-surface shadow-card hover:shadow-lift"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.03] text-brand transition-all group-hover:border-border-strong/[var(--border-strong-alpha)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-foreground/65">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-foreground/80">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-4">
              {inquiries.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-5"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-brand" />
                    <h2 className="font-display text-base font-semibold text-foreground">
                      {title}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
