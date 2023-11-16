import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaffList from "../../components/staff/staffList/StaffList";
import StaffSummary from "../../components/staff/staffSummary/StaffSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getStaffs } from "../../redux/features/staff/staffSlice";

const Staff = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { staffs, isLoading, isError, message } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getStaffs());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <StaffSummary staffs={staffs} />
      <StaffList staffs={staffs} isLoading={isLoading} />
    </div>
  );
};

export default Staff;
