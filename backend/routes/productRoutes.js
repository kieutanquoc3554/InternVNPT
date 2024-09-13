const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.post("/addproduct", controller.addProduct);
router.get("/allproduct", controller.getAllProducts);
router.post("/product/find", controller.findProductByName);
router.post("/key/updatekey", controller.updateKeyword);
router.get("/category/get", controller.returnCategory);

module.exports = router;
