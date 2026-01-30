const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // 🔐 Admin / Seller reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // 🏷️ Product basic info
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    // 💰 Pricing
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    // 📦 Stock
    stock: {
      type: Number,
      required: true,
      default: 1,
    },

    // 🗂️ Category
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // 🖼️ Images
    images: [
      {
        type: String, // Cloudinary / S3 / URL
      },
    ],

    // ⭐ Ratings
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    // 👀 Visibility
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);
