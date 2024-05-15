import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageData: null,
    loadingMessage: false,
    realtimeSupport: false
  },
  reducers: {
    setMessage(state, action) {
      state.messageData = action.payload;
    },
    setLoadingMessage(state, action) {
      state.loadingMessage = action.payload;
    },
    setRealtimeSupport(state, action) {
      state.loadingMessage = action.payload;
    },
  },
});

export const messageIdActions = messageSlice.actions;

export default messageSlice;
