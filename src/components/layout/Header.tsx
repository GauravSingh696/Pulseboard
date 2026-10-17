"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui/Button";
import { toggleTheme } from "@/features/theme/themeSlice";
import { signOut } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function Header({ onMenu }: { onMenu: () => void }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.auth.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
        setNotesOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--line)] bg-[var(--surface)]/80 px-4 backdrop-blur-md lg:px-6">
      <button
        type="button"
        className="rounded-lg p-2 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors lg:hidden"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>
      <Suspense fallback={<div className="h-10 w-full max-w-xl rounded-xl bg-[var(--surface-muted)] animate-pulse" />}>
        <SearchBar />
      </Suspense>
      <div className="ml-auto flex items-center gap-1.5" ref={menuRef}>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-xl p-2 text-[var(--muted)] hover:text-[var(--foreground)] active:scale-95 transition-transform"
          onClick={() => dispatch(toggleTheme())}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
        </Button>
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Notifications"
            aria-expanded={notesOpen}
            className="relative rounded-xl p-2 text-[var(--muted)] hover:text-[var(--foreground)] active:scale-95 transition-transform"
            onClick={() => {
              setNotesOpen((open) => !open);
              setProfileOpen(false);
            }}
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--surface-elevated)]" />
          </Button>
          {notesOpen ? (
            <div
              role="dialog"
              aria-label="Notifications"
              className="absolute right-0 mt-2 w-80 rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-4 shadow-glass backdrop-blur-md z-50"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]/50">
                <p className="text-sm font-semibold">Notifications</p>
                <span className="rounded-full bg-[var(--accent-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
                  3 new
                </span>
              </div>
              <ul className="mt-3 space-y-2.5 text-xs text-[var(--muted)]">
                <li className="flex gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                  <span>3 new items match your <strong>Technology</strong> preference.</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                  <span>Trending movies were refreshed this hour.</span>
                </li>
                <li className="flex gap-2 text-[var(--muted)]/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mt-1.5 shrink-0" />
                  <span>Mock real-time sync active.</span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        <div className="relative">
          <button
            type="button"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-[var(--accent-muted)] text-sm font-bold text-[var(--accent)] ring-1 ring-[var(--accent)]/30 hover:ring-2 active:scale-95 transition-all"
            aria-label="Account menu"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((open) => !open);
              setNotesOpen(false);
            }}
          >
            {(user?.name ?? "G").slice(0, 1)}
          </button>
          {profileOpen ? (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-2 shadow-glass backdrop-blur-md z-50"
            >
              <div className="px-3 py-2 border-b border-[var(--line)]/50">
                <p className="text-sm font-semibold">{user?.name ?? "Guest"}</p>
                <p className="truncate text-xs text-[var(--muted)]">
                  {user?.email ?? "Not signed in"}
                </p>
              </div>
              <div className="py-1">
                <Link
                  href="/settings"
                  className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-[var(--surface-muted)] transition-colors"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                >
                  Settings
                </Link>
                {user ? (
                  <button
                    type="button"
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    role="menuitem"
                    onClick={() => {
                      dispatch(signOut());
                      setProfileOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-[var(--accent)] hover:bg-[var(--surface-muted)] transition-colors"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
