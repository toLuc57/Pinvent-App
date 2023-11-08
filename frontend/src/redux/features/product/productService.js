import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;
const image_URL = `products`;

// Create New Product
const createProduct = async (formData) => {
  let fileName = "";
  if(formData.get("file")){
    const res = await axios.post(`${BACKEND_URL}/api/upload/${image_URL}`, formData);
    fileName = res.data;
  }
  const name = formData.get("name");
  const sku = formData.get("sku");
  const category = formData.get("category");
  const quantity = formData.get("quantity");
  const price = formData.get("price");
  const description = formData.get("description");

  const data = {
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image : fileName
  }

  const response = await axios.post(API_URL, data);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  let fileName = "";
  if(formData.get("file")){
    const res = await axios.post(`${BACKEND_URL}/api/upload/${image_URL}`, formData);
    fileName = res.data;
  }

  const name = formData.get("name");
  const category = formData.get("category");
  const quantity = formData.get("quantity");
  const price = formData.get("price");
  const description = formData.get("description");
  const image = formData.get("image");

  const data = {
    name,
    category,
    quantity,
    price,
    description,
    image : fileName === "" ? image : fileName,
  }

  console.log(image);
  console.log("--");
  console.log(fileName);

  const response = await axios.patch(`${API_URL}${id}`, data);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
