const Payment = require("../../models/payment.model");
const Order = require("../../models/order.model");

/**
 * ✅ Create Payment (After Order)
 */
const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, paymentGateway, transactionId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Prevent duplicate payment
    const existingPayment = await Payment.findOne({ order: orderId });
    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already exists for this order",
      });
    }

    const payment = await Payment.create({
      user: req.user._id,
      order: orderId,
      paymentMethod,
      paymentGateway: paymentGateway || "none",
      transactionId: transactionId || null,
      amount: order.totalAmount,
      paymentStatus: paymentMethod === "COD" ? "pending" : "success",
    });

    // Update order payment status
    order.paymentStatus =
      payment.paymentStatus === "success" ? "paid" : "pending";
    await order.save();

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Get User Payments
 */
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("order")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Get Single Payment Details
 */
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("order");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getMyPayments,
  getPaymentById,
};
