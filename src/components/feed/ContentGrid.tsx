"use client";

import { motion } from "framer-motion";
import { ContentCard } from "@/components/cards/ContentCard";
import type { ContentItem } from "@/types/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function ContentGrid({ items }: { items: ContentItem[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants} className="h-full">
          <ContentCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
