import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionList from "../../components/transaction/transactionList/TransactionList";
import TransactionSummary from "../../components/transaction/transactionSummary/TransactionSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getTransactions } from "../../redux/features/transaction/transactionSlice";

const Transaction = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTransactions());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <TransactionSummary transactions={transactions} />
      <TransactionList transactions={transactions} isLoading={isLoading} />
    </div>
  );
};

export default Transaction;
