import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import transactionReducer from "../redux/features/transaction/transactionSlice";
import filterProductSlice from "../redux/features/product/filterSlice";
import filterTransactionSlice from "../redux/features/transaction/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    transaction: transactionReducer,
    filterProduct: filterProductSlice,
    filterTransaction: filterTransactionSlice,
  },
});
