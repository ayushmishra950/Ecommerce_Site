const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["superadmin", "admin", "manager"],
      default: "admin",
    },

    permissions: {
      products: { type: Boolean, default: false },
      orders: { type: Boolean, default: false },
      users: { type: Boolean, default: false },
      categories: { type: Boolean, default: false },
      coupons: { type: Boolean, default: false },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    blockedUntil: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required:true
    },
    shopId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Shop",
      required:true
    },
    refreshToken :{
      type:String, default:null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
