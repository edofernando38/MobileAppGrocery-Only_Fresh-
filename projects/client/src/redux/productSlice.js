import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "product",
  value: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncData } = productSlice.actions;

export default productSlice.reducer;
