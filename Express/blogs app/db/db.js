import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogDB");
    console.log("Database connected ✅");
  } catch (error) {
    console.log(error);
  }
}

