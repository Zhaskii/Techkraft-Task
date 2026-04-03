import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    console.log("Database connected!");
  } catch (error) {
    console.log("Database connection failed!");
    console.log(error.message);
  }
};

export default connectDB;
