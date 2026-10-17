import { applyOrder } from "@/lib/utils/content";
import type { ContentItem } from "@/types/content";

const items: ContentItem[] = [
  {
    id: "a",
    type: "news",
    title: "A",
    description: "",
    image: null,
    category: "technology",
    source: "x",
    publishedAt: "2024-01-01",
    externalUrl: "#",
  },
  {
    id: "b",
    type: "movie",
    title: "B",
    description: "",
    image: null,
    category: "entertainment",
    source: "x",
    publishedAt: "2024-01-01",
    externalUrl: "#",
  },
];

describe("applyOrder", () => {
  it("reorders known ids and appends new items", () => {
    expect(applyOrder(items, ["b", "a"]).map((item) => item.id)).toEqual(["b", "a"]);
    expect(applyOrder(items, ["b"]).map((item) => item.id)).toEqual(["b", "a"]);
  });
});
