const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  middlename: { type: String }, // optional
  lastname: { type: String, required: true },
  dob: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  bio: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
