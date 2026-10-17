import { NextRequest, NextResponse } from "next/server";
import { NEWS_CATEGORY_MAP } from "@/lib/constants";
import { mapNewsArticle } from "@/lib/api/mappers";
import { filterByCategory, MOCK_NEWS, paginate, searchItems } from "@/lib/api/mock-data";
import { parseCategories, parsePage, parsePageSize } from "@/lib/api/query";
import type { Category, ContentItem } from "@/types/content";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categories = parseCategories(searchParams.get("categories"));
  const page = parsePage(searchParams.get("page"));
  const pageSize = parsePageSize(searchParams.get("pageSize"));
  const query = searchParams.get("q")?.trim() ?? "";
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(mockNews(categories, page, pageSize, query));
  }

  try {
    const category = categories[0] ?? "technology";
    const endpoint = query
      ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&page=${page}&language=en&sortBy=publishedAt`
      : `https://newsapi.org/v2/top-headlines?category=${NEWS_CATEGORY_MAP[category]}&pageSize=${pageSize}&page=${page}&language=en`;

    const response = await fetch(endpoint, {
      headers: {
        "X-Api-Key": apiKey,
        "User-Agent": "Pulseboard/1.0",
      },
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      return NextResponse.json(mockNews(categories, page, pageSize, query));
    }

    const data = (await response.json()) as {
      articles?: Array<Parameters<typeof mapNewsArticle>[0]>;
      totalResults?: number;
    };

    const items = (data.articles ?? [])
      .map((article, index) => mapNewsArticle(article, category as Category, index))
      .filter((item): item is ContentItem => Boolean(item));

    return NextResponse.json({
      items,
      page,
      totalPages: Math.max(1, Math.ceil((data.totalResults ?? items.length) / pageSize)),
      totalResults: data.totalResults ?? items.length,
      usingMock: false,
      sourceLabel: "NewsAPI",
    });
  } catch {
    return NextResponse.json(mockNews(categories, page, pageSize, query));
  }
}

function mockNews(categories: Category[], page: number, pageSize: number, query: string) {
  const filtered = searchItems(filterByCategory(MOCK_NEWS, categories), query);
  return {
    ...paginate(filtered, page, pageSize),
    usingMock: true,
    sourceLabel: "Mock news data",
  };
}
