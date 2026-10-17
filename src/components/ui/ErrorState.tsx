import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content. Try again in a moment.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl border border-rose-200/80 bg-rose-50/70 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/20 shadow-xs"
      role="alert"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 mb-3 shadow-xs">
        <AlertCircle size={22} />
      </div>
      <h3 className="text-base font-bold tracking-tight text-rose-950 dark:text-rose-100">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-[var(--muted)] leading-relaxed">{description}</p>
      {onRetry ? (
        <Button className="mt-4 shadow-sm hover:shadow-md active:scale-95 transition-all text-xs font-semibold" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
