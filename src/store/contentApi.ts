import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, ContentItem, ContentType, PaginatedResponse } from "@/types/content";

interface ListArgs {
  categories?: Category[];
  page?: number;
  pageSize?: number;
  query?: string;
  kind?: "feed" | "trending";
}

interface SearchArgs {
  query: string;
  types?: ContentType[];
}

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["News", "Movies", "Social", "Search"],
  endpoints: (builder) => ({
    getNews: builder.query<PaginatedResponse<ContentItem>, ListArgs>({
      query: ({ categories = [], page = 1, pageSize = 8, query, kind }) => {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          categories: categories.join(","),
        });
        if (query) params.set("q", query);
        if (kind) params.set("kind", kind);
        return `/news?${params.toString()}`;
      },
      providesTags: ["News"],
    }),
    getMovies: builder.query<PaginatedResponse<ContentItem>, ListArgs>({
      query: ({ categories = [], page = 1, pageSize = 8, query, kind }) => {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          categories: categories.join(","),
        });
        if (query) params.set("q", query);
        if (kind) params.set("kind", kind);
        return `/movies?${params.toString()}`;
      },
      providesTags: ["Movies"],
    }),
    getSocial: builder.query<PaginatedResponse<ContentItem>, ListArgs>({
      query: ({ categories = [], page = 1, pageSize = 8, query, kind }) => {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          categories: categories.join(","),
        });
        if (query) params.set("q", query);
        if (kind) params.set("kind", kind);
        return `/social?${params.toString()}`;
      },
      providesTags: ["Social"],
    }),
    searchContent: builder.query<
      { items: ContentItem[]; usingMock: boolean },
      SearchArgs
    >({
      query: ({ query, types = [] }) => {
        const params = new URLSearchParams({ q: query, types: types.join(",") });
        return `/search?${params.toString()}`;
      },
      providesTags: ["Search"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetMoviesQuery,
  useGetSocialQuery,
  useSearchContentQuery,
  useLazySearchContentQuery,
} = contentApi;
