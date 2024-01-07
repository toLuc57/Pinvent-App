const asyncHandler = require("express-async-handler");
const Transaction = require('../models/transactionModel');
const Product = require('../models/productModel');
const Supplier = require('../models/supplierModel');
const Staff = require('../models/staffModel');
const Store = require('../models/storeModel');

const createTransaction = asyncHandler(async (req, res) => {
  try {
    const {status, total, supplier, staff, details, store} = req.body;

    console.log(req.body)

    if (!status || !total || !supplier || !staff || !details) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    const newTransaction = await Transaction.create({
      user: req.user.id,
      supplier,
      store,
      staff,
      status,
      details,
      total
    });
    
    return res.status(201).json(newTransaction);
  } catch (error) {
    res.status(404).json({message: error.message});
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
  
// Get single transaction
const getTransaction = asyncHandler(async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
  
    // Kiểm tra xem transaction có tồn tại không
    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }
  
    // Kiểm tra xem transaction có thuộc về user hiện tại không
    if (transaction.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    // Sử dụng Promise.all để chờ tất cả các promises hoàn thành
    const transformedDetail = await Promise.all(transaction.details.map(async (item) => {
      const product = await Product.findOne({ product_id: item.product_id, user: req.user.id });
      return {
        product,
        quantity: item.quantity,
        price: item.price,
      };
    }));

    const transformedSupplier = await (async () => {
      const supplier = await Supplier.findById(transaction.supplier);
      return {
        supplier
      };
    })();
    
    const transformedStaff = await (async () => {
      const staff = await Staff.findById(transaction.staff);
      return {
        staff
      };
    })();
    
    const transformedStore = await (async () => {
      const store = await Store.findById(transaction.store);
      return {
        store
      };
    })();
    
    const result = { ...transaction._doc };
    result.details = transformedDetail.map((detail) => ({
      ...detail.product._doc,
      quantity: detail.quantity,
      price: detail.price,
    }));
    
    result.supplier = transformedSupplier.supplier;
    result.staff = transformedStaff.staff;
    result.store = transformedStore.store;

    res.status(200).json(result);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
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

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransaction,
  updateTransactionStatus,
}