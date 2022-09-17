const { StatusCodes } = require("http-status-codes");
const CustomAIPError = require("./custom-api");

class UnauthorizedError extends CustomAIPError {
  constructor(message) {
    super(message);
    this.stateCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
