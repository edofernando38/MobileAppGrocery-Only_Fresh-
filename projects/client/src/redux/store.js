import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import nameSlice from "./nameSlice";
import addressSlice from "./addressSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice";
import inventorySlice from "./inventorySlice";
import categorySlice from "./categorySlice";
import transactionSlice from "./transactionSlice";
import branchSlice from "./branchSlice";

export default configureStore({
  reducer: {
    userSlice,
    adminSlice,
    nameSlice,
    addressSlice,
    productSlice,
    cartSlice,
    checkoutSlice,
    inventorySlice,
    categorySlice,
    transactionSlice,
    branchSlice,
  },
});
