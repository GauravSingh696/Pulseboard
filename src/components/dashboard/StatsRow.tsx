"use client";

import { motion } from "framer-motion";
import { Bookmark, Layers, Sparkles } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export function StatsRow({ feedCount }: { feedCount: number }) {
  const favorites = useAppSelector((state) => state.favorites.ids.length);
  const categories = useAppSelector((state) => state.preferences.categories.length);

  const stats = [
    { label: "Feed items", value: feedCount, icon: Sparkles, note: "Live updates" },
    { label: "Favorites", value: favorites, icon: Bookmark, note: "Saved locally" },
    { label: "Categories", value: categories, icon: Layers, note: "Active filters" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-[var(--accent)]/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{stat.label}</span>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                <Icon size={18} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <span className="text-xs font-medium text-[var(--muted)]">{stat.note}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
