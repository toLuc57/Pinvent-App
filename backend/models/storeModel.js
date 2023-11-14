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
    store_id: Number,
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

const storeCounterSchema = new mongoose.Schema({
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

const StoreCounter = mongoose.model('StoreCounter', storeCounterSchema);
const Store = mongoose.model('Store', storeSchema);

storeSchema.pre('save', async function(next) {
  if (!this.store_id) {
      const counter = await StoreCounter.findOneAndUpdate(
          { user_id: this.user },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
      );
      this.store_id = counter.sequence_value;
  }
  next();
});

module.exports = {
    Store,
    StoreCounter,
};
