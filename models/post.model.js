const mongoose = require("mongoose");

//Create schema and model for posts
const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    //the picture upload is not available on heroku
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    //the like function is still in work in progress
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commentatorId: String,
          commentatorPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
