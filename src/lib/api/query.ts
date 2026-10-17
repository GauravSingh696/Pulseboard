import { CATEGORIES, type Category } from "@/types/content";

export function parseCategories(value: string | null): Category[] {
  if (!value) return [...CATEGORIES];
  const parsed = value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item): item is Category =>
      CATEGORIES.includes(item as Category),
    );
  return parsed.length > 0 ? parsed : [...CATEGORIES];
}

export function parsePage(value: string | null, fallback = 1): number {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : fallback;
}

export function parsePageSize(value: string | null, fallback = 8): number {
  const size = Number(value);
  return Number.isFinite(size) ? Math.min(20, Math.max(4, Math.floor(size))) : fallback;
}
