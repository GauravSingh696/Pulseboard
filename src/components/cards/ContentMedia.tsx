"use client";

import { useState } from "react";
import { fallbackImageLabel } from "@/lib/utils/content";

export function ContentMedia({
  src,
  alt,
  className = "h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
}: {
  src: string | null;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-[var(--surface-muted)] to-[var(--surface)] text-xl font-bold tracking-wider text-[var(--muted)] border-b border-[var(--line)]/50 ${className}`}
        aria-hidden
      >
        <span className="rounded-lg bg-black/5 dark:bg-white/5 px-3 py-1.5 backdrop-blur-sm">
          {fallbackImageLabel(alt)}
        </span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}
