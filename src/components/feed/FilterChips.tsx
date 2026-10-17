"use client";

import { CATEGORY_LABELS, CONTENT_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { setActiveCategory, setActiveType } from "@/features/feed/feedSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CATEGORIES, CONTENT_TYPES } from "@/types/content";

export function FilterChips() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.preferences.categories);
  const types = useAppSelector((state) => state.preferences.contentTypes);
  const activeCategory = useAppSelector((state) => state.feed.activeCategory);
  const activeType = useAppSelector((state) => state.feed.activeType);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
        <Chip
          label="All categories"
          active={activeCategory === "all"}
          onClick={() => dispatch(setActiveCategory("all"))}
        />
        {CATEGORIES.filter((category) => selected.includes(category)).map((category) => (
          <Chip
            key={category}
            label={CATEGORY_LABELS[category]}
            active={activeCategory === category}
            onClick={() => dispatch(setActiveCategory(category))}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Content type filters">
        <Chip
          label="All types"
          active={activeType === "all"}
          onClick={() => dispatch(setActiveType("all"))}
        />
        {CONTENT_TYPES.filter((type) => types.includes(type)).map((type) => (
          <Chip
            key={type}
            label={CONTENT_TYPE_LABELS[type]}
            active={activeType === type}
            onClick={() => dispatch(setActiveType(type))}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95",
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-white dark:text-[#0b1a16] shadow-sm shadow-[var(--accent)]/25"
          : "border-[var(--line)] bg-[var(--surface-elevated)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)]",
      )}
    >
      {label}
    </button>
  );
}
