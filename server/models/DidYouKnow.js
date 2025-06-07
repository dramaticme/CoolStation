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
  postedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("DidYouKnow", didYouKnowSchema);
