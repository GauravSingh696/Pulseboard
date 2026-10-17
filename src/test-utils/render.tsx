import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";

export function renderWithStore(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { store?: AppStore },
) {
  const store = options?.store ?? makeStore();
  return {
    store,
    ...render(ui, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      ...options,
    }),
  };
}
