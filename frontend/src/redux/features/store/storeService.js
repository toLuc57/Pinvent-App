import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/stores/`;

// Create New Store
const createStore = async (formData) => {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const location = formData.get("location");
  const status = formData.get("status");

  const data = {
    name,
    phone,
    location,
    status,
  }

  const response = await axios.post(API_URL, data);
  return response.data;
};

// Get all stores
const getStores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Store
const getStore = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};
// Update Store
const updateStore = async (id, formData) => {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const location = formData.get("location");
  const status = formData.get("status");

  const data = {
    name,
    phone,
    location,
    status,
  }

  const response = await axios.patch(`${API_URL}${id}`, data);
  return response.data;
};
// Delete a Store
const deleteStore= async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const storeService = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
};

export default storeService;
