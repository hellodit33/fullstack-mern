const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

module.exports.uploadProfile = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    console.log(err);
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json(result);
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: result.secure_url, cloudinary_id: result.public_id } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500);
  }
};
