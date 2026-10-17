import { NextRequest, NextResponse } from "next/server";
import { mapTmdbMovie } from "@/lib/api/mappers";
import { filterByCategory, MOCK_MOVIES, paginate, searchItems } from "@/lib/api/mock-data";
import { parseCategories, parsePage, parsePageSize } from "@/lib/api/query";
import type { Category, ContentItem } from "@/types/content";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categories = parseCategories(searchParams.get("categories"));
  const page = parsePage(searchParams.get("page"));
  const pageSize = parsePageSize(searchParams.get("pageSize"));
  const query = searchParams.get("q")?.trim() ?? "";
  const kind = searchParams.get("kind") === "trending" ? "trending" : "popular";
  const token = process.env.TMDB_API_TOKEN;

  if (!token) {
    return NextResponse.json(mockMovies(categories, page, pageSize, query, kind));
  }

  try {
    const isV3Key = token.length < 60 && !token.startsWith("eyJ");
    const basePath = query
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`
      : kind === "trending"
        ? `https://api.themoviedb.org/3/trending/movie/day?page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?page=${page}`;

    const path = isV3Key ? `${basePath}&api_key=${token}` : basePath;
    const headers: Record<string, string> = {
      accept: "application/json",
    };
    if (!isV3Key) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(path, {
      headers,
      next: { revalidate: 180 },
    });

    if (!response.ok) {
      return NextResponse.json(mockMovies(categories, page, pageSize, query, kind));
    }

    const data = (await response.json()) as {
      results?: Array<Parameters<typeof mapTmdbMovie>[0]>;
      total_pages?: number;
      total_results?: number;
    };

    const fallbackCategory = categories[0] ?? "entertainment";
    let items: ContentItem[] = (data.results ?? []).map((movie) =>
      mapTmdbMovie(movie, fallbackCategory),
    );

    if (!query && categories.length < 6) {
      items = items.filter((item) => categories.includes(item.category));
    }

    return NextResponse.json({
      items: items.slice(0, pageSize),
      page,
      totalPages: data.total_pages ?? 1,
      totalResults: data.total_results ?? items.length,
      usingMock: false,
      sourceLabel: "TMDB",
    });
  } catch {
    return NextResponse.json(mockMovies(categories, page, pageSize, query, kind));
  }
}

function mockMovies(
  categories: Category[],
  page: number,
  pageSize: number,
  query: string,
  kind: string,
) {
  const ranked =
    kind === "trending"
      ? [...MOCK_MOVIES].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      : MOCK_MOVIES;
  const filtered = searchItems(filterByCategory(ranked, categories), query);
  return {
    ...paginate(filtered, page, pageSize),
    usingMock: true,
    sourceLabel: "Mock movie data",
  };
}
