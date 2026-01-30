const Product = require("../models/product.model");
const Admin = require("../models/admin.model");

/* =========================
   ADMIN ROLE CHECK
========================= */
const checkAdminRole = async (adminId, onlySuperAdmin = false) => {
  const admin = await Admin.findById(adminId);

  if (!admin) throw new Error("Admin not found");
  if (onlySuperAdmin && admin.role !== "superAdmin") {
    throw new Error("Only super admin allowed");
  }
  if (!["admin", "superAdmin"].includes(admin.role)) {
    throw new Error("Access denied");
  }

  return admin;
};

/* =========================
   ADMIN / SUPERADMIN FUNCTIONS
========================= */
exports.createProduct = async (adminId, productData) => {
  await checkAdminRole(adminId);

  const product = await Product.create({
    ...productData,
    userId: adminId,
  });

  return product;
};

exports.getProductsAdmin = async (admin) => {
  let filter = {};
  if (admin.role === "admin") filter.userId = admin._id;

  const products = await Product.find(filter).populate(
    "userId",
    "name email role"
  );

  return products;
};

exports.getProductByIdAdmin = async (admin, productId) => {
  const product = await Product.findById(productId).populate(
    "userId",
    "name email role"
  );

  if (!product) throw new Error("Product not found");

  if (admin.role === "admin" && product.userId._id.toString() !== admin._id.toString()) {
    throw new Error("Access denied");
  }

  return product;
};

exports.updateProduct = async (admin, productId, updateData) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (admin.role === "admin" && product.userId.toString() !== admin._id.toString()) {
    throw new Error("You can update only your own products");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true }
  );

  return updatedProduct;
};

exports.deleteProduct = async (admin, productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (admin.role === "admin" && product.userId.toString() !== admin._id.toString()) {
    throw new Error("You can delete only your own products");
  }

  await product.deleteOne();
  return true;
};

exports.toggleProductStatus = async (admin, productId) => {
  if (admin.role !== "superAdmin") throw new Error("Only super admin can change product status");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  product.isActive = !product.isActive;
  await product.save();

  return product.isActive;
};

/* =========================
   USER FUNCTIONS
========================= */
exports.getAllProductsUser = async () => {
  return await Product.find({ isActive: true });
};

exports.getProductByIdUser = async (productId) => {
  const product = await Product.findById(productId);
  if (!product || !product.isActive) throw new Error("Product not found");
  return product;
};

exports.searchProducts = async (query) => {
  const { keyword, minPrice, maxPrice } = query;
  let filter = { isActive: true };

  if (keyword) filter.name = { $regex: keyword, $options: "i" };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }

  const products = await Product.find(filter);
  return products;
};

exports.getProductsByCategory = async (category) => {
  const products = await Product.find({ category, isActive: true });
  return products;
};
