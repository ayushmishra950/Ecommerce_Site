const express = require("express");
const router = express.Router();

const reportController = require("../controllers/report.controller");
const adminAuth = require("../middlewares/adminAuth");

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Dashboard reports & analytics (Admin / Super Admin)
 */

/**
 * @swagger
 * /api/reports/dashboard:
 *   get:
 *     summary: Dashboard summary report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary data
 */
router.get(
  "/dashboard",
  adminAuth,
  reportController.dashboardSummary
);

/**
 * @swagger
 * /api/reports/users:
 *   get:
 *     summary: Users report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2024-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2024-12-31
 *     responses:
 *       200:
 *         description: Users report
 */
router.get(
  "/users",
  adminAuth,
  reportController.usersReport
);

/**
 * @swagger
 * /api/reports/orders:
 *   get:
 *     summary: Orders report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: delivered
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders report
 */
router.get(
  "/orders",
  adminAuth,
  reportController.ordersReport
);

/**
 * @swagger
 * /api/reports/revenue:
 *   get:
 *     summary: Revenue report (date-wise)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Revenue report
 */
router.get(
  "/revenue",
  adminAuth,
  reportController.revenueReport
);

/**
 * @swagger
 * /api/reports/products:
 *   get:
 *     summary: Product sales report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product sales report
 */
router.get(
  "/products",
  adminAuth,
  reportController.productReport
);

/**
 * @swagger
 * /api/reports/top-customers:
 *   get:
 *     summary: Top customers report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top customers report
 */
router.get(
  "/top-customers",
  adminAuth,
  reportController.topCustomersReport
);

module.exports = router;
