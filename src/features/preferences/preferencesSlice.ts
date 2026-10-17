import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CATEGORIES, CONTENT_TYPES, type Category, type ContentType } from "@/types/content";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export interface PreferencesState {
  categories: Category[];
  contentTypes: ContentType[];
  pageSize: number;
  recommendationsEnabled: boolean;
  displayName: string;
}

export const defaultPreferences: PreferencesState = {
  categories: [...CATEGORIES],
  contentTypes: [...CONTENT_TYPES],
  pageSize: DEFAULT_PAGE_SIZE,
  recommendationsEnabled: true,
  displayName: "Alex",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: defaultPreferences,
  reducers: {
    hydratePreferences(_state, action: PayloadAction<PreferencesState>) {
      return { ...defaultPreferences, ...action.payload };
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload.length > 0 ? action.payload : [CATEGORIES[0]];
    },
    toggleCategory(state, action: PayloadAction<Category>) {
      if (state.categories.includes(action.payload)) {
        if (state.categories.length === 1) return;
        state.categories = state.categories.filter((item) => item !== action.payload);
      } else {
        state.categories.push(action.payload);
      }
    },
    setContentTypes(state, action: PayloadAction<ContentType[]>) {
      state.contentTypes = action.payload.length > 0 ? action.payload : [CONTENT_TYPES[0]];
    },
    toggleContentType(state, action: PayloadAction<ContentType>) {
      if (state.contentTypes.includes(action.payload)) {
        if (state.contentTypes.length === 1) return;
        state.contentTypes = state.contentTypes.filter((item) => item !== action.payload);
      } else {
        state.contentTypes.push(action.payload);
      }
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = Math.min(16, Math.max(4, action.payload));
    },
    setRecommendationsEnabled(state, action: PayloadAction<boolean>) {
      state.recommendationsEnabled = action.payload;
    },
    setDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload.trim() || defaultPreferences.displayName;
    },
    resetPreferences() {
      return defaultPreferences;
    },
  },
});

export const {
  hydratePreferences,
  setCategories,
  toggleCategory,
  setContentTypes,
  toggleContentType,
  setPageSize,
  setRecommendationsEnabled,
  setDisplayName,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
