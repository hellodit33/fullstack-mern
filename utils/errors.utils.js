module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.message.includes("pseudo"))
    errors.pseudo = "Invalid pseudo or already existing";

  if (err.message.includes("email")) errors.email = "Invalid email";

  if (err.message.includes("password"))
    errors.password = "The password needs to be at least 6 characters";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.email = "This username is already existing";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "This email is already existing as a user";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Unknown email";

  if (err.message.includes("password")) errors.password = "Invalid password";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("invalid file")) errors.format = "invalid format";

  if (err.message.includes("max size"))
    errors.maxSize = "the file is too large";
  return errors;
};
