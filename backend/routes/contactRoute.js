/**
 * @swagger
 * tags:
 *   name: Contact Us
 *   description: Contact Us
 * /contactUs:
 *   get:
 *     summary: Contact Us
 *     tags: [Contact Us]
 *     responses:
 *       200:
 *         description: Email Sent
 *       400:
 *        description: User, subject or message not found
 *       500:
 *         description: Some server error
 */

const express = require("express");
const { contactUs } = require("../controllers/contactController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.post("/", protect, contactUs);

module.exports = router;
