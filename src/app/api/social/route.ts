import { NextRequest, NextResponse } from "next/server";
import { filterByCategory, MOCK_SOCIAL, paginate, searchItems } from "@/lib/api/mock-data";
import { parseCategories, parsePage, parsePageSize } from "@/lib/api/query";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categories = parseCategories(searchParams.get("categories"));
  const page = parsePage(searchParams.get("page"));
  const pageSize = parsePageSize(searchParams.get("pageSize"));
  const query = searchParams.get("q")?.trim() ?? "";
  const kind = searchParams.get("kind");

  const source =
    kind === "trending"
      ? [...MOCK_SOCIAL].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
      : MOCK_SOCIAL;
  const filtered = searchItems(filterByCategory(source, categories), query);

  return NextResponse.json({
    ...paginate(filtered, page, pageSize),
    usingMock: true,
    sourceLabel: "Mock social feed",
  });
}
