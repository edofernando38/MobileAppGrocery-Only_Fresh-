import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "inventory",
  value: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    syncInventory: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
