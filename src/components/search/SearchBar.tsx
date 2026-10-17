"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";
import { debounce } from "@/lib/utils/debounce";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const initial = pathname === "/search" ? (params.get("q") ?? "") : "";
  const [value, setValue] = useState(initial);

  const goToSearch = useCallback(
    (query: string) => {
      const next = query.trim();
      if (next.length >= 2) {
        router.push(`/search?q=${encodeURIComponent(next)}`);
      }
    },
    [router],
  );

  const navigate = useMemo(
    () => debounce((query: string) => goToSearch(query), SEARCH_DEBOUNCE_MS),
    [goToSearch],
  );

  useEffect(() => () => navigate.cancel(), [navigate]);

  useEffect(() => {
    if (pathname === "/search") {
      setValue(params.get("q") ?? "");
    }
  }, [pathname, params]);

  function onChange(next: string) {
    setValue(next);
    navigate(next);
  }

  function clear() {
    setValue("");
    navigate.cancel();
    if (pathname === "/search") router.push("/search");
  }

  return (
    <form
      className="relative w-full max-w-xl group"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        navigate.cancel();
        goToSearch(value);
      }}
    >
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] transition-colors duration-200 group-focus-within:text-[var(--accent)]"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search news, movies, or posts"
        aria-label="Search content"
        className="h-10 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-12 text-sm outline-none transition-all duration-200 placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25 shadow-xs"
      />
      <button type="submit" className="sr-only" aria-label="Submit search">
        Search
      </button>
      {!value ? (
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden rounded border border-[var(--line)] bg-[var(--surface-elevated)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--muted)] shadow-xs sm:inline-block">
          ⌘K
        </kbd>
      ) : (
        <button
          type="button"
          onClick={clear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-all active:scale-90"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
