export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center pt-32"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-border/[var(--border-alpha)] border-t-brand"
          aria-hidden
        />
        <span className="text-sm text-foreground/65">Loading…</span>
      </div>
    </div>
  );
}
