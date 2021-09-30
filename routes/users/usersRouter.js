var express = require("express");
var router = express.Router();
const { createUser } = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", createUser);

module.exports = router;
