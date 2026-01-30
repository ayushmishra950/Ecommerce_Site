const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role.controller");
const adminAuth = require("../middlewares/adminAuth");
const superAdminOnly = require("../middlewares/superAdminOnly");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role & Permission management (Super Admin only)
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create role (admin / manager)
 *     tags: [Roles]
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
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Manager One
 *               email:
 *                 type: string
 *                 example: manager@gmail.com
 *               password:
 *                 type: string
 *                 example: manager@123
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
 *         description: Role created successfully
 */
router.post(
  "/",
  adminAuth,
  superAdminOnly,
  roleController.createRole
);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles (admin & manager)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get(
  "/",
  adminAuth,
  superAdminOnly,
  roleController.getAllRoles
);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
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
 *         description: Role details
 */
router.get(
  "/:id",
  adminAuth,
  superAdminOnly,
  roleController.getRoleById
);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role & permissions
 *     tags: [Roles]
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
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, manager]
 *               permissions:
 *                 type: object
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Role updated successfully
 */
router.put(
  "/:id",
  adminAuth,
  superAdminOnly,
  roleController.updateRole
);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Role deleted successfully
 */
router.delete(
  "/:id",
  adminAuth,
  superAdminOnly,
  roleController.deleteRole
);

/**
 * @swagger
 * /api/roles/permissions/{id}:
 *   patch:
 *     summary: Update only permissions
 *     tags: [Roles]
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
 *             properties:
 *               permissions:
 *                 type: object
 *                 example:
 *                   products: true
 *                   orders: false
 *                   users: false
 *                   categories: true
 *                   coupons: false
 *     responses:
 *       200:
 *         description: Permissions updated successfully
 */
router.patch(
  "/permissions/:id",
  adminAuth,
  superAdminOnly,
  roleController.updatePermissions
);

module.exports = router;
