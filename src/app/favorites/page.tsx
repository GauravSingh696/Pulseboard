"use client";

import { useMemo } from "react";
import { ContentGrid } from "@/components/feed/ContentGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { clearFavorites } from "@/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const items = useMemo(
    () => favorites.ids.map((id) => favorites.items[id]).filter(Boolean),
    [favorites],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)]/60 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Saved news, movies, and social posts stay on this device.
          </p>
        </div>
        {items.length > 0 ? (
          <Button
            variant="ghost"
            className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 active:scale-95 transition-all text-xs font-semibold"
            onClick={() => dispatch(clearFavorites())}
          >
            Clear all
          </Button>
        ) : null}
      </div>
      {items.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          description="Use the heart on a content card to add it to this list."
        />
      ) : (
        <ContentGrid items={items} />
      )}
    </div>
  );
}
