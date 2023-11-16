import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import TransactionForm from "../../components/transaction/transactionForm/TransactionForm";
import {
  createTransaction,
  selectIsLoading,
} from "../../redux/features/transaction/transactionSlice";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const handleSaveTransaction = async (formData) => {
    console.log("handleSaveTransaction");
    console.log(formData);
    await dispatch(createTransaction(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Transaction</h3>
      <TransactionForm 
        handleSaveTransaction={handleSaveTransaction}
      />
    </div>
  );
};

export default AddTransaction;
