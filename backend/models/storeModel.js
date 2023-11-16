const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    phone: {
      type: String,
      default: "+234",
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
      default: "VN",
    },
    status: {
      type: Number,
      enum: [1, 2], // Định nghĩa các trạng thái, ví dụ: 1 = Đang hoạt động, 2 = Ngừng hoạt động
      default: 1 // Trạng thái hoạt động
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;