import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isClosed: {
    type: Boolean,
    required: true,
    default: false,
  },
  visibilityStatus: {
    type: Number,
  },
  prioritizedAt: {
    type: Date,
  },
});

const Board = mongoose.model("Board", boardSchema);
export default Board;
