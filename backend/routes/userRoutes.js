const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.get("/", controller.home);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/user", controller.getAllUsers);
router.post("/find", controller.findUserByUsername);
router.delete("/user/:id", controller.deleteUser);
router.put("/user/:id", controller.editUser);
router.get("/user/:id", controller.getUser);
router.post("/login-admin", controller.loginAdmin);

module.exports = router;
