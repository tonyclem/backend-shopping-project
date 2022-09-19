const CustomAIPError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomAIPError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};
