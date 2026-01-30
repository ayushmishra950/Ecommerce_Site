const Product = require("../../models/product.model");

/**
 * ============================
 * CREATE PRODUCT (Admin & SuperAdmin)
 * ============================
 */
const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      userId: req.user._id, // jis admin ne product add kiya
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};

/**
 * ============================
 * GET PRODUCTS
 * Admin → apne products
 * SuperAdmin → sabke products
 * ============================
 */
const getProducts = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "admin") {
      filter.userId = req.user._id;
    }

    const products = await Product.find(filter).populate(
      "userId",
      "name email role"
    );

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

/**
 * ============================
 * GET SINGLE PRODUCT
 * Admin → only own product
 * SuperAdmin → any product
 * ============================
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "userId",
      "name email role"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Admin ownership check
    if (
      req.user.role === "admin" &&
      product.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

/**
 * ============================
 * UPDATE PRODUCT
 * Admin → only own product
 * SuperAdmin → any product
 * ============================
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Ownership check
    if (
      req.user.role === "admin" &&
      product.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own products",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product update failed",
      error: error.message,
    });
  }
};

/**
 * ============================
 * DELETE PRODUCT
 * Admin → only own product
 * SuperAdmin → any product
 * ============================
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Ownership check
    if (
      req.user.role === "admin" &&
      product.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own products",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product deletion failed",
      error: error.message,
    });
  }
};

/**
 * ============================
 * TOGGLE PRODUCT STATUS (SuperAdmin only)
 * ============================
 */
const toggleProductStatus = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Only super admin can change product status",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product status updated",
      isActive: product.isActive,
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
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
};
