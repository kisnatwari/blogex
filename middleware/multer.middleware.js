const multer = require("multer");
const storage = multer.diskStorage({
    destination: (request, fileInfo, callback) => {
        callback(null, "storage/images");
    },
    filename: (request, fileInfo, callback) => {
        callback(null, "demo.png");
    }
})
const multipart = multer({
    storage: storage
}).single("image");

module.exports = multipart;