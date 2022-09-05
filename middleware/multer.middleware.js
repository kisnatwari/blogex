const multer = require("multer");
const multipart = multer().single("image");

module.exports = multipart;