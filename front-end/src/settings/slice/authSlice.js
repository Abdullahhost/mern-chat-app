import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    selectedUser: null,
    toggleButton: false,
  },

  reducers: {
    loginStart(state) {
      state.loading = !state.loading;
      state.error = null;
    },

    loginSuccess(state, action) {
      state.user = localStorage.setItem("user", JSON.stringify(action.payload));
      state.loading = false;
      state.error = null;
    },
    loginFailer(state, action) {
      state.error = action.payload;
      state.user = null;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setToggle(state) {
      state.toggleButton = !state.toggleButton;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
