const { StatusCodes } = require("http-status-codes");
const CustomAIPError = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomAIPError.BadRequestError("Email already exists");
  }

  const user = await User.create({ name, email, password });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Created User successful", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  res.status(StatusCodes.OK).json({ message: "User Login Successful", user });
};

const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "User Logout Successful" });
};

module.exports = {
  register,
  login,
  logout,
};
