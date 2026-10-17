import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, ContentType } from "@/types/content";

export interface FeedState {
  order: string[];
  activeCategory: Category | "all";
  activeType: ContentType | "all";
}

const initialState: FeedState = {
  order: [],
  activeCategory: "all",
  activeType: "all",
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    hydrateFeedOrder(state, action: PayloadAction<string[]>) {
      state.order = action.payload;
    },
    setFeedOrder(state, action: PayloadAction<string[]>) {
      state.order = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<Category | "all">) {
      state.activeCategory = action.payload;
    },
    setActiveType(state, action: PayloadAction<ContentType | "all">) {
      state.activeType = action.payload;
    },
  },
});

export const { hydrateFeedOrder, setFeedOrder, setActiveCategory, setActiveType } =
  feedSlice.actions;

export default feedSlice.reducer;
