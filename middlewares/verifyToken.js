const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    const user = await userModel.findById(verifiedToken._id);
    if (!user) return res.status(400).send("User does not exist");
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
