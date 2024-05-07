const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

module.exports = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_ADMIN_TOKEN_KEY);
    const admin = await adminModel.findById(verifiedToken._id);
    if (!admin) return res.status(400).send("Admin does not exist");
    req.admin = verifiedToken;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
