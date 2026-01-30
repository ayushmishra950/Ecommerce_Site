const express = require("express");
const router = express.Router();

const settingController = require("../controllers/superAdminSetting.controller");
const adminAuth = require("../middlewares/adminAuth");
const superAdminOnly = require("../middlewares/superAdminOnly");

/**
 * @swagger
 * tags:
 *   name: SuperAdmin Settings
 *   description: System & application settings (Super Admin only)
 */

/**
 * @swagger
 * /api/super-admin/settings:
 *   get:
 *     summary: Get all system settings
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Settings fetched successfully
 */
router.get(
  "/",
  adminAuth,
  superAdminOnly,
  settingController.getSettings
);

/**
 * @swagger
 * /api/super-admin/settings/site:
 *   put:
 *     summary: Update site settings
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteName:
 *                 type: string
 *                 example: My Ecommerce
 *               siteEmail:
 *                 type: string
 *                 example: support@site.com
 *               siteLogo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Site settings updated
 */
router.put(
  "/site",
  adminAuth,
  superAdminOnly,
  settingController.updateSiteSettings
);

/**
 * @swagger
 * /api/super-admin/settings/order:
 *   put:
 *     summary: Update order settings
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               autoCancelDays:
 *                 type: number
 *                 example: 7
 *               allowGuestCheckout:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Order settings updated
 */
router.put(
  "/order",
  adminAuth,
  superAdminOnly,
  settingController.updateOrderSettings
);

/**
 * @swagger
 * /api/super-admin/settings/payment:
 *   put:
 *     summary: Update payment settings
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codEnabled:
 *                 type: boolean
 *               onlinePaymentEnabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Payment settings updated
 */
router.put(
  "/payment",
  adminAuth,
  superAdminOnly,
  settingController.updatePaymentSettings
);

/**
 * @swagger
 * /api/super-admin/settings/security:
 *   put:
 *     summary: Update security settings
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminLoginAttempts:
 *                 type: number
 *                 example: 5
 *               blockDurationMinutes:
 *                 type: number
 *                 example: 30
 *     responses:
 *       200:
 *         description: Security settings updated
 */
router.put(
  "/security",
  adminAuth,
  superAdminOnly,
  settingController.updateSecuritySettings
);

/**
 * @swagger
 * /api/super-admin/settings/maintenance:
 *   patch:
 *     summary: Enable or disable maintenance mode
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maintenanceMode:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Maintenance mode updated
 */
router.patch(
  "/maintenance",
  adminAuth,
  superAdminOnly,
  settingController.toggleMaintenanceMode
);

/**
 * @swagger
 * /api/super-admin/settings/profile:
 *   put:
 *     summary: Update super admin profile
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put(
  "/profile",
  adminAuth,
  superAdminOnly,
  settingController.updateProfile
);

/**
 * @swagger
 * /api/super-admin/settings/change-password:
 *   put:
 *     summary: Change super admin password
 *     tags: [SuperAdmin Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.put(
  "/change-password",
  adminAuth,
  superAdminOnly,
  settingController.changePassword
);

module.exports = router;
