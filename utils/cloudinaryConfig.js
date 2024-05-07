const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = { overwrite: true, invalidate: true, resource_type: "auto" };

module.exports = (image, folder) => {
  return new Promise((resolve, reject) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    cloudinary.uploader.upload(dataURI, { folder: folder, ...options }, (error, result) => {
      if (result && result.secure_url) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
