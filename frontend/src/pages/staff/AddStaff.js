import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import StaffForm from "../../components/staff/staffForm/StaffForm";
import {
  createStaff,
  selectIsLoading,
} from "../../redux/features/staff/staffSlice";

const initialState = {
  name: "",
  phone: "",
  email: "",
  status: 1,
};

const AddStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const { name, phone, email, status } = staff;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const saveStaff = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("status", Number(status ?? 1));
    formData.append("email", email);

    console.log(...formData);

    await dispatch(createStaff(formData));

    navigate("/staffs");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Staff</h3>
      <StaffForm
        staff={staff}
        handleInputChange={handleInputChange}
        saveStaff={saveStaff}
        isAdded={true}
      />
    </div>
  );
};

export default AddStaff;
