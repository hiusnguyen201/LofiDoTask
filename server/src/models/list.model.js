import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listSchema = new Schema({
  board: {
    type: Schema.ObjectId,
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
});

const List = mongoose.model("List", listSchema);
export default List;
