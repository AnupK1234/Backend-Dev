import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongodbInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(
      `MongoDB connection successful \nHOST : ${mongodbInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB CONNECTION FAILED `, error);
    process.exit(1);
  }
};

export default connectDB;
