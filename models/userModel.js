const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profile_image: {
      type: String,
      required: false,
      default: process.env.SERVER_URL + "/images/default-profile-image.jpeg",
    },
    address: {
      line1: {
        type: String,
        required: [true, "Address Line 1 is required"],
      },
      line2: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      zip: {
        type: String,
        required: [true, "Zip is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
