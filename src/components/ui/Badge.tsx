import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--accent-muted)] px-2.5 py-0.5 text-xs font-medium capitalize text-[var(--accent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
