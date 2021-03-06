const mongoose = require("mongoose");
//library to validate emails
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    //trim leaves out the blanks written by the user
    pseudo: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 15,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    yearBorn: {
      type: String,
    },
    //the picture upload does not work on heroku but each new user gets the same default picture
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    gender: {
      type: String,
    },
    platforms: {
      type: [String],
    },
    cowatching: {
      type: Boolean,
    },
    streamingPattern: {
      type: [String],
    },
    mood: {
      type: String,
    },
    rent: {
      type: String,
    },
    genres: {
      type: [String],
    },
    cogenres: {
      type: [String],
    },
    antitriggers: {
      type: [String],
    },
    interests: {
      type: [String],
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//this password crypting function is played before saving into db so that the password gets crypted before getting into db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//checking if user wrote the write info when trying to sign in
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
