const express = require("express");
const router = express.Router();

const sizeRoutes = require("../routes/sizeRoutes");
const orderRoutes = require("../routes/orderRoutes");
const productRoutes = require("../routes/productRoutes");
const userRoutes = require("../routes/userRoutes");
const areaRoutes = require("../routes/areaRoutes");
const tableRoutes = require("../routes/tableRoutes");
const customerRoutes = require("../routes/customerRoutes");
const bookingRoutes = require("../routes/bookingDetailRoutes");
const paymentRoutes = require("../routes/paymentRoutes");
const promoteRoutes = require("../routes/promotionRoutes");

router.use("/", userRoutes);
router.use("/sizes", sizeRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/areas", areaRoutes);
router.use("/tables", tableRoutes);
router.use("/customer", customerRoutes);
router.use("/booking", bookingRoutes);
router.use("/pay", paymentRoutes);
router.use("/promotes", promoteRoutes);

module.exports = router;
