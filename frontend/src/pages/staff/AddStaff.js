import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import StaffForm from "../../components/staff/staffForm/StaffForm";
import {
  createStaff,
  selectIsLoading,
} from "../../redux/features/staff/staffSlice";
import { toast } from "react-toastify";
import { validateEmail } from "../../services/authService";
import { getStaffs } from '../../redux/features/staff/staffSlice';

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
  const [emailExists, setEmailExists] = useState(false);

  const { staffs, isError, message } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    dispatch(getStaffs());

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

  const { name, phone, email, status } = staff;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
    console.log(name)
    if(name === "email"){
      const tempStaffs = staffs.filter((staff) => {
        const lowercasedSearch = value.toLowerCase();
        return staff.email && staff.email.toLowerCase() === (lowercasedSearch);
        } 
      );
      if(tempStaffs.length > 0 ){
        setEmailExists(true);
      }
      else {
        setEmailExists(false);
      }
    }
  };

  const saveStaff = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

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
        emailExists={emailExists}
      />
    </div>
  );
};

export default AddStaff;
