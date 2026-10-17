import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoritesPage from "@/app/favorites/page";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { makeStore } from "@/store";
import { renderWithStore } from "@/test-utils/render";
import type { ContentItem } from "@/types/content";

const movie: ContentItem = {
  id: "movie-fav-1",
  type: "movie",
  title: "Compile",
  description: "A small team races a compiler patch.",
  image: null,
  category: "technology",
  source: "TMDB (mock)",
  publishedAt: "2025-03-21",
  externalUrl: "https://www.themoviedb.org/",
  rating: 8.4,
};

describe("Favorites page", () => {
  it("shows an empty state with no favorites", () => {
    renderWithStore(<FavoritesPage />);
    expect(screen.getByText("Nothing saved yet")).toBeInTheDocument();
  });

  it("renders saved items and can remove them", async () => {
    const store = makeStore();
    store.dispatch(toggleFavorite(movie));
    const user = userEvent.setup();
    renderWithStore(<FavoritesPage />, { store });
    expect(screen.getByText("Compile")).toBeInTheDocument();
    await user.click(screen.getByTestId("favorite-toggle"));
    expect(screen.getByText("Nothing saved yet")).toBeInTheDocument();
  });
});
