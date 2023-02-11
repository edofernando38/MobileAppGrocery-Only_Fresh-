import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "branch",
  value: [],
};

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },

    
  },
});

// Action creators are generated for each case reducer function
export const { syncData } = branchSlice.actions;

export default branchSlice.reducer;