/**
 * @swagger
 * tags:
 *   name: Highly Utility Itemsets
 *   description: Highly Utility Itemsets
 * /huis:
 *   get:
 *     summary: Highly Utility Itemsets
 *     tags: [Highly Utility Itemsets]
 *     description: Get high utility itemsets above the minimum threshold
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           parameters:
 *             minUtility:
 *               name: minUtility
 *               schema:
 *                 type: integer
 *                 format: int64
 *                 default: 30
 *     responses:
 *       200:
 *         description: get Highly Utility Itemsets in Transaction
 *       404:
 *        description: Minimum utility threshold not found
 *       500:
 *         description: Some server error
 */

const express = require("express");
const { getHighlyUtilityItemsets } = require("../controllers/highlyUtilityiIemsetsController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.get("/", protect, getHighlyUtilityItemsets);

module.exports = router;
