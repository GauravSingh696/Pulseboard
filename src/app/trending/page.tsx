"use client";

import { motion } from "framer-motion";
import { FeedSection } from "@/components/feed/FeedSection";
import { MockNotice } from "@/components/dashboard/MockNotice";
import { useUnifiedFeed } from "@/hooks/useUnifiedFeed";

export default function TrendingPage() {
  const { usingMock } = useUnifiedFeed("trending");
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="border-b border-[var(--line)]/60 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Trending</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Top movies from TMDB, latest news in your categories, and popular mock social posts.
        </p>
      </div>
      <MockNotice visible={usingMock} />
      <FeedSection kind="trending" />
    </motion.div>
  );
}
