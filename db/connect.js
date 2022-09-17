const mongoose = require("mongoose");

const connectDataBase = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDataBase;
