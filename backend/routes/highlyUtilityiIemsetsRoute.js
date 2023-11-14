const express = require("express");
const { getHighlyUtilityItemsets } = require("../controllers/highlyUtilityiIemsetsController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.get("/", protect, getHighlyUtilityItemsets);

module.exports = router;
