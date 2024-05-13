const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, minLength: 6 },
  image: { type: String, require: true },
  role: { type: String, require: true },
  tasks: { type: Number, require: true },
});
module.exports = mongoose.model("User", userSchema);
