const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

async function createUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save();

    res.json({ message: "success", payload: savedUser });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  //log the user in using email and password
  //if email does not exists, error message "please go sign up"
  //if email exists but wrong password error message "please check your email and password"
  //if successful - for now send message "Login success"

  try {
    let foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(500).json({
        message: "error",
        error: "please go sign up",
      });
    } else {
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        return res.status(500).json({
          message: "error",
          error: "Please check your email and password",
        });
      } else {
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
}

module.exports = {
  createUser,
  login,
};

//create a jsonwebtoken
//use .env to protect your token secret
//your token should have your email and username information

//create a profile route
//if the token is not valid you tell the user "invalid token, please contact support"
//if the token is valid - response with "success" and the decoded data
//use post request to achieve this
