import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);
const URI = process.env.MONGO_URI;
const connection = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected Successfully!");
  } catch (error) {
    console.log("Error while connecting", error.message);
  }
};

export default connection;
