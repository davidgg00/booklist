const jwt = require("jsonwebtoken");
const Usuario = require("../models/User");

const jwtValidation = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Token invalid" });
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token invalid" });
  }
};

module.exports = {
  jwtValidation,
};
