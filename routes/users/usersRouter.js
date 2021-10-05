var express = require("express");
var router = express.Router();
const { createUser, login } = require("./controller/userController");

const {
  checkIsEmpty,
  checkIsUndefined,
  validateCreateData,
  validateLoginData,
} = require("./lib/authMiddleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/create-user",
  checkIsUndefined,
  checkIsEmpty,
  validateCreateData,
  createUser
);
router.post("/login", checkIsUndefined, checkIsEmpty, validateLoginData, login);

module.exports = router;
