import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
    birthDate: " ",
    profilePic: "",
    addressLine: "",
    city: "",
    province: "",
    receiverName: "",
    detail: "",
    district: "",
    isVerified: "",
    cart: 0,
    checkout: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.value.id = action.payload.id;
      state.value.phoneNumber = action.payload.phoneNumber;
      state.value.email = action.payload.email;
      state.value.name = action.payload.name;
      state.value.gender = action.payload.gender;
      state.value.birthDate = action.payload.birthDate;
      state.value.profilePic = action.payload.profilePic;
      state.value.addressLine = action.payload.addressLine;
      state.value.city = action.payload.city;
      state.value.province = action.payload.province;
      state.value.receiverName = action.payload.receiverName;
      state.value.detail = action.payload.detail;
      state.value.district = action.payload.district;
      state.value.isVerified = action.payload.isVerified
    },
    logoutUser: (state, action) => {
      state.value.phoneNumber = "";
      state.value.name = "";
    },
    updateUser: (state, action) => {
      state.value.email = action.payload.email;
      state.value.name = action.payload.name;
      state.value.gender = action.payload.gender;
      state.value.birthDate = action.payload.birthDate;
    },
    addCart: (state) => {
      state.value.cart += 1;
    },
    delCart: (state) => {
      state.value.cart -= 1;
    },
    addCheckout: (state) => {
      state.value.checkout = 1;
    },
    checkoutList: (state) => {
      state.value.checkout = 0;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  updateUser,
  addCart,
  delCart,
  addCheckout,
  checkoutList,
} = userSlice.actions;
export default userSlice.reducer;
