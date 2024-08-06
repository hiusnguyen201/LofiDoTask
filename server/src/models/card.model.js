import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  list: {
    type: Schema.ObjectId,
    ref: "List",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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

const Card = mongoose.model("Card", cardSchema);
export default Card;
