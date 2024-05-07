const CategoryModel = require("../models/categoriesModel");
const cloudinary = require("../utils/cloudinaryConfig");

module.exports = {
  create: async function (req, res) {
    try {
      const image = await cloudinary(req.file, "categories_images");
      const newCategory = CategoryModel({
        ...req.body,
        image: {
          url: image.secure_url,
          public_id: image.public_id,
        },
      });
      const savedCategory = await newCategory.save();
      res.send(savedCategory);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  get: async function (req, res) {
    try {
      const categories = await CategoryModel.find();
      res.send(categories);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
