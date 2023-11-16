import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getTransaction } from "../../../redux/features/transaction/transactionSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import Status from "../../status/v4/Status";
import "./TransactionDetail.scss";

const TransactionDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { transaction, isLoading, isError, message } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTransaction(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="transaction-detail">
      <h3 className="--mt">Transaction Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {transaction && (
          <div className="detail">
            <h4>Transaction Availability: <Status statusCode={transaction.status}></Status> </h4>
            <hr />
            <p>
              <b>&rarr; Supplier : </b> {transaction.supplier}
            </p>
            <p>
              <b>&rarr; Store : </b> {transaction.store_id}
            </p>
            <p>
              <b>&rarr; Staff : </b> {transaction.staff_id}
            </p>
            <p>
              <b>&rarr; Products: </b>
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                {transaction.details.map((products, index) => {
                  const { _id, name } = products.details;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{products.quantity}</td>
                      <td>
                        {"$"}
                        {products.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
            </p>
            <p>
              <b>&rarr; Total Value : </b> {"$"}
              {transaction.total}
            </p>
            <hr />            
            <hr />
            <code className="--color-dark">
              Created on: {transaction.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {transaction.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TransactionDetail;
