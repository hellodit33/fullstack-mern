//post controller requirements
const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
//fs, promisify and pipeline don't work know because the upload image function does not work on Heroku
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

/**
 *
 * @desc readPost shows all posts to the users, from latest to oldest
 */
module.exports.readPost = (req, res) => {
  PostModel.find((err, data) => {
    if (!err) res.send(data);
    else console.log("error to get data: " + err);
    //the last posts come first
  }).sort({ createdAt: -1 });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns either error if image upload did not work (the upload button is deactivated on the front end because of heroku), either the new post on the feed, or an error because saving the post did not work
 */
module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
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
      return res.json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  /**
   * @desc newPost takes the parameters available for making a new post, posterId is required as well as message
   * @desc picture is desactivated because of heroku
   */
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send("new error");
  }
};

/**
 *
 * @param {json} req
 * @param {json} res
 * @returns verifies if user can update, and then looks for content in request body and update the post
 */

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown" + req.params.id);
  const updateRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    { new: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log("update error: " + err);
    }
  );
};

/**
 *
 * @param {json} req
 * @param {json} res
 * @returns verifies if user can update and then deletes the post from db
 */
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("Delete error: " + err);
  });
};

//these like and unlike function are in work in progress
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        //pull the like so that we can unlike
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

/**
 *
 * @param {json} req
 * @param {json} res
 * @returns error if user cannot comment because not connected, or comment if user can comment
 */
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commentatorId: req.body.commentatorId,
            commentatorPseudo: req.body.commentatorPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

/**
 *
 * @param {json} req
 * @param {json} res
 * @returns edited comment if the user has the right to comment, and if the comment exist (right id)
 */
module.exports.editPostComment = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, data) => {
      const theComment = data.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

/**
 *
 * @param {json} req
 * @param {json} res
 * @returns deletes comment if the user has the right to delete the comment
 */
module.exports.deletePostComment = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
