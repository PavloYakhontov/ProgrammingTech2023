const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: { type: String, default: null },
  jobTitle: { type: String },
  location: { type: String },
  jobType: { type: String },
  description: { type: String },
  companyName: { type: String },
  companyDescription: { type: String },
  website: { type: String },
  publishedOn: { type: Date },
  vacancy: { type: String },
  experience: { type: String },
  salary: { type: String },
  gender: { type: String },
  applicationDeadline: { type: Date }
});

module.exports = mongoose.model("post", postSchema);