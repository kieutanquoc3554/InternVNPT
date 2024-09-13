const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");

router.post("/booking", controller.booking);
router.get("/allbooking", controller.getInfoBook);

module.exports = router;
