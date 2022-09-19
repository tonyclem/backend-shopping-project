const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/authController");

router.post("/register", register).get("/logout", logout).post("/login", login);

module.exports = router;
