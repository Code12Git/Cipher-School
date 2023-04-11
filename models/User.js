import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    aboutMe: { type: String },
    cipherMap: { type: String },
    onTheWeb: { type: String },
    professionalInfo: { type: String },
    interests: [{ type: String }],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
