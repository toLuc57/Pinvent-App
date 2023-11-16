import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supplierService from "./supplierService";
import { toast } from "react-toastify";

const initialState = {
  supplier: null,
  suppliers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalValue: 0,
  activeTotal: 0,
  totalInactivity: 0,
};

// Create New Supplier
export const createSupplier = createAsyncThunk(
  "suppliers/create",
  async (formData, thunkAPI) => {
    try {
      return await supplierService.createSupplier(formData);
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

// Get all suppliers
export const getSuppliers = createAsyncThunk(
  "suppliers/getAll",
  async (_, thunkAPI) => {
    try {
      return await supplierService.getSuppliers();
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

// Get a supplier
export const getSupplier = createAsyncThunk(
  "suppliers/getSupplier",
  async (id, thunkAPI) => {
    try {
      return await supplierService.getSupplier(id);
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

// Update supplier
export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await supplierService.updateSupplier(id, formData);
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

// Delete a Supplier
export const deleteSupplier = createAsyncThunk(
  "suppliers/delete",
  async (id, thunkAPI) => {
    try {
      return await supplierService.deleteSupplier(id);
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

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    CALC_STATUS(state, action) {
      const suppliers = action.payload;

      let isActived = 0;
      let isInactived = 0;

      suppliers.map((item) => {
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
      .addCase(createSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.suppliers.push(action.payload);
        toast.success("Supplier added successfully");
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })      
      .addCase(getSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.supplier = action.payload;
      })
      .addCase(getSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Supplier updated successfully");
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Supplier deleted successfully");
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STATUS } =
  supplierSlice.actions;

export const selectIsLoading = (state) => state.supplier.isLoading;
export const selectSupplier = (state) => state.supplier.supplier;
export const selectTotalValue = (state) => state.supplier.totalValue;
export const selectActiveTotal = (state) => state.supplier.activeTotal;
export const selectTotalInactivity = (state) => state.supplier.totalInactivity;
export default supplierSlice.reducer;