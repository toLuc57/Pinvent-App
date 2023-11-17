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
      const tempStaffs = staffs.filter((staff) => {
        const lowercasedSearch = search.toLowerCase();
        const isNameMatched = staff.name && staff.name.toLowerCase().includes(lowercasedSearch);
        const isEmailMatched = staff.email && staff.email.toLowerCase().includes(lowercasedSearch);

        return isNameMatched || isEmailMatched;
        } 
      );

      state.filteredStaffs = tempStaffs;
    },
  },
});

export const { FILTER_STAFFS } = filterStaffSlice.actions;

export const selectFilteredStaffs = (state) => state.filterStaff.filteredStaffs;

export default filterStaffSlice.reducer;
