const cloudinary = require("../utils/cloudinaryConfig");
const upload = require("../utils/multerConfig");

const uploadImage = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.image = result.secure_url;
    next();
  } catch (err) {
    res.status(400).send("Invalid image");
  }
};

module.exports = uploadImage;
