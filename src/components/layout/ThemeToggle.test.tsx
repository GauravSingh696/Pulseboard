import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";
import { renderWithStore } from "@/test-utils/render";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("theme toggle", () => {
  it("switches the stored theme", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<Header onMenu={() => undefined} />);
    expect(store.getState().theme.mode).toBe("light");
    await user.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(store.getState().theme.mode).toBe("dark");
  });
});
