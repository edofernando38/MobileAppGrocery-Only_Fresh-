import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    value: [],
  },
  reducers: {
    checkoutSync: (state, action) => {
      state.value = action.payload;
    },
    // loanDel: (state) => {
    //     state.value = []
    // },
  },
});

// Action creators are generated for each case reducer function
export const { checkoutSync } = checkoutSlice.actions;

export default checkoutSlice.reducer;
