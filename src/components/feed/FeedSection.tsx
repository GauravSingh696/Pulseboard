"use client";

import { motion } from "framer-motion";
import { ContentGrid } from "@/components/feed/ContentGrid";
import { FilterChips } from "@/components/feed/FilterChips";
import { LoadMoreButton } from "@/components/feed/LoadMoreButton";
import { SortableFeed } from "@/components/feed/SortableFeed";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useUnifiedFeed } from "@/hooks/useUnifiedFeed";

export function FeedSection({
  sortable = false,
  kind = "feed",
  title,
}: {
  sortable?: boolean;
  kind?: "feed" | "trending";
  title?: string;
}) {
  const { items, isLoading, isError, refetch, loadMore, canLoadMore } = useUnifiedFeed(kind);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      {title ? (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          {!isLoading && items.length > 0 ? (
            <span className="text-xs font-medium text-[var(--muted)]">
              {items.length} items
            </span>
          ) : null}
        </div>
      ) : null}
      <FilterChips />
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : null}
      {isError ? (
        <ErrorState onRetry={refetch} description="One or more content sources failed to load." />
      ) : null}
      {!isLoading && !isError && items.length === 0 ? (
        <EmptyState
          title="No content yet"
          description="Try another category, enable more content types in Settings, or clear your search filters."
        />
      ) : null}
      {!isLoading && items.length > 0 ? (
        sortable ? <SortableFeed items={items} /> : <ContentGrid items={items} />
      ) : null}
      {!isLoading && items.length > 0 && canLoadMore ? <LoadMoreButton onClick={loadMore} /> : null}
    </motion.section>
  );
}
