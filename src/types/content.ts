export const CONTENT_TYPES = ["news", "movie", "social"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const CATEGORIES = [
  "technology",
  "business",
  "sports",
  "entertainment",
  "science",
  "health",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  image: string | null;
  category: Category;
  source: string;
  publishedAt: string;
  externalUrl: string;
  rating?: number;
  author?: string;
  avatar?: string;
  hashtags?: string[];
  likes?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalResults: number;
  usingMock: boolean;
  sourceLabel: string;
}

export interface SearchResults {
  news: ContentItem[];
  movies: ContentItem[];
  social: ContentItem[];
  usingMock: boolean;
}
