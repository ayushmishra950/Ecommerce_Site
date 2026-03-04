const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    // 🏷️ Coupon code
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // 💰 Discount info
    type: { type: String, enum: ["percentage", "fixed"], default: "percentage" },

    discountValue: {
      type: Number,
      required: true,
    },

    // 🧾 Conditions
    minOrderAmount: {
      type: Number,
      default: 0,
    },

    maxDiscountAmount: {
      type: Number,
      default: null,
    },

    // ⏳ Validity
    expiryDate: {
      type: Date,
      required: true,
    },

    // 🔢 Usage
    usageLimit: {
      type: Number,
      default: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    // 👀 Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
