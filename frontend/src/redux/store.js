import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import transactionReducer from "../redux/features/transaction/transactionSlice";
import staffReducer from "../redux/features/staff/staffSlice";
import storeReducer from "../redux/features/store/storeSlice";
import supplierReducer from "../redux/features/supplier/supplierSlice";
import filterProductSlice from "../redux/features/product/filterSlice";
import filterTransactionSlice from "../redux/features/transaction/filterSlice";
import filterStaffSlice from "../redux/features/staff/filterSlice";
import filterStoreSlice from "../redux/features/store/filterSlice";
import filterSupplierSlice from "../redux/features/supplier/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    transaction: transactionReducer,
    staff: staffReducer,
    store: storeReducer,
    supplier: supplierReducer,
    filterProduct: filterProductSlice,
    filterTransaction: filterTransactionSlice,
    filterStaff: filterStaffSlice,
    filterStore: filterStoreSlice,
    filterSupplier: filterSupplierSlice,
  },
});
