const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // 👤 User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📦 Order reference
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    // 💳 Payment details
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD", "UPI", "NETBANKING"],
      required: true,
    },

    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe", "paypal", "none"],
      default: "none",
    },

    transactionId: {
      type: String,
      default: null,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },

    gatewayResponse: {
      type: Object, // raw response store (optional)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
