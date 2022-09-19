/* eslint-disable eol-last */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});
