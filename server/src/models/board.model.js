import mongoose from "mongoose";
import visibilityStatus from "#src/constants/visibilityStatus.constant.js";

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
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
      default: visibilityStatus.PUBLIC,
    },
    pinnedAt: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const Board = mongoose.model("Board", boardSchema);
export default Board;
