const express = require("express");
const { newUser, userLogin } = require("../controller/authController");

const router = express.Router();

router.post("/newUser", newUser);
router.post("/userLogin", userLogin);

module.exports = router;
