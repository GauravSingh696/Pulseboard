import { TMDB_IMAGE_BASE } from "@/lib/constants";
import type { Category, ContentItem } from "@/types/content";

interface NewsArticle {
  title?: string | null;
  description?: string | null;
  urlToImage?: string | null;
  url?: string | null;
  publishedAt?: string | null;
  source?: { name?: string | null } | null;
}

interface TmdbMovie {
  id: number;
  title?: string | null;
  overview?: string | null;
  poster_path?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
  genre_ids?: number[];
}

const GENRE_TO_CATEGORY: Record<number, Category> = {
  28: "sports",
  12: "entertainment",
  16: "entertainment",
  35: "entertainment",
  80: "business",
  99: "science",
  18: "health",
  10751: "entertainment",
  14: "entertainment",
  36: "science",
  27: "entertainment",
  10402: "entertainment",
  9648: "entertainment",
  10749: "entertainment",
  878: "science",
  10770: "entertainment",
  53: "entertainment",
  10752: "sports",
  37: "entertainment",
};

export function mapNewsArticle(
  article: NewsArticle,
  category: Category,
  index: number,
): ContentItem | null {
  const title = article.title?.trim();
  if (!title || title === "[Removed]") return null;
  const url = article.url?.trim() || "#";
  return {
    id: `news-${hashId(url + title + index)}`,
    type: "news",
    title,
    description: article.description?.trim() || "No description available for this article.",
    image: article.urlToImage || null,
    category,
    source: article.source?.name?.trim() || "News",
    publishedAt: article.publishedAt || new Date().toISOString(),
    externalUrl: url,
  };
}

export function mapTmdbMovie(movie: TmdbMovie, fallbackCategory: Category): ContentItem {
  const genreId = movie.genre_ids?.[0];
  const category = (genreId && GENRE_TO_CATEGORY[genreId]) || fallbackCategory;
  return {
    id: `movie-${movie.id}`,
    type: "movie",
    title: movie.title?.trim() || "Untitled film",
    description: movie.overview?.trim() || "No overview is available for this title.",
    image: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null,
    category,
    source: "TMDB",
    publishedAt: movie.release_date || new Date().toISOString(),
    externalUrl: `https://www.themoviedb.org/movie/${movie.id}`,
    rating: typeof movie.vote_average === "number" ? movie.vote_average : undefined,
  };
}

function hashId(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}
