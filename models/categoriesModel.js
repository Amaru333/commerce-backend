const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },
    image: {
      url: {
        type: String,
        required: [true, "Category image is required"],
      },
      public_id: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categoriesSchema);
