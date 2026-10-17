import { createSlice } from "@reduxjs/toolkit";

interface SessionState {
  hydrated: boolean;
}

const initialState: SessionState = {
  hydrated: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    markHydrated(state) {
      state.hydrated = true;
    },
  },
});

export const { markHydrated } = sessionSlice.actions;
export default sessionSlice.reducer;
