const express = require("express");
const controller = require("../controllers/promotionController");
const router = express.Router();

router.post("/addpromotebyproduct", controller.addPromotionByProduct);
router.get("/get/all", controller.allPromotions);
router.delete("/delete/:id", controller.removePromote);
router.put("/edit/updatepromote/:id", controller.editPromote);
router.get("/getpromote/:id", controller.getPromoteById);
module.exports = router;
