import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface-elevated)]/60 px-6 py-14 text-center shadow-xs"
      role="status"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--surface-muted)] text-[var(--muted)] shadow-xs mb-3">
        <Inbox size={22} />
      </div>
      <h3 className="text-base font-bold tracking-tight">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-[var(--muted)] leading-relaxed">{description}</p>
    </div>
  );
}
