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
      const tempSuppliers = suppliers.filter((supplier) => {
        const lowercasedSearch = search.toLowerCase();
        const isNameMatched = supplier.name && supplier.name.toLowerCase().includes(lowercasedSearch);
        const isEmailMatched = supplier.email && supplier.email.toLowerCase().includes(lowercasedSearch);

        return isNameMatched || isEmailMatched;
      });

      state.filteredSuppliers = tempSuppliers;
    },
  },
});

export const { FILTER_SUPPLIERS } = filterSupplierSlice.actions;

export const selectFilteredSuppliers = (state) => state.filterSupplier.filteredSuppliers;

export default filterSupplierSlice.reducer;
