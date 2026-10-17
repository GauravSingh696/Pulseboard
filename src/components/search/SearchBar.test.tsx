import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input with placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText(/Search news, movies, or posts/i),
    ).toBeInTheDocument();
  });

  it("allows entering text and clears on clear button click", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "technology");
    expect(input).toHaveValue("technology");

    const clearBtn = screen.getByRole("button", { name: "Clear search" });
    await user.click(clearBtn);
    expect(input).toHaveValue("");
  });

  it("navigates on enter submission when query length is >= 2", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "space{Enter}");
    expect(pushMock).toHaveBeenCalledWith("/search?q=space");
  });
});
