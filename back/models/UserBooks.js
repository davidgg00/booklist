const { Schema, model } = require("mongoose");

const UserBooksSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["read", "reading", "want to read"],
    required: true,
  },
});

module.exports = model("UserBooks", UserBooksSchema);
