const {
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
} = require("validator");

function validateCreateData(req, res, next) {
  const { firstName, lastName, username, email, password } = req.body;

  let errObj = {};
  if (!isAlpha(firstName)) {
    errObj.firstName = "First Name cannot have special characters or numbers";
  }

  if (!isAlpha(lastName)) {
    errObj.lastName = "Last Name cannot have special characters or numbers";
  }

  if (!isAlphanumeric(username)) {
    errObj.username = "Username cannot have special characters";
  }

  if (!isEmail(email)) {
    errObj.email = "please enter a valid email";
  }

  if (!isStrongPassword(password)) {
    errObj.password =
      "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
  }

  if (Object.keys(errObj).length > 0) {
    //How would you validate firstName to make sure only alphabet is allowed
    return res.status(500).json({
      message: "error",
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = {
  validateCreateData,
};
