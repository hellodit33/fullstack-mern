const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

module.exports.uploadProfile = async (req, res) => {
  /*multer code
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );*/
  //cloudinary+multer code after
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: result.secure_url, cloudinary_id: result.public_id } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500);
  }
};
