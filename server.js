require("dotenv").config();
require("express-async-errors");

// const Express
const express = require("express");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandleMiddleware = require("./middlewares/error-handler");

// connectDB
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce API</h1>");
});

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}.....`);
    });
  } catch (errors) {
    console.log(errors);
  }
};

start();
