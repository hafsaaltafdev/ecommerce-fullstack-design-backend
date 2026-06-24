import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;