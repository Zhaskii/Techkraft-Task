import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["male", "female", "others"],
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["buyer", "seller"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
  },
  { timestamps: true },
);

const UserTable = mongoose.model("User", userSchema);

export default UserTable;
