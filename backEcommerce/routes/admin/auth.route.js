const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/auth.controller");
// const { verifyAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of admin
 *         name:
 *           type: string
 *           description: Name of the admin
 *         email:
 *           type: string
 *           description: Admin email (unique)
 *         password:
 *           type: string
 *           description: Admin password (hashed)
 *         role:
 *           type: string
 *           enum: [superAdmin, admin, manager]
 *         isActive:
 *           type: boolean
 *         permissions:
 *           type: object
 *         lastLogin:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management routes
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [superAdmin, admin, manager]
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Admin already exists
 */
router.post("/register", adminController.registerAdmin);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", adminController.loginAdmin);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get("/", adminController.getAdmins);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin details
 *       404:
 *         description: Admin not found
 */
router.get("/getbyid", adminController.getAdminById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               permissions:
 *                 type: object
 *     responses:
 *       200:
 *         description: Admin updated
 *       404:
 *         description: Admin not found
 */
router.put("/update", adminController.updateAdmin);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin deleted
 *       404:
 *         description: Admin not found
 */
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
