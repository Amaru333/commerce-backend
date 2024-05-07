const express = require("express");
const router = express.Router();

const controller = require("../controllers/AdminController");
const verifyAdminToken = require("../middlewares/verifyAdminToken");

router.post("/register", controller.create);
router.post("/login", controller.login);

router.get("/auto-login", verifyAdminToken, controller.autoLogin);

module.exports = router;
