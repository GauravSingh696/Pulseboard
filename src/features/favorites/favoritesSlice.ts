import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentItem } from "@/types/content";

export interface FavoritesState {
  items: Record<string, ContentItem>;
  ids: string[];
}

const initialState: FavoritesState = {
  items: {},
  ids: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    hydrateFavorites(_state, action: PayloadAction<FavoritesState>) {
      return {
        items: action.payload.items ?? {},
        ids: action.payload.ids ?? [],
      };
    },
    toggleFavorite(state, action: PayloadAction<ContentItem>) {
      const { id } = action.payload;
      if (state.items[id]) {
        delete state.items[id];
        state.ids = state.ids.filter((itemId) => itemId !== id);
      } else {
        state.items[id] = action.payload;
        state.ids = [id, ...state.ids];
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
      state.ids = state.ids.filter((itemId) => itemId !== action.payload);
    },
    clearFavorites() {
      return initialState;
    },
  },
});

export const { hydrateFavorites, toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
