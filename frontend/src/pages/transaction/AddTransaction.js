import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import TransactionForm from "../../components/transaction/transactionForm/TransactionForm";
import {
  createTransaction,
  selectIsLoading,
} from "../../redux/features/transaction/transactionSlice";

const initialState = {
  supplier: "",
  staff: "",
  store: "",
  details: [],
};

const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const { supplier, staff, store, details } = transaction;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };


  const saveTransaction = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("supplier", supplier);
    formData.append("store", store);
    formData.append("staff", staff);
    formData.append("details", details);

    console.log(...formData);

    await dispatch(createTransaction(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Transaction</h3>
      <TransactionForm 
        handleInputChange={handleInputChange}
        saveTransaction={saveTransaction}
      />
    </div>
  );
};

export default AddTransaction;
