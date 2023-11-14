const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
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
    supplier_id: Number,
    phone: {
      type: String,
      default: "+234",
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
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

const supplierCounterSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "User",
    },
    sequence_value: {
        type: Number,
        default: 1
    }
});

const SupplierCounter = mongoose.model('SupplierCounter', supplierCounterSchema);
const Supplier = mongoose.model('Supplier', supplierSchema);

supplierSchema.pre('save', async function(next) {
  if (!this.supplier_id) {
      const counter = await SupplierCounter.findOneAndUpdate(
          { user_id: this.user },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
      );
      this.supplier_id = counter.sequence_value;
  }
  next();
});

module.exports = {
    Supplier,
    SupplierCounter
};
