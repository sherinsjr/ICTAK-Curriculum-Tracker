const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "text/csv" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "text/plain" // Allow plain text files
    ) {
      callback(null, true);
    } else {
      console.log("Only jpg, png, csv, doc, pdf, or txt files are accepted");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

module.exports = upload;
