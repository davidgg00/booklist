const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Please provide email, password and name",
    });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }
  const user = new User({ email, password, name });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const idToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ user, idToken });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const checkAuthToken = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(401).send("No Token");
  }
  try {
    const decoded = jwt.verify(idToken, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).send("Invalid auth Token" + idToken);
    }
    res.send({ user, idToken });
  } catch (error) {
    res.status(401).send("Invalid Auth Token" + error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getDataUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { register, login, checkAuthToken, getAllUsers, getDataUser };
