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
  favorites: {
    type: [String],
    default: [],
  },
  postedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("DidYouKnow", didYouKnowSchema);
