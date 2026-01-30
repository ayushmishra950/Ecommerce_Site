const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Admin = require("../models/admin.model");

/* =========================
   ADMIN ROLE CHECK
========================= */
const checkAdminRole = async (adminId, onlySuperAdmin = false) => {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new Error("Admin not found");
  }

  if (onlySuperAdmin && admin.role !== "superAdmin") {
    throw new Error("Only super admin allowed");
  }

  if (!["admin", "superAdmin"].includes(admin.role)) {
    throw new Error("Access denied");
  }

  return admin;
};

/* =========================
   USER SIDE FUNCTIONS
========================= */
exports.placeOrder = async (userId, shippingAddress, paymentMethod) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.price,
  }));

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalAmount: cart.totalPrice,
    paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
  });

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return order;
};

exports.getMyOrders = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate("orderItems.product")
    .sort({ createdAt: -1 });
  return orders;
};

exports.getOrderByUser = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId }).populate(
    "orderItems.product"
  );
  if (!order) throw new Error("Order not found");
  return order;
};

exports.cancelOrder = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new Error("Order not found");
  if (["shipped", "delivered"].includes(order.orderStatus)) {
    throw new Error("Order cannot be cancelled");
  }
  order.orderStatus = "cancelled";
  await order.save();
  return order;
};

/* =========================
   ADMIN / SUPERADMIN FUNCTIONS
========================= */
exports.getAllOrders = async (adminId) => {
  await checkAdminRole(adminId);
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.product", "name price");
  return orders;
};

exports.getOrderByAdmin = async (adminId, orderId) => {
  await checkAdminRole(adminId);
  const order = await Order.findById(orderId)
    .populate("user", "name email")
    .populate("orderItems.product", "name price");
  if (!order) throw new Error("Order not found");
  return order;
};

exports.updateOrderStatus = async (adminId, orderId, orderStatus, paymentStatus) => {
  await checkAdminRole(adminId);
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();
  return order;
};

exports.deleteOrder = async (adminId, orderId) => {
  await checkAdminRole(adminId, true); // only superAdmin
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  await order.deleteOne();
  return true;
};
