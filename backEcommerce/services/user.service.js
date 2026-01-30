const User = require("../models/user.model");
const Admin = require("../models/admin.model");

/* ============================
   COMMON ADMIN ROLE CHECK
============================ */
const checkAdminRole = async (userId, onlySuperAdmin = false) => {
  const admin = await Admin.findById(userId);

  if (!admin) {
    return { allowed: false, message: "Admin not found" };
  }

  if (onlySuperAdmin && admin.role !== "superadmin") {
    return { allowed: false, message: "Only super admin allowed" };
  }

  if (!onlySuperAdmin && !["admin", "superadmin"].includes(admin.role)) {
    return { allowed: false, message: "Access denied" };
  }

  return { allowed: true, admin };
};

/* ============================
   USER SERVICE FUNCTIONS
============================ */

/**
 * Get all users (Admin & SuperAdmin)
 */
exports.getAllUsers = async (requestingUserId) => {
  const roleCheck = await checkAdminRole(requestingUserId);
  if (!roleCheck.allowed) throw new Error(roleCheck.message);

  const users = await User.find().select("-password");
  return users;
};

/**
 * Get single user by ID (Admin & SuperAdmin)
 */
exports.getUserById = async (requestingUserId, userIdToFetch) => {
  const roleCheck = await checkAdminRole(requestingUserId);
  if (!roleCheck.allowed) throw new Error(roleCheck.message);

  const user = await User.findById(userIdToFetch).select("-password");
  if (!user) throw new Error("User not found");

  return user;
};

/**
 * Update user (Admin & SuperAdmin)
 */
exports.updateUser = async (requestingUserId, userIdToUpdate, updateData) => {
  const roleCheck = await checkAdminRole(requestingUserId);
  if (!roleCheck.allowed) throw new Error(roleCheck.message);

  // Admin cannot change user role
  if (roleCheck.admin.role === "admin" && updateData.role) {
    throw new Error("Admin cannot change user role");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userIdToUpdate,
    updateData,
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) throw new Error("User not found");

  return updatedUser;
};

/**
 * Delete user (SuperAdmin only)
 */
exports.deleteUser = async (requestingUserId, userIdToDelete) => {
  const roleCheck = await checkAdminRole(requestingUserId, true);
  if (!roleCheck.allowed) throw new Error(roleCheck.message);

  const user = await User.findById(userIdToDelete);
  if (!user) throw new Error("User not found");

  await user.deleteOne();
  return true;
};

/**
 * Toggle user status (SuperAdmin only)
 */
exports.toggleUserStatus = async (requestingUserId, userIdToToggle) => {
  const roleCheck = await checkAdminRole(requestingUserId, true);
  if (!roleCheck.allowed) throw new Error(roleCheck.message);

  const user = await User.findById(userIdToToggle);
  if (!user) throw new Error("User not found");

  user.isActive = !user.isActive;
  await user.save();

  return user.isActive;
};

/* ============================
   EXTRA HELPER FUNCTIONS
   (Optional)
============================ */

/**
 * Search users by name or email (Admin & SuperAdmin)
 */
exports.searchUsers = async (requestingUserId, keyword) => {
  const roleCheck = await checkAdminRole(requestingUserId);
  if (!roleCheck.allowed) throw new Error(roleCheck.message);

  const filter = {};
  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ];
  }

  const users = await User.find(filter).select("-password");
  return users;
};
