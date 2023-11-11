const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { 
    createTransaction,
    getAllTransactions, 
    getSuccessfulTransactions, 
    getCancelledTransactions, 
    getTransaction,
    updateTransactionStatus,
    getHighlyUsefulItemsets,
} = require("../controllers/transactionController");

router.post('/', protect, createTransaction);
router.get('/', protect, getAllTransactions);
router.get('/success', protect, getSuccessfulTransactions);
router.get('/cancel', protect, getCancelledTransactions);
router.get('/single/:id', protect, getTransaction);
router.patch('/:id', protect, updateTransactionStatus);
router.get('/huis', protect, getHighlyUsefulItemsets);

module.exports = router;
