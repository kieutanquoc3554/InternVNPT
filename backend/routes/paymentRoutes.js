const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");
const controllerDetail = require("../controllers/paymentDetail");

router.post("/addpayment", controller.addPaymentMethod);
router.get("/allpayment", controller.allPaymentMethod);
router.post("/payment/paymentdetail", controllerDetail.addPaymentDetail);
router.post("/find/pay", controller.findPaymentByName);
router.post("/momo", controller.payWithMomo);

module.exports = router;
