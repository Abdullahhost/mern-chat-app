import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice.js";
import messageSlice from "../slice/messageSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    message: messageSlice.reducer,
  },
});
export default store;
