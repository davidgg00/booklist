const { Router } = require("express");
const { jwtValidation } = require("../middlewares/jwt-validation");
const {
  getUserBooks,
  addUserBook,
  updateUserBook,
} = require("../controllers/userBooks");

const router = Router();

router.post("/add", [jwtValidation], addUserBook);
router.get("/get/:userEmail", [jwtValidation], getUserBooks);
router.post("/update", [jwtValidation], updateUserBook);

module.exports = router;
