import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/suppliers/`;

// Create New Supplier
const createSupplier = async (formData) => {
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

// Get all suppliers
const getSuppliers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Supplier
const getSupplier = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};
// Update Supplier
const updateSupplier = async (id, formData) => {
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
// Delete a Supplier
const deleteSupplier= async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const supplierService = {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};

export default supplierService;
