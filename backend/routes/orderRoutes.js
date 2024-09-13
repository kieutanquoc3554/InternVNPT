const express = require("express");
const controller = require("../controllers/orderController");
const router = express.Router();

router.post("/addorder", controller.addOrder);
router.get("/allorder", controller.allOrder);
router.post("/type/addtype", controller.addType);
router.get("/type/getType", controller.allType);
router.post("/type/findType", controller.findTypeByName);
router.get("/:orderId", controller.findOrderByID);
router.get("/analysis/analytic-day", controller.AnalyticInDay);
router.post("/analysic/analytic/week", controller.AnalyticByWeek);
router.get("/analysic/month/analytic-month", controller.AnalyticByMonth);
router.post("/item/analytic-items-week", controller.AnalyticItemByWeek);
router.post("/item/month/analytic-items-month", controller.AnalyticItemByMonth);

module.exports = router;
