const Admin = require("../../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Shop = require("../../models/shop.model")

/* =========================
   CREATE ADMIN (SuperAdmin)
========================= */
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role, shopId, permissions, userId } = req.body;

    const superAdmin = await Admin.findOne({_id:userId});
    if(!superAdmin) return res.status(404).json({message: "You are not authorized.", success: false})

    // sirf superAdmin ko allow
    if (superAdmin?.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied:- You do not have permission to perform this action.", success: false });
    }

    const shop = await Shop.findOne({_id:shopId});
    if(!shop) return res.status(404).json({message:"Shop Not Found.", success: false});
    if(shop.admins.length !== 0) return res.status(404).json({message:"This shop already has an admin assigned.", success: false}) 

    const exists = await Admin.findOne({ email, shopId });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists", success: false});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
      permissions,
      createdBy: superAdmin?._id,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  }catch (err) {

  // 🔑 Duplicate key error (email already exists)
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "An admin with this email already exists." });
  }
  // 🧯 Fallback error
  return res.status(500).json({ success: false, message: "Internal server error"});
}
};

/* =========================
   ADMIN LOGIN
========================= */
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Account is disabled" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      admin.loginAttempts += 1;
      await admin.save();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    admin.lastLogin = new Date();
    admin.loginAttempts = 0;
    await admin.save();

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ALL ADMINS (SuperAdmin)
========================= */
exports.getAllAdmins = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET SINGLE ADMIN
========================= */
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE ADMIN (SuperAdmin)
========================= */
exports.updateAdmin = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Admin updated successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE ADMIN (SuperAdmin)
========================= */
exports.deleteAdmin = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   ENABLE / DISABLE ADMIN
========================= */
exports.toggleAdminStatus = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.isActive = !admin.isActive;
    await admin.save();

    res.json({
      message: "Admin status updated",
      isActive: admin.isActive,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
