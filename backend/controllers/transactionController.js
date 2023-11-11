const asyncHandler = require("express-async-handler");
const Transaction = require('../models/transactionModel');
const Product = require('../models/productModel');
const {AlgoUPGrowth} = require("../UP-Growth/AlgoUPGrowth");

const createTransaction = asyncHandler(async (req, res) => {
  try {
    const {status, total, supplier, staff_id, detail} = req.body;

    if (!status || !total || !supplier || !staff_id || !detail) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    const newTransaction = await Transaction.create({
      user: req.user.id,
      status,
      total,
      supplier,
      staff_id,
      detail
    });
    
    return res.status(201).json(newTransaction);
  } catch (error) {
    res.status(404).json('Cannot create new Transaction');
  }
});

// Get all transactions 
const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json('Cannot get all transactions');
  }
});
  
// Get all successful transactions (status 3)
const getSuccessfulTransactions = asyncHandler(async (req, res) => {
  try {    
    const successfulTransactions = await Transaction.find({ user: req.user.id, status: 3 }).sort("-createdAt");
    res.status(200).json(successfulTransactions);
  } catch (error) {
    res.status(404).json('Cannot get all successful transactions');
  }
});

// Get all canceled transactions (status 4)
const getCancelledTransactions = asyncHandler(async (req, res) => {
  try {
    const cancelledTransactions = await Transaction.find({ user: req.user.id, status: 4 }).sort("-createdAt");
    return cancelledTransactions;
  } catch (error) {
    res.status(404).json('Cannot get all canceled transactions');
  }
});

// Get single transaction
const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  // if Transaction doesnt exist
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }
  // Match transaction to its user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(transaction);
});

  // Update transaction status
const updateTransactionStatus = asyncHandler(async (req, res) => {
  try {
    const {status} = req.body;

    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    // if Transaction doesnt exist
    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }
    // Match Transaction to its user
    if (transaction.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate( 
      {_id: id}, 
      { status }, 
      { 
        new: true,
        runValidators: true,
      }
      );
    return res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(404).json('Unable to update transaction status');
  }
});

const getHighlyUsefulItemsets = asyncHandler(async (req, res) => {
  const { minUtility } = req.body;

  if (!minUtility) {
    res.status(404);
    throw new Error("Minimum utility threshold not found");
  }

  const successfulTransactions = await Transaction.find({ user: req.user.id, status: 3 }).sort("-createdAt");
  const algo = new AlgoUPGrowth();

  const HUIs = algo.runAlgorithmDB(successfulTransactions, minUtility);

  const results = [];

  try {
    const arrayResult = await convertPromiseToArray(HUIs);

    const productPromises = arrayResult.map(async (item) => {
      const tempProductsData = [];
      for (const itemId of item.itemset) {
        const product = await Product.find({ product_id: itemId });
        tempProductsData.push(product);
      }

      return { products: tempProductsData, utility: item.utility };
    });

    // Wait for all product promises to resolve
    const finalResults = await Promise.all(productPromises);
    res.status(200).json(finalResults);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function convertPromiseToArray(promise) {
  try {
      const result = await promise; // Đợi cho đến khi Promise được giải quyết
      return Array.from(result); // Chuyển kết quả thành mảng
  } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      return []; // Trả về một mảng trống hoặc giá trị mặc định khác tùy theo tình huống
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getSuccessfulTransactions,
  getCancelledTransactions,
  getTransaction,
  updateTransactionStatus,
  getHighlyUsefulItemsets,
}