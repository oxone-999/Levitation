import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const main = async () => {
  try {
    if (!process.env.DB) {
      throw new Error("DB URL is undefined");
    }
    await mongoose.connect(process.env.DB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

export default main;
