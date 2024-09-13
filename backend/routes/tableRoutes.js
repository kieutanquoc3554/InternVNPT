const express = require("express");
const router = express.Router();
const controller = require("../controllers/tableController");

router.post("/createtable", controller.createTable);
router.get("/alltable", controller.getAllTable);
router.get("/:area", controller.getTableByArea);
router.get("/alltable/card", controller.getTableCard);
router.post("/addcard", controller.addTableCard);
router.patch("/update/:tableId", controller.updateTableStatus);
router.delete("/info/deletebooking/:tableId", controller.deleteInfoBooking);
router.post("/find/getID", controller.getIDTableByAreaAndName);
router.post("/get/infobooking", controller.getInfoBooking);

module.exports = router;
