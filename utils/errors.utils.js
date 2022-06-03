/**
 *
 * @param {object} err
 * @returns all errors messages when signing up
 */
module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.message.includes("pseudo")) errors.pseudo = "your pseudo is invalid";

  if (err.message.includes("email")) errors.email = "your email is invalid";

  if (err.message.includes("password"))
    errors.password = "the password needs to be at least 6 characters";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.email = "this username is already existing";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "this email is already existing as a user";

  return errors;
};

/**
 *
 * @param {object} err
 * @returns all error messages when signing up
 */

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Unknown email";

  if (err.message.includes("password"))
    errors.password = "your password is not valid, try again";

  return errors;
};

/**
 *
 * @param {object} err
 * @returns all upload errors when uploading a user picture - this function does not work on heroku
 */

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("invalid file")) errors.format = "invalid format";

  if (err.message.includes("max size"))
    errors.maxSize = "the file is too large, pick a smaller file";
  return errors;
};
