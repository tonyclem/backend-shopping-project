const { StatusCodes } = require("http-status-codes");
const CustomAIPError = require("./custom-api");

class NotFoundError extends CustomAIPError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
