const User = require("../model/User");

function checkForNumberAndSymbol(target) {
  if (target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
    return true;
  } else {
    return false;
  }
}

function checkIsEmpty(target) {
  if (target.length === 0) {
    return true;
  } else {
    return false;
  }
}

function checkSymbol(target) {
  if (target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>]/g)) {
    return true;
  } else {
    return false;
  }
}

function checkIsEmail(target) {
  if (target.match(/\S+@\S+\.\S+/)) {
    return false;
  } else {
    return true;
  }
}

async function createUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body;
  let body = req.body;
  //How would you validate firstName to make sure only alphabet is allowed
  let errObj = {};

  for (let key in body) {
    if (checkIsEmpty(body[key])) {
      errObj[`${key}`] = `${key} cannot be empty`;
    }
  }

  if (checkForNumberAndSymbol(firstName)) {
    errObj.firstName = "First Name cannot have special characters or numbers";
  }

  if (checkForNumberAndSymbol(lastName)) {
    errObj.lastName = "last Name cannot have special characters or numbers";
  }

  if (checkSymbol(username)) {
    errObj.username = "Username cannot have special characters";
  }

  if (checkIsEmail(email)) {
    errObj.email = "please enter a valid email";
  }

  //min 8 characters - alphabet, number, special number, one uppercase

  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
      message: "error",
      error: errObj,
    });
  }

  try {
    const createdUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    let savedUser = await createdUser.save();

    res.json({ message: "success", payload: savedUser });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
}

module.exports = {
  createUser,
};
