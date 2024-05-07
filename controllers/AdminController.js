const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");

module.exports = {
  create: async function (req, res) {
    const adminExists = await AdminModel.findOne({ email: req.body.email });
    if (adminExists) {
      return res.status(400).send("Account already exists with this email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newAdmin = AdminModel({ ...req.body, password: hashedPassword });

    try {
      const savedAdmin = await newAdmin.save();
      res.send("Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email: email }).lean();
    if (!admin) return res.status(400).send("Account does not exist");

    //Check if password matches
    const valid_password = await bcrypt.compare(password, admin.password);
    if (!valid_password) return res.status(400).send("Invalid password");

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_ADMIN_TOKEN_KEY);

    const { password: adminPassword, ...adminWithoutPassword } = admin;
    res.header("auth-token", token).send(adminWithoutPassword);
  },

  autoLogin: async function (req, res) {
    const admin = await AdminModel.findById(req.admin._id).select("-password");
    res.send(admin);
  },
};
