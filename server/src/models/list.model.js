import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.ObjectId,
      ref: "Board",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isWatched: {
      type: Boolean,
      required: true,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const List = mongoose.model("List", listSchema);
export default List;
