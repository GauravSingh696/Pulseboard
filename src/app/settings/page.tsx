"use client";

import { useState } from "react";
import { CATEGORY_LABELS, CONTENT_TYPE_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { setTheme } from "@/features/theme/themeSlice";
import {
  resetPreferences,
  setDisplayName,
  setPageSize,
  setRecommendationsEnabled,
  toggleCategory,
  toggleContentType,
} from "@/features/preferences/preferencesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CATEGORIES, CONTENT_TYPES } from "@/types/content";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.preferences);
  const theme = useAppSelector((state) => state.theme.mode);
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="border-b border-[var(--line)]/60 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Preferences are stored in this browser and restore after reload.
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 shadow-card transition-all hover:shadow-card-hover">
        <h2 className="text-base font-bold tracking-tight">Profile</h2>
        <label className="mt-4 block text-sm font-medium">
          Display name
          <input
            value={preferences.displayName}
            onChange={(event) => dispatch(setDisplayName(event.target.value))}
            className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 shadow-xs"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 shadow-card transition-all hover:shadow-card-hover">
        <h2 className="text-base font-bold tracking-tight">Favorite categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const active = preferences.categories.includes(category);
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => dispatch(toggleCategory(category))}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white dark:text-[#0b1a16] shadow-sm shadow-[var(--accent)]/20"
                    : "border-[var(--line)] bg-[var(--surface-elevated)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-muted)]"
                }`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 shadow-card transition-all hover:shadow-card-hover">
        <h2 className="text-base font-bold tracking-tight">Content types</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONTENT_TYPES.map((type) => {
            const active = preferences.contentTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                aria-pressed={active}
                onClick={() => dispatch(toggleContentType(type))}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white dark:text-[#0b1a16] shadow-sm shadow-[var(--accent)]/20"
                    : "border-[var(--line)] bg-[var(--surface-elevated)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-muted)]"
                }`}
              >
                {CONTENT_TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>
        <label className="mt-5 flex items-center gap-2.5 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.recommendationsEnabled}
            onChange={(event) => dispatch(setRecommendationsEnabled(event.target.checked))}
            className="h-4 w-4 rounded border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)]"
          />
          Enable movie recommendations
        </label>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 shadow-card transition-all hover:shadow-card-hover">
        <h2 className="text-base font-bold tracking-tight">Display</h2>
        <label className="mt-4 block text-sm font-medium">
          Items per source
          <input
            type="range"
            min={4}
            max={16}
            value={preferences.pageSize}
            onChange={(event) => dispatch(setPageSize(Number(event.target.value)))}
            className="mt-2 w-full accent-[var(--accent)]"
          />
          <span className="text-xs text-[var(--muted)]">{preferences.pageSize} items</span>
        </label>
        <div className="mt-4 flex gap-2">
          <Button
            variant={theme === "light" ? "primary" : "secondary"}
            onClick={() => dispatch(setTheme("light"))}
            className="active:scale-95 transition-transform"
          >
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "primary" : "secondary"}
            onClick={() => dispatch(setTheme("dark"))}
            className="active:scale-95 transition-transform"
          >
            Dark
          </Button>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button variant="primary" onClick={save} className="shadow-sm hover:shadow-md active:scale-95 transition-all">
          Save preferences
        </Button>
        <Button onClick={() => dispatch(resetPreferences())} className="active:scale-95 transition-transform">
          Reset to defaults
        </Button>
        {saved ? (
          <p className="self-center text-sm font-medium text-[var(--accent)] animate-fade-in" role="status">
            Preferences saved on this device.
          </p>
        ) : null}
      </div>
    </div>
  );
}
