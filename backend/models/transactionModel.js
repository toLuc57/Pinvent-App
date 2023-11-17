const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: Number,
      enum: [1, 2, 3, 4], // Định nghĩa các trạng thái của giao dịch, ví dụ: 1 = Chờ xác nhận, 2 = Đang xử lý, 3 = Thành công, 4 = Bị hủy
      default: 1 // Trạng thái mặc định khi tạo giao dịch
    },
    total: Number,
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Supplier",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staffs",
    },
    details: [
      {
        product_id: Number,
        quantity: Number,
        price: Number
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
