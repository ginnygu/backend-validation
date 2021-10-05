const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  try {
    console.log(req.headers.authorization);

    if (req.headers && req.headers.authorization) {
      let notDecodedToken = req.headers.authorization;

      let slicedToken = notDecodedToken.slice(7);

      let decodedToken = jwt.verify(slicedToken, process.env.JWT_SECRET);

      res.json({ message: decodedToken });
    } else {
      throw { message: "You don't have permission" };
    }

    /*
      let decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET)
    */

    //1. how to extract the token from the headers
    //2 and send back the decoded token in res.json
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
}

module.exports = {
  jwtMiddleware,
};
