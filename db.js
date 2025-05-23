import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURL = process.env.MONGO_URI;
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("connected to database");
});
db.on("error", (err) => {
  console.log("error connecting to database", err);
});
db.on("disconnected", () => {
  console.log("disconnected from database");
});

export default db;
