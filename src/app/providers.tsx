"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { StoreHydrator } from "@/components/providers/StoreHydrator";
import { ThemeSync } from "@/components/providers/ThemeSync";
import { PersistListener } from "@/components/providers/PersistListener";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(store);
  return (
    <Provider store={storeRef.current}>
      <StoreHydrator />
      <ThemeSync />
      <PersistListener />
      {children}
    </Provider>
  );
}
