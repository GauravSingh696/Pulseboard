"use client";

import { useEffect } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage } from "@/lib/utils/storage";
import { hydrateAuth, type AuthState } from "@/features/auth/authSlice";
import { hydrateFavorites, type FavoritesState } from "@/features/favorites/favoritesSlice";
import { hydrateFeedOrder } from "@/features/feed/feedSlice";
import {
  defaultPreferences,
  hydratePreferences,
  type PreferencesState,
} from "@/features/preferences/preferencesSlice";
import { hydrateTheme, type ThemeMode } from "@/features/theme/themeSlice";
import { markHydrated } from "@/features/session/sessionSlice";
import { useAppDispatch } from "@/store/hooks";

export function StoreHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydratePreferences(readStorage<PreferencesState>(STORAGE_KEYS.preferences, defaultPreferences)));
    dispatch(
      hydrateFavorites(
        readStorage<FavoritesState>(STORAGE_KEYS.favorites, { items: {}, ids: [] }),
      ),
    );
    dispatch(hydrateFeedOrder(readStorage<string[]>(STORAGE_KEYS.feedOrder, [])));
    dispatch(hydrateTheme(readStorage<ThemeMode>(STORAGE_KEYS.theme, "light")));
    dispatch(
      hydrateAuth(
        readStorage<AuthState>(STORAGE_KEYS.auth, {
          user: { name: "Alex Rivera", email: "alex@example.com" },
        }),
      ),
    );
    dispatch(markHydrated());
  }, [dispatch]);

  return null;
}
