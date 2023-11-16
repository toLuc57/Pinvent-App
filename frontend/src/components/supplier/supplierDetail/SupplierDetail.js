import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getSupplier } from "../../../redux/features/supplier/supplierSlice";
import Card from "../../card/Card";
import Status from "../../status/v2/Status";
import { SpinnerImg } from "../../loader/Loader";
import "./SupplierDetail.scss";

const SupplierDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { supplier, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSupplier(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="supplier-detail">
      <h3 className="--mt">Supplier Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {supplier && (
          <div className="detail">
            <h4>Supplier Status: <Status statusCode={supplier.status}/></h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {supplier.name}
            </h4>
            <p>
              <b>&rarr; Phone : </b> {supplier.phone}
            </p>
            <p>
              <b>&rarr; Email : </b> {supplier.email}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {supplier.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {supplier.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SupplierDetail;
