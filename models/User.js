const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    validated: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "The password is required"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
