const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports = {
  create: async function (req, res) {
    const userExists = await UserModel.findOne({ email: req.body.email });
    console.log(userExists);
    if (userExists) {
      return res.status(400).send("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = UserModel({ ...req.body, password: hashedPassword });

    try {
      const savedUser = await newUser.save();
      console.log(savedUser);
      res.send("Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email }).lean();
    if (!user) return res.status(400).send("User does not exist");

    //Check if password matches
    const valid_password = await bcrypt.compare(password, user.password);
    if (!valid_password) return res.status(400).send("Invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_KEY);

    const { password: userPassword, ...userWithoutPassword } = user;
    console.log(userWithoutPassword);

    res.header("auth-token", token).send(userWithoutPassword);
  },

  autoLogin: async function (req, res) {
    const user = await UserModel.findById(req.user._id).select("-password");
    console.log(user);
    res.send(user);
  },
};
