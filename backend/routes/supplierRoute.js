const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} = require('../controllers/supplierController');

route.post("/", post, createSupplier);
router.get('/suppliers', protect, getSuppliers);
router.get('/suppliers/:id', protect, getSupplierById);
router.patch('/suppliers/:id', protect, updateSupplier);
router.delete("/:id", protect, deleteSupplier);

module.exports = router;