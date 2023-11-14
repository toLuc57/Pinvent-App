const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore
} = require('../controllers/storeController');

route.post("/", post, createStore);
router.get('/stores', protect, getStores);
router.get('/stores/:id', protect, getStoreById);
router.patch('/stores/:id', protect, updateStore);
router.delete("/:id", protect, deleteStore);

module.exports = router;