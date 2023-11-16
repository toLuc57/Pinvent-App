import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import StaffForm from "../../components/staff/staffForm/StaffForm";
import {
  getStaff,
  getStaffs,
  selectIsLoading,
  selectStaff,
  updateStaff,
} from "../../redux/features/staff/staffSlice";

const EditStaff = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const staffEdit = useSelector(selectStaff);

  const [staff, setStaff] = useState(staffEdit);

  useEffect(() => {
    dispatch(getStaff(id));
  }, [dispatch, id]);

  useEffect(() => {
    setStaff(staffEdit);

  }, [staffEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const saveStaff = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", staff?.name);
    formData.append("phone", staff?.phone);
    formData.append("status", Number(staff?.status ?? 1));
    formData.append("email", staff?.email);

    console.log(...formData);

    await dispatch(updateStaff({ id, formData }));
    await dispatch(getStaffs());
    navigate("/staffs");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Staff</h3>
      <StaffForm
        staff={staff}
        handleInputChange={handleInputChange}
        saveStaff={saveStaff}
        isAdded={false}
      />
    </div>
  );
};

export default EditStaff;
