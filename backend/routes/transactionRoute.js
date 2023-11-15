/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the transaction
 *         user:
 *           type: string
 *           description: The ID of the user associated with the transaction
 *         status:
 *           type: number
 *           description: The status of the transaction (1 = Pending, 2 = In progress, 3 = Successful, 4 = Cancelled)
 *         total:
 *           type: number
 *           description: The total amount of the transaction
 *         supplier:
 *           type: string
 *           description: The ID of the supplier associated with the transaction
 *         store_id:
 *           type: string
 *           description: The ID of the store associated with the transaction
 *         staff_id:
 *           type: string
 *           description: The ID of the staff associated with the transaction
 *         detail:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: number
 *                 description: The ID of the product in the transaction detail
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product in the transaction detail
 *               price:
 *                 type: number
 *                 description: The price of the product in the transaction detail
 *       required:
 *         - user
 *         - status
 *         - total
 *         - detail
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: The transactions managing API
 * /transactions:
 *   get:
 *     summary: Lists all the transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: The list of the transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The created transaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Some server error
 * /transactions/{id}:
 *   get:
 *     summary: Get the transaction by id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: The transaction response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: The transaction was not found
 *   patch:
 *    summary: Update the transaction by the id
 *    tags: [Transactions]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The transaction id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Transaction'
 *    responses:
 *      200:
 *        description: The transaction was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transaction'
 *      404:
 *        description: The transaction was not found
 *      500:
 *        description: Some error happened
 */

const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { 
    createTransaction,
    getAllTransactions,
    getTransaction,
    updateTransactionStatus,
} = require("../controllers/transactionController");

router.post('/', protect, createTransaction);
router.get('/', protect, getAllTransactions);
router.get('/:id', protect, getTransaction);
router.patch('/:id', protect, updateTransactionStatus);

module.exports = router;
