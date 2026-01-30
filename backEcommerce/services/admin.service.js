const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   CREATE ADMIN / MANAGER
========================= */
exports.createAdmin = async (data, createdBy) => {
  const { name, email, password, role, permissions } = data;

  const exists = await Admin.findOne({ email });
  if (exists) {
    throw new Error("Admin already exists");
  }

  if (role === "superAdmin") {
    throw new Error("Cannot create superAdmin");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    role: role || "admin",
    permissions,
    createdBy,
  });

  return admin;
};

/* =========================
   ADMIN LOGIN
========================= */
exports.loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Admin not found");
  }

  if (!admin.isActive) {
    throw new Error("Account is disabled");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    admin.loginAttempts += 1;
    await admin.save();
    throw new Error("Invalid credentials");
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

  return { admin, token };
};

/* =========================
   GET ALL ADMINS
========================= */
exports.getAllAdmins = async () => {
  return await Admin.find().select("-password");
};

/* =========================
   GET ADMIN BY ID
========================= */
exports.getAdminById = async (id) => {
  const admin = await Admin.findById(id).select("-password");
  if (!admin) {
    throw new Error("Admin not found");
  }
  return admin;
};

/* =========================
   UPDATE ADMIN
========================= */
exports.updateAdmin = async (id, data) => {
  if (data.role === "superAdmin") {
    throw new Error("Cannot assign superAdmin role");
  }

  const admin = await Admin.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password");

  if (!admin) {
    throw new Error("Admin not found");
  }

  return admin;
};

/* =========================
   DELETE ADMIN
========================= */
exports.deleteAdmin = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error("Admin not found");
  }

  if (admin.role === "superAdmin") {
    throw new Error("SuperAdmin cannot be deleted");
  }

  await admin.deleteOne();
  return true;
};

/* =========================
   ENABLE / DISABLE ADMIN
========================= */
exports.toggleAdminStatus = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error("Admin not found");
  }

  admin.isActive = !admin.isActive;
  await admin.save();

  return admin.isActive;
};

/* =========================
   UPDATE ADMIN PERMISSIONS
========================= */
exports.updatePermissions = async (id, permissions) => {
  const admin = await Admin.findByIdAndUpdate(
    id,
    { permissions },
    { new: true }
  ).select("-password");

  if (!admin) {
    throw new Error("Admin not found");
  }

  return admin.permissions;
};

/* =========================
   CHANGE ADMIN PASSWORD
========================= */
exports.changePassword = async (adminId, oldPassword, newPassword) => {
  const admin = await Admin.findById(adminId);

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    throw new Error("Old password incorrect");
  }

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  return true;
};
