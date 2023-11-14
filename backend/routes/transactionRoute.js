const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { 
    createTransaction,
    getAllTransactions,
    getTransaction,
    updateTransactionStatus,
} = require("../controllers/transactionController");

router.post('/', protect, createTransaction);
router.get('/', protect, getAllTransactions);
router.get('/:id', protect, getTransaction);
router.patch('/:id', protect, updateTransactionStatus);

module.exports = router;
