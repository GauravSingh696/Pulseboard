import { NextRequest, NextResponse } from "next/server";
import { MOCK_MOVIES, MOCK_NEWS, MOCK_SOCIAL, searchItems } from "@/lib/api/mock-data";
import { mapNewsArticle, mapTmdbMovie } from "@/lib/api/mappers";
import { CONTENT_TYPES, type ContentItem, type ContentType } from "@/types/content";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q")?.trim() ?? "";
  const types = parseTypes(searchParams.get("types"));
  if (query.length < 2) {
    return NextResponse.json({ items: [], usingMock: true });
  }

  const buckets: ContentItem[] = [];
  let usingMock = false;

  if (types.includes("news")) {
    const news = await fetchNews(query);
    buckets.push(...news.items);
    usingMock = usingMock || news.usingMock;
  }
  if (types.includes("movie")) {
    const movies = await fetchMovies(query);
    buckets.push(...movies.items);
    usingMock = usingMock || movies.usingMock;
  }
  if (types.includes("social")) {
    buckets.push(...searchItems(MOCK_SOCIAL, query));
    usingMock = true;
  }

  return NextResponse.json({ items: buckets, usingMock });
}

function parseTypes(value: string | null): ContentType[] {
  if (!value) return [...CONTENT_TYPES];
  const parsed = value
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is ContentType => CONTENT_TYPES.includes(item as ContentType));
  return parsed.length > 0 ? parsed : [...CONTENT_TYPES];
}

async function fetchNews(query: string): Promise<{ items: ContentItem[]; usingMock: boolean }> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return { items: searchItems(MOCK_NEWS, query), usingMock: true };
  }
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=8&language=en&sortBy=publishedAt`,
      {
        headers: {
          "X-Api-Key": apiKey,
          "User-Agent": "Pulseboard/1.0",
        },
        next: { revalidate: 60 },
      },
    );
    if (!response.ok) return { items: searchItems(MOCK_NEWS, query), usingMock: true };
    const data = (await response.json()) as { articles?: Array<Parameters<typeof mapNewsArticle>[0]> };
    const items = (data.articles ?? [])
      .map((article, index) => mapNewsArticle(article, "technology", index))
      .filter((item): item is ContentItem => Boolean(item));
    return { items, usingMock: false };
  } catch {
    return { items: searchItems(MOCK_NEWS, query), usingMock: true };
  }
}

async function fetchMovies(query: string): Promise<{ items: ContentItem[]; usingMock: boolean }> {
  const token = process.env.TMDB_API_TOKEN;
  if (!token) {
    return { items: searchItems(MOCK_MOVIES, query), usingMock: true };
  }
  try {
    const isV3Key = token.length < 60 && !token.startsWith("eyJ");
    const endpoint = isV3Key
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1&api_key=${token}`
      : `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`;

    const headers: Record<string, string> = { accept: "application/json" };
    if (!isV3Key) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      headers,
      next: { revalidate: 60 },
    });
    if (!response.ok) return { items: searchItems(MOCK_MOVIES, query), usingMock: true };
    const data = (await response.json()) as { results?: Array<Parameters<typeof mapTmdbMovie>[0]> };
    const items = (data.results ?? []).slice(0, 8).map((movie) => mapTmdbMovie(movie, "entertainment"));
    return { items, usingMock: false };
  } catch {
    return { items: searchItems(MOCK_MOVIES, query), usingMock: true };
  }
}
