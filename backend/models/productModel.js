const mongoose = require("mongoose");
const ProductCounter = require("./productCounterModel");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product_id: Number,
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: String,
      // default: {},
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', async function(next) {
  if (!this.product_id) {
      const counter = await ProductCounter.findOneAndUpdate(
          { user_id: this.user },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
      );
      this.product_id = counter.sequence_value;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
