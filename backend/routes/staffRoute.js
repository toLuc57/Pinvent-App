const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createStaff,
    getStaffs,
    getStaffById,
    updateStaff,
    deleteStaff
} = require('../controllers/staffController');

route.post("/", post, createStaff);
router.get('/staffs', protect, getStaffs);
router.get('/staffs/:id', protect, getStaffById);
router.patch('/staffs/:id', protect, updateStaff);
router.delete("/:id", protect, deleteStaff);

module.exports = router;