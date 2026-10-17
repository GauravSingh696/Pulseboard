"use client";

import { motion } from "framer-motion";
import { greetingForHour, todayLabel } from "@/lib/utils/format";
import { useAppSelector } from "@/store/hooks";

export function Greeting() {
  const name = useAppSelector((state) => state.auth.user?.name ?? state.preferences.displayName);
  const first = name.split(" ")[0];
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface-elevated)] to-[var(--surface-muted)]/50 p-6 sm:p-8 shadow-card"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          <span>{todayLabel()}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {greetingForHour()}, <span className="bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">{first}</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Your personalized mix of news, recommendations, and social posts — filtered by the
          categories you care about.
        </p>
      </div>
    </motion.section>
  );
}
