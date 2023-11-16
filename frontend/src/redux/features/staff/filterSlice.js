import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredStaffs: [],
};

const filterStaffSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_STAFFS(state, action) {
      const { staffs, search } = action.payload;
      const tempStaffs = staffs.filter(
        (staff) =>
        staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.email.toLowerCase().includes(search.toLowerCase()) 
      );

      state.filteredStaffs = tempStaffs;
    },
  },
});

export const { FILTER_STAFFS } = filterStaffSlice.actions;

export const selectFilteredStaffs = (state) => state.filterStaff.filteredStaffs;

export default filterStaffSlice.reducer;
