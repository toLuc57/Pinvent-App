const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
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
    staff_id: Number,
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
const staffCounterSchema = new mongoose.Schema({
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

const StaffCounter = mongoose.model('StaffCounter', staffCounterSchema);
const Staff = mongoose.model('Staff', staffSchema);

staffSchema.pre('save', async function(next) {
  if (!this.staff_id) {
      const counter = await StaffCounter.findOneAndUpdate(
          { user_id: this.user },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
      );
      this.staff_id = counter.sequence_value;
  }
  next();
});

module.exports = {
    Staff,
    StaffCounter
};
