import Image from "next/image";
import { cn } from "@/lib/cn";

// Full official logo with transparent breathing room around all sides.
const LOGO = "/logo/ash-bhuiyan-logo-padded.png";

type Variant = "nav" | "footer" | "loader";

type BrandLogoProps = {
  variant?: Variant;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "nav",
  className,
  priority = false,
}: BrandLogoProps) {
  if (variant === "loader") {
    return (
      <Image
        src={LOGO}
        alt="Ash Bhuiyan logo"
        width={92}
        height={92}
        priority={priority}
        sizes="92px"
        className={cn("h-[92px] w-[92px] object-contain", className)}
      />
    );
  }

  const nav = variant === "nav";
  const shellSize = nav ? 64 : 44;
  const imageSize = nav ? 52 : 34;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-visible",
        className,
      )}
      style={{ width: shellSize, height: shellSize, padding: nav ? 8 : 5 }}
    >
      {/* Optional restrained background layer. Separate from image so no mask
          can clip the logo. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 border border-border/[var(--border-alpha)] bg-surface/[var(--surface-alpha)]",
          nav ? "rounded-2xl" : "rounded-xl",
        )}
      />
      <Image
        src={LOGO}
        alt="Ash Bhuiyan logo"
        width={imageSize}
        height={imageSize}
        priority={priority}
        sizes={`${imageSize}px`}
        className={cn(
          "relative z-[1] max-h-full max-w-full object-contain",
          nav && "scale-[0.86]",
        )}
      />
    </span>
  );
}
