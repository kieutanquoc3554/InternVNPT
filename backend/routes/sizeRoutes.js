const express = require("express");
const router = express.Router();

const controller = require("../controllers/sizeController");

router.post("/addsize", controller.addSize);
router.get("/allsize", controller.getAllSizes);
router.post("/size/find", controller.findSizeByName);

module.exports = router;
