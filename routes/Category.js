const express = require("express");
const router = express.Router();

const controller = require("../controllers/CategoryController");
const verifyAdminToken = require("../middlewares/verifyAdminToken");
const upload = require("../utils/multerConfig");

router.post("/", verifyAdminToken, upload.single("image"), controller.create);
router.get("/", verifyAdminToken, controller.get);

module.exports = router;
