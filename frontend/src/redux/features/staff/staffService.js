import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/staffs/`;

// Create New Staff
const createStaff = async (formData) => {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const status = formData.get("status");

  const data = {
    name,
    phone,
    email,
    status,
  }

  const response = await axios.post(API_URL, data);
  return response.data;
};

// Get all staffs
const getStaffs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Staff
const getStaff = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};
// Update Staff
const updateStaff = async (id, formData) => {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const status = formData.get("status");

  const data = {
    name,
    phone,
    email,
    status,
  }

  const response = await axios.patch(`${API_URL}${id}`, data);
  return response.data;
};
// Delete a Staff
const deleteStaff= async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const staffService = {
  createStaff,
  getStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
};

export default staffService;
