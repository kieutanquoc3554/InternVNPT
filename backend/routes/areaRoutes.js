const express = require("express");
const router = express.Router();
const controller = require("../controllers/areaController");

router.post("/addarea", controller.addArea);
router.get("/allarea", controller.getAllArea);

module.exports = router;
