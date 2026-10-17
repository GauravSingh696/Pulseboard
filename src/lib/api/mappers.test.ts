import { mapNewsArticle, mapTmdbMovie } from "@/lib/api/mappers";

describe("mappers", () => {
  it("drops removed or empty news articles", () => {
    expect(mapNewsArticle({ title: "[Removed]" }, "technology", 0)).toBeNull();
    expect(mapNewsArticle({ title: "  " }, "technology", 1)).toBeNull();
  });

  it("fills missing news description and source", () => {
    const item = mapNewsArticle(
      { title: "Chip news", url: "https://example.com/a" },
      "technology",
      2,
    );
    expect(item?.description).toMatch(/No description/);
    expect(item?.source).toBe("News");
    expect(item?.image).toBeNull();
  });

  it("maps TMDB movies and posters", () => {
    const item = mapTmdbMovie(
      {
        id: 42,
        title: "Signal Drift",
        overview: "",
        poster_path: "/abc.jpg",
        vote_average: 8.12,
        genre_ids: [878],
      },
      "entertainment",
    );
    expect(item.id).toBe("movie-42");
    expect(item.image).toContain("/abc.jpg");
    expect(item.category).toBe("science");
    expect(item.description).toMatch(/No overview/);
  });
});
