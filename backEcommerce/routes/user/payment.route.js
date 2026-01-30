const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/user/payment.controller");
// const auth = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: User Payment APIs
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create payment for an order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentMethod
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 65b2c3e9a12f4c001234abcd
 *               paymentMethod:
 *                 type: string
 *                 enum: [COD, CARD, UPI, NETBANKING]
 *                 example: UPI
 *               paymentGateway:
 *                 type: string
 *                 enum: [razorpay, stripe, paypal, none]
 *                 example: razorpay
 *               transactionId:
 *                 type: string
 *                 example: pay_Nx123456789
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Payment already exists
 *       404:
 *         description: Order not found
 */
router.post("/",  paymentController.createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get logged-in user's payment history
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payments fetched successfully
 */
router.get("/",  paymentController.getMyPayments);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get single payment details
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details fetched
 *       404:
 *         description: Payment not found
 */
router.get("/:id",  paymentController.getPaymentById);

module.exports = router;
