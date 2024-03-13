const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    exposedHeaders: "auth-token",
  })
);

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// ROUTES
const userRoutes = require("./routes/User");
app.use("/api/users", userRoutes);

// SERVER
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
