import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/transactions/`;

// Create New Transaction
const createTransaction = async (formData) => {

  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all transactions
const getTransactions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Transaction
const getTransaction = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};
// Update Transaction
const updateTransaction = async (id, formData) => {
  const status = formData.get("status");

  const data = {
    status,
  }

  const response = await axios.patch(`${API_URL}${id}`, data);
  return response.data;
};

// Get Highly Useful Itemsets
// const getHighlyUsefulItemsets = async (formData) => {
//     const minUtility = formData.get("minUtility");
  
//     const data = {
//         minUtility,
//     }
  
//     const response = await axios.patch(`${API_URL}/huis`, data);
//     return response.data;
//   };

const transactionService = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  // getHighlyUsefulItemsets,
};

export default transactionService;
