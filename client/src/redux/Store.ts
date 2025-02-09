import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// 🔹 Export RootState and AppDispatch for TypeScript usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
