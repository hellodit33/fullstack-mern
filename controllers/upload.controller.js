//upload controller requirements
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
//fs, promisify and pipeline don't work know because the upload image function does not work on Heroku
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

/**
 *
 * @param {json} req
 * @param {json} res
 * @returns when this function works (not on heroku) it checks the size and the format of the file, sends error, and uploads the file thanks to multer, fs, promisify and pipeline
 */
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
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
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
