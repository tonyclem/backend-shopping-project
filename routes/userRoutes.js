const express = require("express");
const router = express.Router();

// authenticateUser
const { authenticateUser } = require("../middlewares/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(authenticateUser, getAllUsers);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserAndPassword").patch(updateUserPassword);
router.route("/:id").get(getSingleUser);

module.exports = router;
