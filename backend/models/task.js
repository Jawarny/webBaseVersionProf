const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: Date,
  priorite: Number,
  assignee: Number,
});

module.exports = mongoose.model("Task", taskSchema);
