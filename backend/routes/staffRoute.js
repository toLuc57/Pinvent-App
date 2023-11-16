/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the staff
 *         user:
 *           type: string
 *           description: The ID of the user associated with the staff
 *         name:
 *           type: string
 *           description: The name of the staff
 *         staff_id:
 *           type: number
 *           description: The unique ID of the staff
 *         phone:
 *           type: string
 *           description: The phone number of the staff
 *         email:
 *           type: string
 *           description: The email address of the staff
 *         status:
 *           type: number
 *           description: The status of the staff (1 = Active, 2 = Inactive)
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the staff was deleted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the staff was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the staff was last updated
 *       required:
 *         - name
 *         - email
 */

/**
 * @swagger
 * tags:
 *   name: Staffs
 *   description: The staffs managing API
 * /staffs:
 *   get:
 *     summary: Lists all the staffs
 *     tags: [Staffs]
 *     responses:
 *       200:
 *         description: The list of the staffs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *   post:
 *     summary: Create a new staff
 *     tags: [Staffs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       201:
 *         description: The created staff.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 * /staffs/{id}:
 *   get:
 *     summary: Get the staff by id
 *     tags: [Staffs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff id
 *     responses:
 *       200:
 *         description: The staff response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: The staff was not found
 *   patch:
 *    summary: Update the staff by the id
 *    tags: [Staffs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The staff id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Staff'
 *    responses:
 *      200:
 *        description: The staff was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Staff'
 *      404:
 *        description: The staff was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the staff by id
 *     tags: [Staffs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff id
 *
 *     responses:
 *       200:
 *         description: The staff was deleted
 *       404:
 *         description: The staff was not found
 */

const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createStaff,
    getStaffs,
    getStaffById,
    updateStaff,
    deleteStaff
} = require('../controllers/staffController');

router.post("/", protect, createStaff);
router.get('/', protect, getStaffs);
router.get('/:id', protect, getStaffById);
router.patch('/:id', protect, updateStaff);
router.delete("/:id", protect, deleteStaff);

module.exports = router;