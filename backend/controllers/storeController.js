const asyncHandler = require("express-async-handler");
const Store = require("../models/storeModel");

// Create Store
const createStore = asyncHandler(async (req, res) => {
    const {name, location, phone, state, status } = req.body;
  
    //   Validation
    if (!name || !location) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
  
    // Create Store
    const product = await Store.create({
      user: req.user.id,
      name,
      location,
      phone,
      state,
      status,
    });
  
    res.status(201).json(product);
  });

// Get Stores
const getStores = asyncHandler(async (req, res) => {
    try {
      const stores = await Store.find({ user: req.user.id, deletedAt: null }).sort("-createdAt");
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
// Get Store By Id
const getStoreById = asyncHandler(async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
// Update Store 
const updateStore = asyncHandler(async (req, res) => {
  try {
    const {name, location, phone, state, status } = req.body;
    
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        phone,
        state,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedStore) {
      res.status(200).json(updatedStore);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Store
const deleteStore = asyncHandler(async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );
    if (deletedStore) {
      res.status(200).json(deletedStore);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore,
}