"use client";

import { useMemo } from "react";
import { Greeting } from "@/components/dashboard/Greeting";
import { MockNotice } from "@/components/dashboard/MockNotice";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { FeedSection } from "@/components/feed/FeedSection";
import { ContentGrid } from "@/components/feed/ContentGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { useUnifiedFeed } from "@/hooks/useUnifiedFeed";
import { useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const feed = useUnifiedFeed("feed");
  const trending = useUnifiedFeed("trending");
  const favorites = useAppSelector((state) => state.favorites);
  const favoriteItems = useMemo(
    () => favorites.ids.map((id) => favorites.items[id]).filter(Boolean),
    [favorites],
  );

  return (
    <div className="space-y-10">
      <Greeting />
      <MockNotice visible={feed.usingMock || trending.usingMock} />
      <StatsRow feedCount={feed.items.length} />
      <FeedSection sortable title="Personalized feed" />
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Trending now</h2>
          {trending.items.length > 0 ? (
            <span className="text-xs font-semibold text-[var(--accent)] hover:underline">
              Top picks
            </span>
          ) : null}
        </div>
        {trending.items.length > 0 ? (
          <ContentGrid items={trending.items.slice(0, 3)} />
        ) : (
          <EmptyState title="No trending items" description="Trending content will appear here." />
        )}
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Favorites</h2>
          {favoriteItems.length > 0 ? (
            <span className="text-xs font-medium text-[var(--muted)]">
              {favoriteItems.length} saved
            </span>
          ) : null}
        </div>
        {favoriteItems.length > 0 ? (
          <ContentGrid items={favoriteItems.slice(0, 3)} />
        ) : (
          <EmptyState
            title="No favorites yet"
            description="Tap the heart on any card to save it here."
          />
        )}
      </section>
    </div>
  );
}
