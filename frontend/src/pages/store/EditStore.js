import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import StoreForm from "../../components/store/storeForm/StoreForm";
import {
  getStore,
  getStores,
  selectIsLoading,
  selectStore,
  updateStore,
} from "../../redux/features/store/storeSlice";

const EditStore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const storeEdit = useSelector(selectStore);

  const [store, setStore] = useState(storeEdit);

  useEffect(() => {
    dispatch(getStore(id));
  }, [dispatch, id]);

  useEffect(() => {
    setStore(storeEdit);

  }, [storeEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const saveStore = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", store?.name);
    formData.append("phone", store?.phone);
    formData.append("status", Number(store?.status));
    formData.append("location", store?.location);
    formData.append("state", store?.state);

    console.log(...formData);

    await dispatch(updateStore({ id, formData }));
    await dispatch(getStores());
    navigate("/stores");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Store</h3>
      <StoreForm
        store={store}
        handleInputChange={handleInputChange}
        saveStore={saveStore}
      />
    </div>
  );
};

export default EditStore;
