const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = new User({ email, password, name });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ email }, process.env.llave, {
        expiresIn: 1440,
      });
      res.send({ user, token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { register, login };
