"use client";

import { useState } from "react";
import { GripVertical, Heart, Play, Star, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ContentMedia } from "@/components/cards/ContentMedia";
import { CONTENT_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { formatRelative } from "@/lib/utils/format";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { ContentItem } from "@/types/content";

export function ContentCard({
  item,
  dragHandleProps,
  isDragging,
}: {
  item: ContentItem;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  isDragging?: boolean;
}) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => Boolean(state.favorites.items[item.id]));
  const [likes, setLikes] = useState(item.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const actionLabel =
    item.type === "movie" ? "View Details" : item.type === "social" ? "Open post" : "Read More";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card-hover hover:border-[var(--accent)]/40",
        isDragging && "opacity-70 scale-95",
      )}
      data-testid="content-card"
      data-id={item.id}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative overflow-hidden">
        <ContentMedia src={item.image} alt={item.title} />
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
          <Badge className="backdrop-blur-md bg-white/80 dark:bg-black/60 shadow-sm border border-white/20 dark:border-white/10 font-semibold">{CONTENT_TYPE_LABELS[item.type]}</Badge>
          <Badge className="backdrop-blur-md bg-black/60 text-white border border-white/10">{item.category}</Badge>
        </div>
        {dragHandleProps ? (
          <button
            type="button"
            className="absolute right-3 top-3 z-10 rounded-lg backdrop-blur-md bg-black/50 p-1.5 text-white shadow-sm border border-white/10 hover:bg-black/75 active:scale-95 transition-all"
            aria-label={`Reorder ${item.title}`}
            data-testid="drag-handle"
            {...dragHandleProps}
          >
            <GripVertical size={16} />
          </button>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted)]">
          <span className="font-medium">{item.author ? `@${item.author}` : item.source}</span>
          <time dateTime={item.publishedAt}>{formatRelative(item.publishedAt)}</time>
        </div>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">{item.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
        {item.rating != null ? (
          <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium">
            <Star size={14} className="fill-amber-400 text-amber-500" />
            {item.rating.toFixed(1)}
          </p>
        ) : null}
        {item.hashtags?.length ? (
          <p className="mt-2 text-xs font-medium text-[var(--accent)]">
            {item.hashtags.map((tag) => `#${tag}`).join(" ")}
          </p>
        ) : null}
        <div className="mt-4 flex items-center gap-2 pt-2 border-t border-[var(--line)]/50">
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="group/btn inline-flex h-9 items-center rounded-lg bg-[var(--accent)] px-3.5 text-sm font-medium text-white dark:text-[#0b1a16] shadow-sm hover:opacity-95 hover:shadow-md hover:shadow-[var(--accent)]/20 active:scale-95 transition-all"
          >
            {item.type === "movie" ? <Play size={14} className="mr-1.5 transition-transform group-hover/btn:scale-110" /> : null}
            <span>{actionLabel}</span>
          </a>
          {item.type === "social" ? (
            <Button
              variant="ghost"
              size="sm"
              aria-pressed={liked}
              aria-label={liked ? "Unlike post" : "Like post"}
              className="active:scale-90 transition-transform"
              onClick={() => {
                setLiked((value) => !value);
                setLikes((value) => value + (liked ? -1 : 1));
              }}
            >
              <ThumbsUp size={16} className={liked ? "text-[var(--accent)] fill-[var(--accent)]" : ""} />
              <span>{likes}</span>
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Remove ${item.title} from favorites` : `Add ${item.title} to favorites`}
            onClick={() => dispatch(toggleFavorite(item))}
            data-testid="favorite-toggle"
            className="transition-transform active:scale-75 hover:scale-110"
          >
            <Heart
              size={16}
              className={cn(
                "transition-all duration-300",
                isFavorite
                  ? "fill-rose-500 text-rose-500 scale-110 drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                  : "text-[var(--muted)] hover:text-rose-500",
              )}
            />
          </Button>
        </div>
      </div>
    </article>
  );
}
