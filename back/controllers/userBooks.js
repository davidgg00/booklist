const UserBooks = require("../models/UserBooks");
const User = require("../models/User");

const addUserBook = async (req, res) => {
  const { userEmail, bookId, status } = req.body;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const userBook = new UserBooks({ user, bookId, status });
  try {
    await userBook.save();
    res.status(200).json({ message: "User book added" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user book", error: error.message });
  }
};

const getUserBooks = async (req, res) => {
  const { userEmail } = req.params;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  try {
    const userBooks = await UserBooks.find({ user: user._id });
    res.status(200).json({ userBooks });
  } catch (error) {
    res.status(500).json({ message: "Error getting user books" });
  }
};

const updateUserBook = async (req, res) => {
  const { userEmail, bookId, status } = req.body;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  try {
    const userBook = await UserBooks.findOneAndUpdate(
      { user: user._id, bookId },
      { status }
    );
    res.status(200).json({ userBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating user book" });
  }
};

module.exports = { addUserBook, getUserBooks, updateUserBook };
