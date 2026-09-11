import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0";

const variants: Record<Variant, string> = {
  // Solid, confident primary (adapts per theme: near-black on light, white on
  // dark) with soft neutral elevation. Restrained and premium.
  primary:
    "border border-transparent bg-foreground text-background shadow-card hover:-translate-y-0.5 hover:shadow-lift hover:bg-foreground/90",
  // Clean outlined button on a subtle surface.
  secondary:
    "border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)] text-foreground shadow-card hover:-translate-y-0.5 hover:border-border-strong/[var(--border-strong-alpha)] hover:shadow-lift",
  // Quiet tertiary with a gentle hover affordance.
  ghost:
    "text-foreground/65 hover:bg-overlay/[0.05] hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-11 px-6 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** Opens in a new tab with rel=noopener. Do not combine with download. */
  external?: boolean;
  /** Same-tab download anchor (no target=_blank). */
  download?: boolean | string;
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className" | "download"
>;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  // Keep label/icon above the shine sweep pseudo-element.
  const content = (
    <span className="relative z-[1] inline-flex items-center gap-2">
      {children}
    </span>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, download, ...anchorRest } = rest as ButtonAsLink;

    // Plain download anchor — never force a new tab (that leaves an empty one).
    if (download !== undefined && download !== false) {
      return (
        <a
          href={href}
          download={download === true ? true : download}
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}
