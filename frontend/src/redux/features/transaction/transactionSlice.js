import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import { toast } from "react-toastify";

const initialState = {
  transaction: null,
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalValue: 0,
  totalWaiting: 0,
  totalProcessing: 0,
  totalSuccess: 0,
  totalCanceled: 0,
};

// Create New Transaction
export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (formData, thunkAPI) => {
    try {
      return await transactionService.createTransaction(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all transactions
export const getTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, thunkAPI) => {
    try {
      return await transactionService.getTransactions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a transaction
export const getTransaction = createAsyncThunk(
  "transactions/getTransaction",
  async (id, thunkAPI) => {
    try {
      return await transactionService.getTransaction(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update transaction
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await transactionService.updateTransaction(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    CALC_STATUS(state, action) {
      const transactions = action.payload;

      let waitingCount = 0;
      let processingCount = 0;
      let sucessCount = 0;
      let canceledCount = 0;
      let localTotalValue = 0;

      transactions.map((item) => {
        const { status, total } = item;
        if(status === 1 || status === "1"){
            waitingCount += 1;
        }
        if(status === 2 || status === "2"){
            processingCount += 1;
        }
        if(status === 3 || status === "3"){
            sucessCount += 1;
            localTotalValue += total;
        }
        if(status === 4 || status === "4"){
            canceledCount += 1;
        }
        
      });

      state.totalWaiting = waitingCount;
      state.totalProcessing = processingCount;
      state.totalSuccess = sucessCount;
      state.totalCanceled = canceledCount;
      state.totalValue = localTotalValue;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.transactions.push(action.payload);
        toast.success("Transaction added successfully");
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })      
      .addCase(getTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transaction = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Transaction updated successfully");
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STATUS } =
  transactionSlice.actions;

export const selectIsLoading = (state) => state.transaction.isLoading;
export const selectTransaction = (state) => state.transaction.transaction;
export const selectTotalValue = (state) => state.transaction.totalValue;
export const selectTotalWaitingStatus = (state) => state.transaction.totalWaiting;
export const selectTotalProcessingStatus = (state) => state.transaction.totalProcessing;
export const selectTotalSussessStatus = (state) => state.transaction.totalSuccess;
export const selectTotalCanceledStatus = (state) => state.transaction.totalCanceled;

export default transactionSlice.reducer;
