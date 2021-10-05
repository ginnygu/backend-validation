const { checkIsEmpty } = require("./shared/checkIsEmpty");
const { checkIsUndefined } = require("./shared/checkIsUndefined");
const {
  validateLoginData,
} = require("./authLoginMiddleware/validateLoginData");

const {
  validateCreateData,
} = require("./authCreateMiddleware/validateCreateData");

const { jwtMiddleware } = require("./shared/jwtMiddleware");

module.exports = {
  checkIsEmpty,
  checkIsUndefined,
  validateLoginData,
  validateCreateData,
  jwtMiddleware,
};
