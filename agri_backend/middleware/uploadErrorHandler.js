const multer = require("multer");

const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // File size error
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file must be less than 5mb",
      });
    }
  }

  // File type error
  if (err.message === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      message: "file must be a image in jpg/png/jpeg/webp",
    });
  }

  next(err);
};

module.exports = uploadErrorHandler;