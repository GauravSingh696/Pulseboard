import { cn } from "@/lib/utils/cn";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-3",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={label ?? "Loading"}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-solid border-[var(--accent)] border-t-transparent",
          sizeClasses[size],
        )}
      />
      {label ? (
        <span className="text-sm font-medium text-[var(--muted)] animate-pulse">
          {label}
        </span>
      ) : (
        <span className="sr-only">Loading...</span>
      )}
    </div>
  );
}
