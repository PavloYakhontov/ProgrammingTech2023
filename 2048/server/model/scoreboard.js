const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  score: { type: Number }
});

module.exports = mongoose.model("scoreboard", userSchema);