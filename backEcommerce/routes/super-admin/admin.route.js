const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/adminAuth");
const superAdminOnly = require("../middlewares/superAdminOnly");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin & Super Admin management
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
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
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin@123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", adminController.adminLogin);

/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: Create new admin (Super Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *                 enum: [admin, manager]
 *               permissions:
 *                 type: object
 *                 properties:
 *                   products:
 *                     type: boolean
 *                   orders:
 *                     type: boolean
 *                   users:
 *                     type: boolean
 *                   categories:
 *                     type: boolean
 *                   coupons:
 *                     type: boolean
 *     responses:
 *       201:
 *         description: Admin created successfully
 */
router.post(
  "/create",
  adminAuth,
  superAdminOnly,
  adminController.createAdmin
);

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get all admins (Super Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get(
  "/",
  adminAuth,
  superAdminOnly,
  adminController.getAllAdmins
);

/**
 * @swagger
 * /api/admin/{id}:
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
 */
router.get(
  "/:id",
  adminAuth,
  superAdminOnly,
  adminController.getAdminById
);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update admin (Super Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Admin updated
 */
router.put(
  "/:id",
  adminAuth,
  superAdminOnly,
  adminController.updateAdmin
);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete admin (Super Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Admin deleted
 */
router.delete(
  "/:id",
  adminAuth,
  superAdminOnly,
  adminController.deleteAdmin
);

/**
 * @swagger
 * /api/admin/status/{id}:
 *   patch:
 *     summary: Enable or Disable admin (Super Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Admin status updated
 */
router.patch(
  "/status/:id",
  adminAuth,
  superAdminOnly,
  adminController.toggleAdminStatus
);

module.exports = router;
