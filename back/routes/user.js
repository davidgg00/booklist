const { Router } = require("express");
const { check } = require("express-validator");
const {
  register,
  login,
  checkAuthToken,
  getAllUsers,
  getDataUser,
} = require("../controllers/user");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/checkAuthToken", checkAuthToken);
router.get("/getAllUsers", getAllUsers);
router.get("/getDataUser/:id", getDataUser);

module.exports = router;
