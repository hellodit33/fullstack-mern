const multer = require("multer");
const path = require("path");

//multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("this file type is not supported"), false);
      return;
    }
    //file format supported, callback accepts the file so the boolean is true
    cb(null, true);
  },
});
