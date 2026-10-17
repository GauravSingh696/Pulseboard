import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContentCard } from "@/components/cards/ContentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { renderWithStore } from "@/test-utils/render";
import type { ContentItem } from "@/types/content";

const item: ContentItem = {
  id: "news-card-1",
  type: "news",
  title: "On-device translation ships",
  description: "A compact model family is arriving on phones.",
  image: null,
  category: "technology",
  source: "Mock News Desk",
  publishedAt: new Date().toISOString(),
  externalUrl: "https://example.com/article",
};

describe("ContentCard", () => {
  it("renders title, description, and read more action", () => {
    renderWithStore(<ContentCard item={item} />);
    expect(screen.getByText("On-device translation ships")).toBeInTheDocument();
    expect(screen.getByText(/compact model family/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read More" })).toHaveAttribute(
      "href",
      "https://example.com/article",
    );
  });

  it("toggles favorite state", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<ContentCard item={item} />);
    await user.click(screen.getByTestId("favorite-toggle"));
    expect(store.getState().favorites.ids).toContain("news-card-1");
  });
});

describe("empty and error states", () => {
  it("renders empty copy", () => {
    renderWithStore(
      <EmptyState title="Nothing saved yet" description="Use the heart on a card." />,
    );
    expect(screen.getByText("Nothing saved yet")).toBeInTheDocument();
  });

  it("renders an error with retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    renderWithStore(<ErrorState onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalled();
  });
});
