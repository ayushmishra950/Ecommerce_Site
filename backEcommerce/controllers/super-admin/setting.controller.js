const Setting = require("../models/setting.model");
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

/* =========================
   GET SETTINGS
========================= */
exports.getSettings = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE SITE SETTINGS
========================= */
exports.updateSiteSettings = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { siteName, siteEmail, siteLogo } = req.body;

    const settings = await Setting.findOneAndUpdate(
      {},
      {
        siteName,
        siteEmail,
        siteLogo,
        updatedBy: req.admin._id,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Site settings updated",
      settings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE ORDER SETTINGS
========================= */
exports.updateOrderSettings = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const settings = await Setting.findOneAndUpdate(
      {},
      {
        orderSettings: req.body,
        updatedBy: req.admin._id,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Order settings updated",
      orderSettings: settings.orderSettings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE PAYMENT SETTINGS
========================= */
exports.updatePaymentSettings = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const settings = await Setting.findOneAndUpdate(
      {},
      {
        paymentSettings: req.body,
        updatedBy: req.admin._id,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Payment settings updated",
      paymentSettings: settings.paymentSettings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE SECURITY SETTINGS
========================= */
exports.updateSecuritySettings = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const settings = await Setting.findOneAndUpdate(
      {},
      {
        securitySettings: req.body,
        updatedBy: req.admin._id,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Security settings updated",
      securitySettings: settings.securitySettings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   MAINTENANCE MODE
========================= */
exports.toggleMaintenanceMode = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const settings = await Setting.findOneAndUpdate(
      {},
      {
        maintenanceMode: req.body.maintenanceMode,
        updatedBy: req.admin._id,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Maintenance mode updated",
      maintenanceMode: settings.maintenanceMode,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE SUPER ADMIN PROFILE
========================= */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name, email },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   CHANGE SUPER ADMIN PASSWORD
========================= */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id);
    const isMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
