const express = require("express");
const router = express.Router();
const controller = require("../controllers/customerController");

router.post("/find", controller.searchCustomerByPhone);
router.get("/status/member", controller.returnMemberState);

module.exports = router;
