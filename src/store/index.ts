import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "@/features/preferences/preferencesSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import feedReducer from "@/features/feed/feedSlice";
import themeReducer from "@/features/theme/themeSlice";
import authReducer from "@/features/auth/authSlice";
import sessionReducer from "@/features/session/sessionSlice";
import { contentApi } from "@/store/contentApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      feed: feedReducer,
      theme: themeReducer,
      auth: authReducer,
      session: sessionReducer,
      [contentApi.reducerPath]: contentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(contentApi.middleware),
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
