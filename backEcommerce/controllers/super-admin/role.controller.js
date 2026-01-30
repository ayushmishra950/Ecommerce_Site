const Admin = require("../models/admin.model");

/* =========================
   CREATE ROLE (Admin/Manager)
========================= */
exports.createRole = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, password, role, permissions } = req.body;

    if (!role || role === "superAdmin") {
      return res.status(400).json({ message: "Invalid role" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Role user already exists" });
    }

    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role,
      permissions,
      createdBy: req.admin._id,
    });

    res.status(201).json({
      message: "Role created successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ALL ROLES
========================= */
exports.getAllRoles = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const roles = await Admin.find({
      role: { $ne: "superAdmin" },
    }).select("name email role permissions isActive createdAt");

    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ROLE BY ID
========================= */
exports.getRoleById = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const role = await Admin.findById(req.params.id).select("-password");
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE ROLE & PERMISSIONS
========================= */
exports.updateRole = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { role, permissions, isActive } = req.body;

    if (role === "superAdmin") {
      return res.status(400).json({ message: "Cannot assign superAdmin role" });
    }

    const updatedRole = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        role,
        permissions,
        isActive,
      },
      { new: true }
    ).select("-password");

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE ROLE
========================= */
exports.deleteRole = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const role = await Admin.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (role.role === "superAdmin") {
      return res
        .status(400)
        .json({ message: "Super Admin cannot be deleted" });
    }

    await role.deleteOne();

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE ONLY PERMISSIONS
========================= */
exports.updatePermissions = async (req, res) => {
  try {
    if (req.admin.role !== "superAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { permissions } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Permissions updated successfully",
      permissions: admin.permissions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
