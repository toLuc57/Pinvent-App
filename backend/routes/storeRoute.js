/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the store
 *         user:
 *           type: string
 *           description: The ID of the user associated with the store
 *         name:
 *           type: string
 *           description: The name of the store
 *         store_id:
 *           type: number
 *           description: The unique ID of the store
 *         phone:
 *           type: string
 *           description: The phone number of the store
 *         location:
 *           type: string
 *           description: The location of the store
 *         state:
 *           type: string
 *           description: The state of the store
 *         status:
 *           type: number
 *           description: The status of the store (1 = Active, 2 = Inactive)
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the store was deleted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the store was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the store was last updated
 *       required:
 *         - name
 *         - location
 */

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: The stores managing API
 * /stores:
 *   get:
 *     summary: Lists all the stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: The list of the stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       201:
 *         description: The created store.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       500:
 *         description: Some server error
 * /stores/{id}:
 *   get:
 *     summary: Get the store by id
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The store id
 *     responses:
 *       200:
 *         description: The store response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: The store was not found
 *   patch:
 *    summary: Update the store by the id
 *    tags: [Stores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The store id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Store'
 *    responses:
 *      200:
 *        description: The store was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Store'
 *      404:
 *        description: The store was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the store by id
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The store id
 *
 *     responses:
 *       200:
 *         description: The store was deleted
 *       404:
 *         description: The store was not found
 */

const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore
} = require('../controllers/storeController');

router.post("/", protect, createStore);
router.get('/', protect, getStores);
router.get('/:id', protect, getStoreById);
router.patch('/:id', protect, updateStore);
router.delete("/:id", protect, deleteStore);

module.exports = router;