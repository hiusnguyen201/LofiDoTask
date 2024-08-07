import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    list: {
      type: mongoose.Schema.ObjectId,
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
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
