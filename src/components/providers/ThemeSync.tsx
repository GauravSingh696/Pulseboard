"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export function ThemeSync() {
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return null;
}
