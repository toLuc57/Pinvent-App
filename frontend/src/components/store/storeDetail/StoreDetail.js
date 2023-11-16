import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getStore } from "../../../redux/features/store/storeSlice";
import Card from "../../card/Card";
import Status from "../../status/v2/Status";
import { SpinnerImg } from "../../loader/Loader";
import "./StoreDetail.scss";

const StoreDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { store, isLoading, isError, message } = useSelector(
    (state) => state.store
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getStore(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="store-detail">
      <h3 className="--mt">Store Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {store && (
          <div className="detail">
            <h4>Store Status: <Status statusCode={store.status}/></h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {store.name}
            </h4>
            <p>
              <b>&rarr; Phone : </b> {store.phone}
            </p>
            <p>
              <b>&rarr; Location : </b> {store.location}
            </p>
            <p>
              <b>&rarr; State : </b> {store.state}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {store.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {store.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StoreDetail;
