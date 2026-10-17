"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ContentGrid } from "@/components/feed/ContentGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { MockNotice } from "@/components/dashboard/MockNotice";
import { MIN_SEARCH_LENGTH } from "@/lib/constants";
import { useSearchContentQuery } from "@/store/contentApi";
import { useAppSelector } from "@/store/hooks";

function SearchResults() {
  const params = useSearchParams();
  const query = params.get("q")?.trim() ?? "";
  const types = useAppSelector((state) => state.preferences.contentTypes);
  const skip = query.length < MIN_SEARCH_LENGTH;
  const { data, isFetching, isError, refetch } = useSearchContentQuery(
    { query, types },
    { skip },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="border-b border-[var(--line)]/60 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {skip
            ? "Type at least two characters in the header search to look across news, movies, and posts."
            : `Results for “${query}”`}
        </p>
      </div>
      <MockNotice visible={Boolean(data?.usingMock)} />
      {isFetching ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center py-2">
            <LoadingSpinner size="sm" label="Searching across news, movies, and posts..." />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : null}
      {isError ? <ErrorState onRetry={refetch} /> : null}
      {!skip && !isFetching && !isError && (data?.items.length ?? 0) === 0 ? (
        <EmptyState
          title="No matches"
          description="Try a broader term, or search for a movie title, headline, or hashtag."
        />
      ) : null}
      {!isFetching && data?.items.length ? <ContentGrid items={data.items} /> : null}
    </motion.div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[200px] items-center justify-center">
          <LoadingSpinner size="md" label="Loading search..." />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
