import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string;
  userEmail: string;
  token: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userId: "",
  userEmail: "",
  token: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload, { isAuthenticated: true });
    },
    logout: () => initialState, // Resets state to initial values
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
