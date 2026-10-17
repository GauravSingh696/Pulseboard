import type { Category, ContentType } from "@/types/content";

export const STORAGE_KEYS = {
  preferences: "pcd.preferences",
  favorites: "pcd.favorites",
  theme: "pcd.theme",
  feedOrder: "pcd.feedOrder",
  auth: "pcd.auth",
} as const;

export const CATEGORY_LABELS: Record<Category, string> = {
  technology: "Technology",
  business: "Business",
  sports: "Sports",
  entertainment: "Entertainment",
  science: "Science",
  health: "Health",
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  news: "News",
  movie: "Movies",
  social: "Social",
};

export const NEWS_CATEGORY_MAP: Record<Category, string> = {
  technology: "technology",
  business: "business",
  sports: "sports",
  entertainment: "entertainment",
  science: "science",
  health: "health",
};

export const TMDB_GENRE_MAP: Record<Category, number> = {
  technology: 878,
  business: 99,
  sports: 28,
  entertainment: 35,
  science: 878,
  health: 18,
};

export const DEFAULT_PAGE_SIZE = 8;
export const SEARCH_DEBOUNCE_MS = 400;
export const MIN_SEARCH_LENGTH = 2;
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
