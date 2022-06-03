//auth.middleware requirements
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

/**
 *
 * @desc try catch block to grant request by JWT. The middleware verifies the token provided by the user, if it works it looks after the right user, if it does not it returns null
 *
 */
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  //check if token
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        /*res.cookie("jwt", "", { maxAge: 1 });*/
        /*next()*/
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        console.log(user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
