"use client";

import { useEffect, useMemo, useState } from "react";
import { applyOrder } from "@/lib/utils/content";
import {
  useGetMoviesQuery,
  useGetNewsQuery,
  useGetSocialQuery,
} from "@/store/contentApi";
import { useAppSelector } from "@/store/hooks";
import type { ContentItem } from "@/types/content";

export function useUnifiedFeed(kind: "feed" | "trending" = "feed") {
  const categories = useAppSelector((state) => state.preferences.categories);
  const contentTypes = useAppSelector((state) => state.preferences.contentTypes);
  const recommendationsEnabled = useAppSelector(
    (state) => state.preferences.recommendationsEnabled,
  );
  const basePageSize = useAppSelector((state) => state.preferences.pageSize);
  const [pageSize, setPageSize] = useState(basePageSize);
  const order = useAppSelector((state) => state.feed.order);

  useEffect(() => {
    setPageSize(basePageSize);
  }, [basePageSize]);
  const activeCategory = useAppSelector((state) => state.feed.activeCategory);
  const activeType = useAppSelector((state) => state.feed.activeType);

  const includeNews = contentTypes.includes("news");
  const includeMovies = contentTypes.includes("movie") && recommendationsEnabled;
  const includeSocial = contentTypes.includes("social");

  const news = useGetNewsQuery(
    { categories, page: 1, pageSize, kind },
    { skip: !includeNews },
  );
  const movies = useGetMoviesQuery(
    { categories, page: 1, pageSize, kind },
    { skip: !includeMovies },
  );
  const social = useGetSocialQuery(
    { categories, page: 1, pageSize, kind },
    { skip: !includeSocial },
  );

  const items = useMemo(() => {
    const merged: ContentItem[] = [];
    if (includeNews) merged.push(...(news.data?.items ?? []));
    if (includeMovies) merged.push(...(movies.data?.items ?? []));
    if (includeSocial) merged.push(...(social.data?.items ?? []));
    const filtered = merged.filter((item) => {
      const categoryOk = activeCategory === "all" || item.category === activeCategory;
      const typeOk = activeType === "all" || item.type === activeType;
      return categoryOk && typeOk;
    });
    return applyOrder(filtered, order);
  }, [
    includeNews,
    includeMovies,
    includeSocial,
    news.data?.items,
    movies.data?.items,
    social.data?.items,
    activeCategory,
    activeType,
    order,
  ]);

  const usingMock = Boolean(
    news.data?.usingMock || movies.data?.usingMock || social.data?.usingMock,
  );
  const isLoading =
    (includeNews && news.isLoading) ||
    (includeMovies && movies.isLoading) ||
    (includeSocial && social.isLoading);
  const isError = news.isError || movies.isError || social.isError;
  const refetch = () => {
    if (includeNews) void news.refetch();
    if (includeMovies) void movies.refetch();
    if (includeSocial) void social.refetch();
  };

  const loadMore = () => setPageSize((current) => current + basePageSize);
  const canLoadMore =
    (news.data?.totalPages ?? 1) > 1 ||
    (movies.data?.totalPages ?? 1) > 1 ||
    (social.data?.totalPages ?? 1) > 1 ||
    items.length >= pageSize;

  return { items, usingMock, isLoading, isError, refetch, loadMore, canLoadMore };
}
