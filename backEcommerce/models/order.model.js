// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     // 👤 Customer (normal user)
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     // 📦 Ordered products
//     orderItems: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],

//     // 🚚 Shipping info
//     shippingAddress: {
//       address: String,
//       city: String,
//       state: String,
//       postalCode: String,
//       country: String,
//     },

//     // 💰 Payment
//     paymentMethod: {
//       type: String,
//       enum: ["COD", "CARD", "UPI"],
//       default: "COD",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },

//     // 📊 Order status
//     orderStatus: {
//       type: String,
//       enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
//       default: "placed",
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);


















const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // 🏬 Shop (VERY IMPORTANT)
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },

    // 👤 Customer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📦 Products snapshot
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,        // snapshot
        price: Number,      // snapshot
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],

    // 🚚 Shipping info
    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    // 💰 Payment
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD", "UPI"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentDetails: {
      transactionId: String,
      gateway: String,
      paidAt: Date,
    },

    // 📊 Order lifecycle
    orderStatus: {
      type: String,
      enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },

    cancelledAt: Date,
    cancelReason: String,

    // 💵 Price breakup
    subtotal: Number,
    tax: Number,
    shippingCharge: Number,
    totalAmount: {
      type: Number,
      required: true,
    },

    // 👨‍💼 Admin actions
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

