require("dotenv").config();
require("express-async-errors");

// const Express
const express = require("express");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// Morgan
const morgan = require("morgan");

// middleWares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandleMiddleware = require("./middlewares/error-handler");

// connectDB
const connectDB = require("./db/connect");

// Route
const authRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce API</h1>");
});

app.use("/api/v1/auth", authRouter);

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
