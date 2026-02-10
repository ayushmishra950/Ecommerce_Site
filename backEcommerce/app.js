const express = require("express");
const setupSwagger = require("./swagger/swagger");
const cors = require("cors");
const {connectDB} = require("./config/db");

// user k liye
const userAuthRoutes = require("./routes/user/auth.route");
const profileRoutes = require("./routes/user/profile.route");
const cartRoutes = require("./routes/user/cart.route");
const orderRoutes = require("./routes/user/order.route");
const paymentRoutes = require("./routes/user/payment.route");
const productRoutes = require("./routes/user/product.route");


// Admin k liye
const adminAuthRoutes = require("./routes/admin/auth.route");
 const adminProductRoutes = require("./routes/admin/product.route");
 const adminOrderRoutes = require("./routes/admin/order.route");
 const adminCouponRoutes = require("./routes/admin/coupon.route");
 const adminCategoryRoutes = require("./routes/admin/category.route");
 const adminUserRoutes = require("./routes/admin/user.route");


//  Super admin k liye
 const superAdminShopRoute = require("./routes/super-admin/shop-route");


const app = express();
connectDB();

// Body parser
app.use(express.json());
app.use(cors({origin :"http://localhost:8080", credentials : true}))
setupSwagger(app);

// User Routes
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/user/profile", profileRoutes);
app.use("/api/user/cart", cartRoutes);
app.use("/api/user/order", orderRoutes);
app.use("/api/user/payment", paymentRoutes);
app.use("/api/user/product", productRoutes);
//  Admin Routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/product", adminProductRoutes);
app.use("/api/admin/order", adminOrderRoutes);
app.use("/api/admin/coupon", adminCouponRoutes);
app.use("/api/admin/category", adminCategoryRoutes);
app.use("/api/admin/user", adminUserRoutes);
// Super Admin Routes
app.use("/api/superadmin/shop", superAdminShopRoute);



// Default route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
