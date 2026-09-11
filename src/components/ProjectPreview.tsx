import Image from "next/image";
import { cn } from "@/lib/cn";
import type { PreviewVariant } from "@/data/projects";

type Accent = "teal" | "blue" | "mixed";
export type { PreviewVariant };

const accentMap: Record<Accent, { from: string; fill: string; dot: string; stroke: string }> = {
  teal: {
    from: "from-teal/15",
    fill: "from-teal/20 to-teal/70",
    dot: "bg-teal/80",
    stroke: "stroke-teal",
  },
  blue: {
    from: "from-accent/15",
    fill: "from-accent/20 to-accent/70",
    dot: "bg-accent/80",
    stroke: "stroke-accent",
  },
  mixed: {
    from: "from-teal/10",
    fill: "from-accent/40 to-teal/70",
    dot: "bg-gradient-to-r from-teal to-accent",
    stroke: "stroke-brand",
  },
};

// Abstract, image-free preview surfaces for project cards — differentiated per
// project so the grid never reads as one template stamped repeatedly.
//
// TODO(assets): when real thumbnails exist (Figma exports / UI screenshots),
// pass `image="/projects/<slug>.png"` from the project data to render an actual
// preview; the abstract composition remains the fallback for concept-stage work.
export function ProjectPreview({
  accent = "teal",
  label,
  variant = "bars",
  bars = [42, 70, 54, 86, 60],
  image,
  className,
}: {
  accent?: Accent;
  label: string;
  variant?: PreviewVariant;
  bars?: number[];
  image?: string;
  className?: string;
}) {
  const a = accentMap[accent];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/[var(--border-alpha)] bg-overlay/[0.04] p-5",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100",
          a.from,
        )}
      />

      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", a.dot)} />
              <span className="h-2 w-2 rounded-full bg-overlay/15" />
              <span className="h-2 w-2 rounded-full bg-overlay/10" />
            </div>
            <span className="rounded-full border border-border/[var(--border-alpha)] bg-overlay/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70">
              {label}
            </span>
          </div>

          <div className="relative mt-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
            {variant === "bars" && (
              <div className="flex h-[86px] items-end gap-2">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={cn("w-full rounded-t bg-gradient-to-t", a.fill)}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            )}

            {variant === "lines" && (
              <div className="space-y-2.5">
                {[92, 74, 84, 60, 48].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 shrink-0 rounded-sm", a.dot)} />
                    <span
                      className="h-2 rounded-full bg-overlay/10"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                ))}
              </div>
            )}

            {variant === "dots" && (
              <div className="grid grid-cols-6 gap-2.5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "aspect-square rounded-md",
                      i % 5 === 0 ? a.dot : "bg-overlay/10",
                    )}
                  />
                ))}
              </div>
            )}

            {variant === "flow" && (
              <svg viewBox="0 0 220 90" className="h-[86px] w-full" fill="none">
                <polyline
                  points="4,72 40,52 76,60 112,30 148,40 184,14 216,22"
                  className={cn("fill-none", a.stroke)}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[
                  [40, 52],
                  [112, 30],
                  [184, 14],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3.5" className={cn(a.stroke, "fill-background")} strokeWidth="2" />
                ))}
              </svg>
            )}
          </div>

          <div className="relative mt-4 space-y-2">
            <div className="h-1.5 w-2/3 rounded-full bg-overlay/10" />
            <div className="h-1.5 w-2/5 rounded-full bg-overlay/[0.06]" />
          </div>
        </>
      )}
    </div>
  );
}
