const { StatusCodes } = require("http-status-codes");
const CustomAIPError = require("./custom-api");

class UnauthenticatedError extends CustomAIPError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
