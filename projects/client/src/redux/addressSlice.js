import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "address",
  value: [],
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncData } = addressSlice.actions;

export default addressSlice.reducer;
