import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "transaction",
  value: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    transSync: (state, action) => {
      state.value = action.payload;
    },
    transDel: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { transSync, transDel } = transactionSlice.actions;

export default transactionSlice.reducer;
