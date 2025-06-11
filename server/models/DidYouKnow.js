const mongoose = require("mongoose");

const didYouKnowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String], // array of userIds or usernames who liked it
    default: [],
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DidYouKnow", didYouKnowSchema);
