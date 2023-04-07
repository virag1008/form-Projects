const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  salutation: String,
  fname: String,
  lname: String,
  dob: String,
  currentAge: Object,
  username: String,
  city: String,
  state: String,
  mobileNo: Number,
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
