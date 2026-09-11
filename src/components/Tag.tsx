import { cn } from "@/lib/cn";

// Small pill used for project tags, tools, and status labels.
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/[var(--border-alpha)] bg-overlay/[0.03] px-3 py-1 text-xs font-medium text-foreground/65",
        className,
      )}
    >
      {children}
    </span>
  );
}
