import type { Category, ContentItem, ContentType } from "@/types/content";

export function isCategory(value: string): value is Category {
  return [
    "technology",
    "business",
    "sports",
    "entertainment",
    "science",
    "health",
  ].includes(value);
}

export function isContentType(value: string): value is ContentType {
  return ["news", "movie", "social"].includes(value);
}

export function applyOrder(items: ContentItem[], order: string[]): ContentItem[] {
  if (order.length === 0) return items;
  const byId = new Map(items.map((item) => [item.id, item]));
  const ordered: ContentItem[] = [];
  for (const id of order) {
    const item = byId.get(id);
    if (item) {
      ordered.push(item);
      byId.delete(id);
    }
  }
  return [...ordered, ...byId.values()];
}

export function withFavoriteFlag(items: ContentItem[], favoriteIds: string[]): ContentItem[] {
  const favorites = new Set(favoriteIds);
  return items.map((item) => ({ ...item, isFavorite: favorites.has(item.id) } as ContentItem));
}

export function fallbackImageLabel(title: string): string {
  return title.trim() ? title.slice(0, 1).toUpperCase() : "?";
}
