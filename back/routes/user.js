const { Router } = require("express");
const { check } = require("express-validator");
const { register, login, checkAuthToken } = require("../controllers/user");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/checkAuthToken", checkAuthToken);

module.exports = router;
