import reducer, { setFeedOrder } from "@/features/feed/feedSlice";

describe("feedSlice", () => {
  it("replaces order without mutating the previous array", () => {
    const previous = ["a", "b"];
    const next = setFeedOrder(["b", "a"]);
    const state = reducer({ order: previous, activeCategory: "all", activeType: "all" }, next);
    expect(state.order).toEqual(["b", "a"]);
    expect(previous).toEqual(["a", "b"]);
  });
});
