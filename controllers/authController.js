const { StatusCodes } = require("http-status-codes");
const connectDataBase = require("../db/connect");
const CustomAIPError = require("../errors");
const User = require("../models/User");
const { attachCookiesToResponse } = require("../utils");

// register Func
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomAIPError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Created User successful", user: tokenUser });
};

// login Func
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  res.status(StatusCodes.OK).json({ message: "User Login Successful", user });
};

// logout Func
const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "User Logout Successful" });
};

module.exports = {
  register,
  login,
  logout,
};
