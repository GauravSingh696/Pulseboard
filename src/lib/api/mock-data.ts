import type { Category, ContentItem } from "@/types/content";

const now = Date.now();

function ago(hours: number): string {
  return new Date(now - hours * 60 * 60 * 1000).toISOString();
}

export const MOCK_NEWS: ContentItem[] = [
  {
    id: "news-mock-1",
    type: "news",
    title: "Chipmakers race to ship next-gen AI accelerators",
    description:
      "A new wave of inference chips is targeting lower energy use in data centers while keeping training throughput competitive.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    category: "technology",
    source: "Mock News Desk",
    publishedAt: ago(2),
    externalUrl: "https://example.com/news/ai-accelerators",
  },
  {
    id: "news-mock-2",
    type: "news",
    title: "Markets steady as central banks hold rates",
    description:
      "Investors parsed mixed employment data as policymakers signaled patience on further rate changes.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    category: "business",
    source: "Mock Markets",
    publishedAt: ago(5),
    externalUrl: "https://example.com/news/markets-steady",
  },
  {
    id: "news-mock-3",
    type: "news",
    title: "Championship final set after dramatic extra time",
    description:
      "A late equalizer sent the semifinal into extra time before a composed finish sealed a place in the final.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=1200&q=80",
    category: "sports",
    source: "Mock Sportswire",
    publishedAt: ago(8),
    externalUrl: "https://example.com/news/championship-final",
  },
  {
    id: "news-mock-4",
    type: "news",
    title: "Streaming studios rethink release calendars",
    description:
      "Several platforms are spacing tentpole premieres to reduce overlap and give original series more runway.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    category: "entertainment",
    source: "Mock Culture",
    publishedAt: ago(12),
    externalUrl: "https://example.com/news/streaming-calendars",
  },
  {
    id: "news-mock-5",
    type: "news",
    title: "Researchers map a quieter way to study deep-ocean currents",
    description:
      "Autonomous gliders are collecting salinity and temperature profiles with far less disruption than ship-based surveys.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    category: "science",
    source: "Mock Science Daily",
    publishedAt: ago(16),
    externalUrl: "https://example.com/news/ocean-currents",
  },
  {
    id: "news-mock-6",
    type: "news",
    title: "Clinics trial shorter recovery programs after surgery",
    description:
      "Early results suggest structured mobility coaching can shorten hospital stays without raising readmission rates.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
    category: "health",
    source: "Mock Health Report",
    publishedAt: ago(20),
    externalUrl: "https://example.com/news/recovery-programs",
  },
  {
    id: "news-mock-7",
    type: "news",
    title: "Open-source tools make on-device translation faster",
    description:
      "A compact model family is bringing near-real-time translation to phones with limited connectivity.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
    category: "technology",
    source: "Mock News Desk",
    publishedAt: ago(26),
    externalUrl: "https://example.com/news/on-device-translation",
  },
  {
    id: "news-mock-8",
    type: "news",
    title: "Retail earnings beat as inventory discipline holds",
    description:
      "Same-store sales improved after a year of tighter assortment planning and fewer markdown weeks.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    category: "business",
    source: "Mock Markets",
    publishedAt: ago(30),
    externalUrl: "https://example.com/news/retail-earnings",
  },
];

export const MOCK_MOVIES: ContentItem[] = [
  {
    id: "movie-mock-1",
    type: "movie",
    title: "Signal Drift",
    description: "A quiet engineer uncovers a pattern in satellite noise that should not exist.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    category: "science",
    source: "TMDB (mock)",
    publishedAt: "2024-11-08",
    externalUrl: "https://www.themoviedb.org/",
    rating: 8.1,
  },
  {
    id: "movie-mock-2",
    type: "movie",
    title: "Night Market",
    description: "A food-stall owner and a city inspector collide during a festival week that never quite ends.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    category: "entertainment",
    source: "TMDB (mock)",
    publishedAt: "2025-02-14",
    externalUrl: "https://www.themoviedb.org/",
    rating: 7.4,
  },
  {
    id: "movie-mock-3",
    type: "movie",
    title: "Last Possession",
    description: "A veteran midfielder returns for one more season with a club fighting relegation and itself.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    category: "sports",
    source: "TMDB (mock)",
    publishedAt: "2025-04-02",
    externalUrl: "https://www.themoviedb.org/",
    rating: 7.9,
  },
  {
    id: "movie-mock-4",
    type: "movie",
    title: "Ledger",
    description: "Two analysts notice the same rounding error in three unrelated funds — then people start disappearing.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    category: "business",
    source: "TMDB (mock)",
    publishedAt: "2024-09-19",
    externalUrl: "https://www.themoviedb.org/",
    rating: 7.2,
  },
  {
    id: "movie-mock-5",
    type: "movie",
    title: "Soft Reset",
    description: "A wellness startup’s retreat goes off-script when guests cannot leave the campus network.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    category: "health",
    source: "TMDB (mock)",
    publishedAt: "2025-01-11",
    externalUrl: "https://www.themoviedb.org/",
    rating: 6.8,
  },
  {
    id: "movie-mock-6",
    type: "movie",
    title: "Compile",
    description: "A small team races to ship a compiler patch before a city-wide blackout hits their only remaining farm.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    category: "technology",
    source: "TMDB (mock)",
    publishedAt: "2025-03-21",
    externalUrl: "https://www.themoviedb.org/",
    rating: 8.4,
  },
];

export const MOCK_SOCIAL: ContentItem[] = [
  {
    id: "social-mock-1",
    type: "social",
    title: "@maya.builds on a quieter AI stack",
    description:
      "Shipping on-device summarization this week. Latency is down, battery is up, and the demo finally feels honest. #technology #devtools",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "technology",
    source: "Mock Social",
    publishedAt: ago(1),
    externalUrl: "https://example.com/social/maya-builds",
    author: "maya.builds",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    hashtags: ["technology", "devtools"],
    likes: 428,
  },
  {
    id: "social-mock-2",
    type: "social",
    title: "@sid.markets on inventory discipline",
    description:
      "Retail beat wasn’t magic. It was fewer SKUs, cleaner markdowns, and a supply chain that finally stopped over-ordering. #business",
    image: null,
    category: "business",
    source: "Mock Social",
    publishedAt: ago(3),
    externalUrl: "https://example.com/social/sid-markets",
    author: "sid.markets",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    hashtags: ["business"],
    likes: 191,
  },
  {
    id: "social-mock-3",
    type: "social",
    title: "@pitchside on extra time",
    description:
      "That finish in the 112th minute was composure, not luck. Final is going to be loud. #sports #finals",
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
    category: "sports",
    source: "Mock Social",
    publishedAt: ago(4),
    externalUrl: "https://example.com/social/pitchside",
    author: "pitchside",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    hashtags: ["sports", "finals"],
    likes: 980,
  },
  {
    id: "social-mock-4",
    type: "social",
    title: "@reelnotes on release calendars",
    description:
      "Give a series room to breathe and people actually finish it. Stacking premieres just trained us to skip. #entertainment",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    category: "entertainment",
    source: "Mock Social",
    publishedAt: ago(7),
    externalUrl: "https://example.com/social/reelnotes",
    author: "reelnotes",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    hashtags: ["entertainment"],
    likes: 312,
  },
  {
    id: "social-mock-5",
    type: "social",
    title: "@lab.notes on ocean gliders",
    description:
      "Less ship noise, more data. These gliders are making deep-current maps feel almost continuous. #science #ocean",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    category: "science",
    source: "Mock Social",
    publishedAt: ago(9),
    externalUrl: "https://example.com/social/lab-notes",
    author: "lab.notes",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    hashtags: ["science", "ocean"],
    likes: 254,
  },
  {
    id: "social-mock-6",
    type: "social",
    title: "@care.team on recovery coaching",
    description:
      "Shorter stays only work if the first walk happens on day one. Mobility coaching is the unglamorous part that matters. #health",
    image: null,
    category: "health",
    source: "Mock Social",
    publishedAt: ago(11),
    externalUrl: "https://example.com/social/care-team",
    author: "care.team",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    hashtags: ["health"],
    likes: 176,
  },
];

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
    totalResults: items.length,
  };
}

export function filterByCategory<T extends { category: Category }>(
  items: T[],
  categories: Category[],
): T[] {
  if (categories.length === 0) return items;
  const set = new Set(categories);
  return items.filter((item) => set.has(item.category));
}

export function searchItems(items: ContentItem[], query: string): ContentItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.source,
      item.author ?? "",
      ...(item.hashtags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
