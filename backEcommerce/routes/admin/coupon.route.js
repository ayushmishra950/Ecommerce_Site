const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
} = require("../../controllers/admin/coupon.controller");

/**
 * @swagger
 * tags:
 *   name: Admin Coupons
 *   description: Coupon management (Admin & SuperAdmin)
 */

/**
 * @swagger
 * /admin/coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Admin Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - code
 *               - discountType
 *               - discountValue
 *               - expiryDate
 *             properties:
 *               userId:
 *                 type: string
 *               code:
 *                 type: string
 *               discountType:
 *                 type: string
 *                 enum: [percentage, flat]
 *               discountValue:
 *                 type: number
 *               minOrderAmount:
 *                 type: number
 *               maxDiscountAmount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               usageLimit:
 *                 type: number
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       400:
 *         description: Coupon already exists
 *       403:
 *         description: Access denied
 */
router.post("/", createCoupon);

/**
 * @swagger
 * /admin/coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Admin Coupons]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of coupons
 *       403:
 *         description: Access denied
 */
router.get("/", getAllCoupons);

/**
 * @swagger
 * /admin/coupons/{id}:
 *   get:
 *     summary: Get coupon by ID
 *     tags: [Admin Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon details
 *       404:
 *         description: Coupon not found
 */
router.get("/:id", getCouponById);

/**
 * @swagger
 * /admin/coupons/{id}:
 *   put:
 *     summary: Update coupon
 *     tags: [Admin Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *               code:
 *                 type: string
 *               discountType:
 *                 type: string
 *                 enum: [percentage, flat]
 *               discountValue:
 *                 type: number
 *               minOrderAmount:
 *                 type: number
 *               maxDiscountAmount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               usageLimit:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       403:
 *         description: Access denied
 */
router.put("/:id", updateCoupon);

/**
 * @swagger
 * /admin/coupons/{id}:
 *   delete:
 *     summary: Delete coupon (SuperAdmin only)
 *     tags: [Admin Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       403:
 *         description: Only super admin allowed
 */
router.delete("/:id", deleteCoupon);

/**
 * @swagger
 * /admin/coupons/{id}/status:
 *   patch:
 *     summary: Toggle coupon active status
 *     tags: [Admin Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon status updated
 *       403:
 *         description: Access denied
 */
router.patch("/:id/status", toggleCouponStatus);

module.exports = router;
