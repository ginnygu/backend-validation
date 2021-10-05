const { checkIsEmpty } = require("./shared/checkIsEmpty");
const { checkIsUndefined } = require("./shared/checkIsUndefined");
const {
  validateLoginData,
} = require("./authLoginMiddleware/validateLoginData");

const {
  validateCreateData,
} = require("./authCreateMiddleware/validateCreateData");

module.exports = {
  checkIsEmpty,
  checkIsUndefined,
  validateLoginData,
  validateCreateData,
};
