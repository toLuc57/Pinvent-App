import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredSuppliers: [],
};

const filterSupplierSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_SUPPLIERS(state, action) {
      const { suppliers, search } = action.payload;
      const tempSuppliers = suppliers.filter(
        (supplier) =>
        supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        supplier.email.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredSuppliers = tempSuppliers;
    },
  },
});

export const { FILTER_SUPPLIERS } = filterSupplierSlice.actions;

export const selectFilteredSuppliers = (state) => state.filterSupplier.filteredSuppliers;

export default filterSupplierSlice.reducer;
