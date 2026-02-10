const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    description: String,

    logo: String,
    banner: String,

    // 🔐 SYSTEM LEVEL
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true, // platform admin OR initial creator
    },

    // 🧑‍💼 BUSINESS OWNERS
    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
      },
    ],

    // 🧑‍🔧 SHOP ADMINS / STAFF
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],

    // Contact Info
    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: String,

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    // Business Settings
    currency: {
      type: String,
      default: "INR",
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);


