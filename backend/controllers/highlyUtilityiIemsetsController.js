const asyncHandler = require("express-async-handler");
const Transaction = require('../models/transactionModel');
const Product = require('../models/productModel');
const {AlgoUPGrowth} = require("../UP-Growth/AlgoUPGrowth");

// Get Highly Utility Itemsets
const getHighlyUtilityItemsets = asyncHandler(async (req, res) => {
    const { minUtility } = req.body;
  
    if (!minUtility) {
      res.status(404);
      throw new Error("Minimum utility threshold not found");
    }
  
    const successfulTransactions = await Transaction.find({ user: req.user.id, status: 3 }).sort("-createdAt");
    const algo = new AlgoUPGrowth();
  
    const HUIs = algo.runAlgorithmDB(successfulTransactions, minUtility);
  
    try {
      const arrayResult = await convertPromiseToArray(HUIs);
  
      const productPromises = arrayResult.map(async (item) => {
        const tempProductsData = [];
        for (const itemId of item.itemset) {
          const product = await Product.findOne({ product_id: itemId });
          tempProductsData.push(product);
        }
  
        return { products: tempProductsData, utility: item.utility };
      });
  
      // Wait for all product promises to resolve
      const finalResults = await Promise.all(productPromises);
      res.status(200).json(finalResults);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
  
  async function convertPromiseToArray(promise) {
    try {
        const result = await promise; // Đợi cho đến khi Promise được giải quyết
        return Array.from(result); // Chuyển kết quả thành mảng
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        return []; // Trả về một mảng trống hoặc giá trị mặc định khác tùy theo tình huống
    }
  }

module.exports = {
    getHighlyUtilityItemsets,
}