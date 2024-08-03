const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
