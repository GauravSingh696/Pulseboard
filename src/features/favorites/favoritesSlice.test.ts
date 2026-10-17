import type { ContentItem } from "@/types/content";
import reducer, {
  clearFavorites,
  removeFavorite,
  toggleFavorite,
} from "@/features/favorites/favoritesSlice";

const sample: ContentItem = {
  id: "news-1",
  type: "news",
  title: "Hello",
  description: "World",
  image: null,
  category: "technology",
  source: "Test",
  publishedAt: "2024-01-01",
  externalUrl: "https://example.com",
};

describe("favoritesSlice", () => {
  it("adds and removes a favorite", () => {
    const added = reducer({ items: {}, ids: [] }, toggleFavorite(sample));
    expect(added.ids).toEqual(["news-1"]);
    expect(added.items["news-1"]?.title).toBe("Hello");
    const removed = reducer(added, toggleFavorite(sample));
    expect(removed.ids).toEqual([]);
  });

  it("removes by id", () => {
    const added = reducer({ items: {}, ids: [] }, toggleFavorite(sample));
    expect(reducer(added, removeFavorite("news-1")).ids).toEqual([]);
  });

  it("clears all favorites", () => {
    const added = reducer({ items: {}, ids: [] }, toggleFavorite(sample));
    expect(reducer(added, clearFavorites()).ids).toEqual([]);
  });
});
