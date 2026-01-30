const Payment = require("../models/payment.model");
const Order = require("../models/order.model");

/* =========================
   USER FUNCTIONS
========================= */

/**
 * ✅ Create Payment (after order)
 */
exports.createPayment = async (userId, paymentData) => {
  const { orderId, paymentMethod, paymentGateway, transactionId } = paymentData;

  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new Error("Order not found");

  const existingPayment = await Payment.findOne({ order: orderId });
  if (existingPayment) throw new Error("Payment already exists for this order");

  const payment = await Payment.create({
    user: userId,
    order: orderId,
    paymentMethod,
    paymentGateway: paymentGateway || "none",
    transactionId: transactionId || null,
    amount: order.totalAmount,
    paymentStatus: paymentMethod === "COD" ? "pending" : "success",
  });

  order.paymentStatus = payment.paymentStatus === "success" ? "paid" : "pending";
  await order.save();

  return payment;
};

/**
 * ✅ Get all payments of user
 */
exports.getMyPayments = async (userId) => {
  const payments = await Payment.find({ user: userId })
    .populate("order")
    .sort({ createdAt: -1 });
  return payments;
};

/**
 * ✅ Get single payment of user
 */
exports.getPaymentById = async (userId, paymentId) => {
  const payment = await Payment.findOne({ _id: paymentId, user: userId }).populate("order");
  if (!payment) throw new Error("Payment not found");
  return payment;
};

/* =========================
   ADMIN / SUPERADMIN FUNCTIONS
   (Optional, agar payment management karna ho)
========================= */

/**
 * Get all payments (Admin/SuperAdmin)
 */
exports.getAllPayments = async () => {
  const payments = await Payment.find()
    .populate("user", "name email")
    .populate("order")
    .sort({ createdAt: -1 });
  return payments;
};

/**
 * Update payment status (Admin/SuperAdmin)
 */
exports.updatePaymentStatus = async (paymentId, status) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error("Payment not found");

  payment.paymentStatus = status;
  await payment.save();

  // Also update order payment status if needed
  const order = await Order.findById(payment.order);
  if (order) {
    order.paymentStatus = status === "success" ? "paid" : "pending";
    await order.save();
  }

  return payment;
};
