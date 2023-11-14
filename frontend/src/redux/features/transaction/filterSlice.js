import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTransactions: [],
};

const filterTransactionSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_TRANSACTIONS(state, action) {
      const { transactions, search } = action.payload;
      const tempTransactions = transactions.filter(
        (transaction) =>
          transaction.status === parseInt(search)
      );

      state.filteredTransactions = tempTransactions;
    },
  },
});

export const { FILTER_TRANSACTIONS } = filterTransactionSlice.actions;

export const selectFilteredTransactions = (state) => state.filterTransaction.filteredTransactions;

export default filterTransactionSlice.reducer;
