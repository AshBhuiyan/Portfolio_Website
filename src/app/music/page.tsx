import type { Metadata } from "next";
import { Guitar, Cpu, Radio, Lock } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { MusicCard } from "@/components/MusicCard";
import { MusicWavePanel } from "@/components/MusicWavePanel";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { music, gear } from "@/data/music";
import { withCanonical } from "@/data/site";

export const metadata: Metadata = withCanonical("/music", {
  title: "Music & Sound",
  description:
    "Guitar, tone, covers, original ideas, and performance experiments by Ash Bhuiyan — preview-only.",
});

const gearItems = [
  { icon: Guitar, label: "Guitar", value: gear.guitar },
  { icon: Cpu, label: "Processor", value: gear.processor },
  { icon: Radio, label: "Influence", value: gear.influence },
];

export default function MusicPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Music hero */}
      <section className="relative overflow-hidden">
        <div
          className="glow-radial pointer-events-none absolute inset-x-0 top-0 -z-10 h-96"
          aria-hidden
        />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand">
                <span className="h-px w-6 bg-teal/50" aria-hidden />
                Music &amp; Sound
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                Guitar, tone, covers, and original ideas.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-foreground/70">
                Music is one of the ways I explore emotion, discipline,
                storytelling, and identity. This space collects selected
                previews, tone ideas, and performance work.
              </p>
            </Reveal>

            <Reveal className="lg:justify-self-end">
              <MusicWavePanel />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Featured music cards */}
      <section className="pb-8 pt-14 sm:pt-16">
        <Container>
          <SectionHeader
            eyebrow="Selected pieces"
            title="Previews & experiments"
            description="Everything here is preview-only — a window into the sound, not a download library."
          />
          <Reveal
            stagger
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {music.map((track) => (
              <MusicCard key={track.id} track={track} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Gear / tone */}
      <section className="py-12">
        <Container>
          <Reveal className="rounded-3xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                  Gear &amp; Tone
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  Built around feel, not flash
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/70">
                  {gear.focus}. I lean on a small, dependable rig and spend most
                  of my attention on phrasing and tone.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {gearItems.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] p-5"
                  >
                    <Icon className="h-5 w-5 text-brand" />
                    <p className="mt-4 text-[11px] uppercase tracking-wider text-foreground/65">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground/80">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Private listening room CTA */}
      <section className="py-12">
        <Container>
          <Reveal className="relative overflow-hidden rounded-3xl border border-border/[var(--border-alpha)] bg-gradient-to-br from-accent/[0.06] to-teal/[0.04] p-8 text-center sm:p-14">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border/[var(--border-alpha)] bg-overlay/[0.04] text-brand">
              <Lock className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Private Listening Room
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
              Some original demos and full versions are kept private to protect
              unfinished work.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" size="lg">
                <Lock className="h-4 w-4" />
                Request access by email
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
