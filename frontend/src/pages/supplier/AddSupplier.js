import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SupplierForm from "../../components/supplier/supplierForm/SupplierForm";
import {
  createSupplier,
  selectIsLoading,
} from "../../redux/features/supplier/supplierSlice";

const initialState = {
  name: "",
  phone: "",
  email: "",
  status: 1,
};

const AddSupplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const { name, phone, email, status } = supplier;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const saveSupplier = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("status", Number(status ?? 1));
    formData.append("email", email);

    console.log(...formData);

    await dispatch(createSupplier(formData));

    navigate("/suppliers");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Supplier</h3>
      <SupplierForm
        supplier={supplier}
        handleInputChange={handleInputChange}
        saveSupplier={saveSupplier}
        isAdded={true}
      />
    </div>
  );
};

export default AddSupplier;
