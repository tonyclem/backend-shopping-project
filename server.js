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
const cookieParser = require("cookie-parser");

// middleWares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandleMiddleware = require("./middlewares/error-handler");

// connectDB
const connectDB = require("./db/connect");

// Route
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("<h1>Welcome to E-commerce API</h1>");
});

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("<h1>Welcome to E-commerce API Cookies</h1>");
});

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

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
