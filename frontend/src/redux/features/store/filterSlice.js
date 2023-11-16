import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredStores: [],
};

const filterStoreSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_STORES(state, action) {
      const { stores, search } = action.payload;
      const tempStores = stores.filter(
        (store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.location.toLowerCase().includes(search.toLowerCase()) 
      );

      state.filteredStores = tempStores;
    },
  },
});

export const { FILTER_STORES } = filterStoreSlice.actions;

export const selectFilteredStores = (state) => state.filterStore.filteredStores;

export default filterStoreSlice.reducer;
