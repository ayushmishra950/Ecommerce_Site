const mongoose = require("mongoose");

const shopBlockedUserSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },

    blockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // shop admin
    },

    isBlocked: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ek user ek shop me sirf ek hi baar block ho
shopBlockedUserSchema.index({ shop: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("ShopBlockedUser", shopBlockedUserSchema);