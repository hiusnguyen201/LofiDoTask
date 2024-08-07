import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
