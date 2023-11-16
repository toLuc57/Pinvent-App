import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getStaff } from "../../../redux/features/staff/staffSlice";
import Card from "../../card/Card";
import Status from "../../status/v2/Status";
import { SpinnerImg } from "../../loader/Loader";
import "./StaffDetail.scss";

const StaffDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { staff, isLoading, isError, message } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getStaff(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="staff-detail">
      <h3 className="--mt">Staff Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {staff && (
          <div className="detail">
            <h4>Staff Status: <Status statusCode={staff.status}/></h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {staff.name}
            </h4>
            <p>
              <b>&rarr; Phone : </b> {staff.phone}
            </p>
            <p>
              <b>&rarr; Email : </b> {staff.email}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {staff.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {staff.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StaffDetail;
