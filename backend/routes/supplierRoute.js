/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the supplier
 *         user:
 *           type: string
 *           description: The ID of the user associated with the supplier
 *         name:
 *           type: string
 *           description: The name of the supplier
 *         supplier_id:
 *           type: number
 *           description: The unique ID of the supplier
 *         phone:
 *           type: string
 *           description: The phone number of the supplier
 *         email:
 *           type: string
 *           description: The email address of the supplier
 *         status:
 *           type: number
 *           description: The status of the supplier (1 = Active, 2 = Inactive)
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the supplier was deleted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the supplier was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the supplier was last updated
 *       required:
 *         - name
 *         - email
 */

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: The suppliers managing API
 * /suppliers:
 *   get:
 *     summary: Lists all the suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: The list of the suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: The created supplier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       500:
 *         description: Some server error
 * /suppliers/{id}:
 *   get:
 *     summary: Get the supplier by id
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The supplier id
 *     responses:
 *       200:
 *         description: The supplier response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: The supplier was not found
 *   patch:
 *    summary: Update the supplier by the id
 *    tags: [Suppliers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The supplier id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Supplier'
 *    responses:
 *      200:
 *        description: The supplier was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Supplier'
 *      404:
 *        description: The supplier was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the supplier by id
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The supplier id
 *
 *     responses:
 *       200:
 *         description: The supplier was deleted
 *       404:
 *         description: The supplier was not found
 */

const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} = require('../controllers/supplierController');

router.post("/", protect, createSupplier);
router.get('/suppliers', protect, getSuppliers);
router.get('/suppliers/:id', protect, getSupplierById);
router.patch('/suppliers/:id', protect, updateSupplier);
router.delete("/:id", protect, deleteSupplier);

module.exports = router;