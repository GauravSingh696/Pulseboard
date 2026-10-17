import reducer, { setTheme, toggleTheme } from "@/features/theme/themeSlice";

describe("themeSlice", () => {
  it("toggles light and dark", () => {
    const dark = reducer({ mode: "light" }, toggleTheme());
    expect(dark.mode).toBe("dark");
    expect(reducer(dark, toggleTheme()).mode).toBe("light");
  });

  it("sets a specific theme", () => {
    expect(reducer({ mode: "light" }, setTheme("dark")).mode).toBe("dark");
  });
});
