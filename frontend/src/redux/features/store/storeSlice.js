import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeService from "./storeService";
import { toast } from "react-toastify";

const initialState = {
  store: null,
  stores: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalValue: 0,
  activeTotal: 0,
  totalInactivity: 0,
};

// Create New Store
export const createStore = createAsyncThunk(
  "stores/create",
  async (formData, thunkAPI) => {
    try {
      return await storeService.createStore(formData);
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

// Get all stores
export const getStores = createAsyncThunk(
  "stores/getAll",
  async (_, thunkAPI) => {
    try {
      return await storeService.getStores();
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

// Get a store
export const getStore = createAsyncThunk(
  "stores/getStore",
  async (id, thunkAPI) => {
    try {
      return await storeService.getStore(id);
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

// Update store
export const updateStore = createAsyncThunk(
  "stores/updateStore",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await storeService.updateStore(id, formData);
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

// Delete a Store
export const deleteStore = createAsyncThunk(
  "stores/delete",
  async (id, thunkAPI) => {
    try {
      return await storeService.deleteStore(id);
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

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    CALC_STATUS(state, action) {
      const stores = action.payload;

      let isActived = 0;
      let isInactived = 0;

      stores.map((item) => {
        const { status, deleteAt } = item;
        if(!deleteAt){
          if(status === 1 || status === "1"){
            isActived += 1;
          }
          if(status === 2 || status === "2"){
            isInactived += 1;
          }
        }
        return item;
      });

      state.activeTotal = isActived;
      state.totalInactivity = isInactived;
      state.totalValue = isActived + isInactived;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.stores.push(action.payload);
        toast.success("Store added successfully");
      })
      .addCase(createStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.stores = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })      
      .addCase(getStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.store = action.payload;
      })
      .addCase(getStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Store updated successfully");
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Store deleted successfully");
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STATUS } =
  storeSlice.actions;

export const selectIsLoading = (state) => state.store.isLoading;
export const selectStore = (state) => state.store.store;
export const selectTotalValue = (state) => state.store.totalValue;
export const selectActiveTotal = (state) => state.store.activeTotal;
export const selectTotalInactivity = (state) => state.store.totalInactivity;
export default storeSlice.reducer;
