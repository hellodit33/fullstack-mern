const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

/**
 * @param {string} maxAge gives the token a life of three days
 */
const maxAge = 3 * 24 * 60 * 60 * 1000;

//create Token with jwt
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

/**
 *
 * @param {json} req
 * @param {json} res
 * @desc Signup looks for matching credentials in DB, and then allows user to connect
 */
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

/**
 *
 * @param {json} req
 * @param {json} res
 * @desc Signin looks for matching credentials in DB with password and email, and then allows user to connect
 */
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

/**
 *
 * @param {json} req
 * @param {jsonn} res
 * @desc logout takes away the cookie from the user in 1ms and redirects to home
 */
module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
