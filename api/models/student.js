const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  year: Number,
  course: String,
  experience: String,
  work: String
  //Add image later
});

module.exports = mongoose.model("Student", studentSchema);
