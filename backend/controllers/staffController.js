const asyncHandler = require("express-async-handler");
const Staff = require("../models/staffModel");

// Create Staff
const createStaff = asyncHandler(async (req, res) => {
    const {name, phone, email, status } = req.body;
  
    //   Validation
    if (!name || !email) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    // Check if staff email already exists
    const staffExists = await Staff.findOne({ email });

    if (staffExists) {
      res.status(400);
      throw new Error("Email has already been registered");
    }
  
    // Create Staff
    const staff = await Staff.create({
      user: req.user.id,
      name,
      email,
      phone,
      status,
    });
  
    res.status(201).json(staff);
  });

// Get Staff
const getStaffs = asyncHandler(async (req, res) => {
    try {
      const staffs = await Staff.find({ user: req.user.id, deletedAt: null }).sort("-createdAt");
      res.status(200).json(staffs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
  // Get Staff By Id
const getStaffById = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
  // Update Staff
const updateStaff = asyncHandler(async (req, res) => {
  try {
    const {name, phone, email, status } = req.body;

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        name, 
        phone, 
        email, 
        status, 
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedStaff) {
      res.status(200).json(updatedStaff);
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Staff
const deleteStaff = asyncHandler(async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );
    if (deletedStaff) {
      res.status(200).json(deletedStaff);
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
    createStaff,
    getStaffs,
    getStaffById,
    updateStaff,
    deleteStaff,
}