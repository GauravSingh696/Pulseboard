import reducer, {
  defaultPreferences,
  resetPreferences,
  setCategories,
  setPageSize,
  toggleCategory,
  toggleContentType,
} from "@/features/preferences/preferencesSlice";

describe("preferencesSlice", () => {
  it("toggles a category on and off", () => {
    let state = reducer(defaultPreferences, toggleCategory("health"));
    expect(state.categories.includes("health")).toBe(false);
    state = reducer(state, toggleCategory("health"));
    expect(state.categories.includes("health")).toBe(true);
  });

  it("does not allow removing the last category", () => {
    const state = reducer(
      { ...defaultPreferences, categories: ["sports"] },
      toggleCategory("sports"),
    );
    expect(state.categories).toEqual(["sports"]);
  });

  it("clamps page size", () => {
    expect(reducer(defaultPreferences, setPageSize(100)).pageSize).toBe(16);
    expect(reducer(defaultPreferences, setPageSize(1)).pageSize).toBe(4);
  });

  it("keeps at least one content type", () => {
    const onlyNews = reducer(defaultPreferences, toggleContentType("movie"));
    const stillNews = reducer(
      { ...onlyNews, contentTypes: ["news"] },
      toggleContentType("news"),
    );
    expect(stillNews.contentTypes).toEqual(["news"]);
  });

  it("resets to defaults", () => {
    const dirty = reducer(defaultPreferences, setCategories(["sports"]));
    expect(reducer(dirty, resetPreferences())).toEqual(defaultPreferences);
  });
});
