const { StatusCodes } = require("http-status-codes");
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

  if (!email || !password) {
    throw new CustomAIPError.BadRequestError(
      "Please enter a valid email and password"
    );
  }

  const user = await User.findOne({ email });
  if (!user)
    throw new CustomAIPError.UnauthenticatedError("Invalid Credentials");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new CustomAIPError.UnauthenticatedError("Invalid Credentials");

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res
    .status(StatusCodes.OK)
    .json({ message: "User Login Successful", user: tokenUser });
};

// logout Func
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "User Logout Successful" });
};

module.exports = {
  register,
  login,
  logout,
};
