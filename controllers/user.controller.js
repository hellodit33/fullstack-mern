//user controller requiremments
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

/**
 *
 * @desc getAllUsers finds all users
 */

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

/**
 *
 * @returns userInfo for the profile
 */
module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

/**
 *
 * @returns new information about user into db, while onboarding or changing info on profile
 */
module.exports.updateUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
          platforms: req.body.platforms,
          streamingPattern: req.body.streamingPattern,
          mood: req.body.mood,
          rent: req.body.rent,
          genres: req.body.genres,
          cogenres: req.body.cogenres,
          interests: req.body.interests,
          cowatching: req.body.cowatching,
          gender: req.body.gender,
          yearBorn: req.body.yearBorn,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**
 *
 * @returns deletes the user - a function not in place on the front-end yet
 */
module.exports.deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**
 *
 * @returns follows userId
 */
module.exports.follow = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    //add to the follower list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
    //add to following list
    UserModel.findByIdAndUpdate(
      req.body.idToFollow,

      {
        $addToSet: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true },
      (err, data) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**
 *
 * @returns unfollow userId
 */
module.exports.unfollow = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown: " + req.params.id);
  try {
    //remove from the follower list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
    //add to following list
    UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,

      {
        $pull: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true },
      (err, data) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
