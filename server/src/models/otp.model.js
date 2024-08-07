import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
