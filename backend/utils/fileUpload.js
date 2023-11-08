const multer = require("multer");

const storage_URL = "../../pinvent-app/frontend/public/upload/";

// Define file storage
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${storage_URL}/users`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${storage_URL}products`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    ); // 23/08/2022
  },
});

// Specify file format that can be saved
function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// const upload = multer({ storage, fileFilter });
const uploadUser = multer({ storage: storageUser });
const uploadProduct = multer({ storage : storageProduct });

// File Size Formatter
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

// module.exports = { upload, fileSizeFormatter };
module.exports = {uploadUser, uploadProduct }
