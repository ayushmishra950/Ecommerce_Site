const User = require("../models/user.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

/* =========================
   DASHBOARD SUMMARY
========================= */
exports.dashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const revenue = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: revenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   USERS REPORT
========================= */
exports.usersReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const users = await User.find(filter).select(
      "name email createdAt isActive"
    );

    res.json({
      totalUsers: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   ORDERS REPORT
========================= */
exports.ordersReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    let filter = {};
    if (status) filter.status = status;

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      totalOrders: orders.length,
      totalRevenue,
      orders,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   REVENUE REPORT (DATE WISE)
========================= */
exports.revenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let match = { status: "delivered" };

    if (startDate && endDate) {
      match.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const revenue = await Order.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   PRODUCT SALES REPORT
========================= */
exports.productReport = async (req, res) => {
  try {
    const report = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"],
            },
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          name: "$product.name",
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { totalQuantity: -1 } },
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   TOP CUSTOMERS REPORT
========================= */
exports.topCustomersReport = async (req, res) => {
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          totalOrders: 1,
          totalSpent: 1,
        },
      },
    ]);

    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
