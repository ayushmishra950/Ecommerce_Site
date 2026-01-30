const Coupon = require("../../models/coupon.model");
const Admin = require("../../models/admin.model");

/**
 * ============================
 * COMMON ADMIN ROLE CHECK
 * ============================
 */
const checkAdminRole = async (userId, onlySuperAdmin = false) => {
  const admin = await Admin.findById(userId);

  if (!admin) {
    return { allowed: false, message: "Admin not found" };
  }

  if (onlySuperAdmin && admin.role !== "superadmin") {
    return { allowed: false, message: "Only super admin allowed" };
  }

  if (!["admin", "superadmin"].includes(admin.role)) {
    return { allowed: false, message: "Access denied" };
  }

  return { allowed: true, admin };
};

/**
 * ============================
 * CREATE COUPON
 * Admin & SuperAdmin
 * ============================
 */
const createCoupon = async (req, res) => {
  try {
    const { userId, code } = req.body;

    const roleCheck = await checkAdminRole(userId);
    if (!roleCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: roleCheck.message,
      });
    }

    const exists = await Coupon.findOne({ code });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Coupon already exists",
      });
    }

    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Coupon creation failed",
      error: error.message,
    });
  }
};

/**
 * ============================
 * GET ALL COUPONS
 * Admin & SuperAdmin
 * ============================
 */
const getAllCoupons = async (req, res) => {
  try {
    const { userId } = req.query;

    const roleCheck = await checkAdminRole(userId);
    if (!roleCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: roleCheck.message,
      });
    }

    const coupons = await Coupon.find();

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch coupons",
      error: error.message,
    });
  }
};

/**
 * ============================
 * GET SINGLE COUPON
 * Admin & SuperAdmin
 * ============================
 */
const getCouponById = async (req, res) => {
  try {
    const { userId } = req.query;

    const roleCheck = await checkAdminRole(userId);
    if (!roleCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: roleCheck.message,
      });
    }

    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch coupon",
      error: error.message,
    });
  }
};

/**
 * ============================
 * UPDATE COUPON
 * Admin & SuperAdmin
 * ============================
 */
const updateCoupon = async (req, res) => {
  try {
    const { userId } = req.body;

    const roleCheck = await checkAdminRole(userId);
    if (!roleCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: roleCheck.message,
      });
    }

    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Coupon update failed",
      error: error.message,
    });
  }
};

/**
 * ============================
 * DELETE COUPON
 * SuperAdmin only
 * ============================
 */
const deleteCoupon = async (req, res) => {
  try {
    const { userId } = req.body;

    const roleCheck = await checkAdminRole(userId, true);
    if (!roleCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: roleCheck.message,
      });
    }

    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    await coupon.deleteOne();

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Coupon deletion failed",
      error: error.message,
    });
  }
};

/**
 * ============================
 * TOGGLE COUPON STATUS
 * Admin & SuperAdmin
 * ============================
 */
const toggleCouponStatus = async (req, res) => {
  try {
    const { userId } = req.body;

    const roleCheck = await checkAdminRole(userId);
    if (!roleCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: roleCheck.message,
      });
    }

    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    coupon.isActive = !coupon.isActive;
    await coupon.save();

    res.status(200).json({
      success: true,
      message: "Coupon status updated",
      isActive: coupon.isActive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status update failed",
      error: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
};
