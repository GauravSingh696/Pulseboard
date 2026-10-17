"use client";

import { useEffect } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { writeStorage } from "@/lib/utils/storage";
import { useAppSelector } from "@/store/hooks";

export function PersistListener() {
  const preferences = useAppSelector((state) => state.preferences);
  const favorites = useAppSelector((state) => state.favorites);
  const order = useAppSelector((state) => state.feed.order);
  const theme = useAppSelector((state) => state.theme.mode);
  const auth = useAppSelector((state) => state.auth);
  const hydrated = useAppSelector((state) => state.session.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.preferences, preferences);
  }, [preferences, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.feedOrder, order);
  }, [order, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.theme, theme);
  }, [theme, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.auth, auth);
  }, [auth, hydrated]);

  return null;
}
