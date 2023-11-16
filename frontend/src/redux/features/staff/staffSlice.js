import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import staffService from "./staffService";
import { toast } from "react-toastify";

const initialState = {
  staff: null,
  staffs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalValue: 0,
  activeTotal: 0,
  totalInactivity: 0,
};

// Create New Staff
export const createStaff = createAsyncThunk(
  "staffs/create",
  async (formData, thunkAPI) => {
    try {
      return await staffService.createStaff(formData);
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

// Get all staffs
export const getStaffs = createAsyncThunk(
  "staffs/getAll",
  async (_, thunkAPI) => {
    try {
      return await staffService.getStaffs();
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

// Get a staff
export const getStaff = createAsyncThunk(
  "staffs/getStaff",
  async (id, thunkAPI) => {
    try {
      return await staffService.getStaff(id);
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

// Update staff
export const updateStaff = createAsyncThunk(
  "staffs/updateStaff",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await staffService.updateStaff(id, formData);
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

// Delete a Staff
export const deleteStaff = createAsyncThunk(
  "staffs/delete",
  async (id, thunkAPI) => {
    try {
      return await staffService.deleteStaff(id);
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

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    CALC_STATUS(state, action) {
      const staffs = action.payload;

      let isActived = 0;
      let isInactived = 0;

      staffs.map((item) => {
        const { status, deleteAt } = item;
        if(!deleteAt){
          if(status === 1 || status === "1"){
            isActived += 1;
          }
          if(status === 2 || status === "2"){
            isInactived += 1;
          }
        }
      });

      state.activeTotal = isActived;
      state.totalInactivity = isInactived;
      state.totalValue = isActived + isInactived;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.staffs.push(action.payload);
        toast.success("Staff added successfully");
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getStaffs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStaffs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.staffs = action.payload;
      })
      .addCase(getStaffs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })      
      .addCase(getStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.staff = action.payload;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Staff updated successfully");
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Staff deleted successfully");
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STATUS } =
  staffSlice.actions;

export const selectIsLoading = (state) => state.staff.isLoading;
export const selectStaff = (state) => state.staff.staff;
export const selectTotalValue = (state) => state.staff.totalValue;
export const selectActiveTotal = (state) => state.staff.activeTotal;
export const selectTotalInactivity = (state) => state.staff.totalInactivity;
export default staffSlice.reducer;
