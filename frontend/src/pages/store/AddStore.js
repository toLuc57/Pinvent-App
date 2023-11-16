import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import StoreForm from "../../components/store/storeForm/StoreForm";
import {
  createStore,
  selectIsLoading,
} from "../../redux/features/store/storeSlice";

const initialState = {
  name: "",
  phone: "",
  location: "",
  state: "",
  status: 1,
};

const AddStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [store, setStore] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const { name, phone, location, state, status } = store;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const saveStore = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("status", Number(status));
    formData.append("location", location);
    formData.append("state", state);

    console.log(...formData);

    await dispatch(createStore(formData));

    navigate("/stores");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Store</h3>
      <StoreForm
        store={store}
        handleInputChange={handleInputChange}
        saveStore={saveStore}
      />
    </div>
  );
};

export default AddStore;
