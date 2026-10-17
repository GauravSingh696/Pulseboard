import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: {
    name: "Alex Rivera",
    email: "alex@example.com",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
    },
    signIn(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = null;
    },
  },
});

export const { hydrateAuth, signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
