const asyncHandler = require("express-async-handler");
const Supplier = require("../models/supplierModel");

const createSupplier = asyncHandler(async (req, res) => {
    const {name, email, phone, status } = req.body;
  
    //   Validation
    if (!name || !email) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
  
    // Create Supplier
    const product = await Supplier.create({
      user: req.user.id,
      name,
      email,
      phone,
      status
    });
  
    res.status(201).json(product);
  });

// Get Suppliers
const getSuppliers = asyncHandler(async (req, res) => {
    try {
      const suppliers = await Supplier.find({ user: req.user.id, deletedAt: null }).sort("-createdAt");
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
// Get Supplier By Id
const getSupplierById = asyncHandler(async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
// Update Supplier
const updateSupplier = asyncHandler(async (req, res) => {
  try {
    const {name, email, phone, status } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        name, 
        email, 
        phone, 
        status 
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedSupplier) {
      res.status(200).json(updatedSupplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Supplier
const deleteSupplier = asyncHandler(async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );
    if (deletedSupplier) {
      res.status(200).json(deletedSupplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
}