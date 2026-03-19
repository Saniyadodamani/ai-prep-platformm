import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

async function checkUsers() {
  const users = await User.find({});
  console.log("ALL USERS IN DB:");
  users.forEach(u => {
    console.log(`- ID: ${u._id} | Name: "${u.name}" | Email: ${u.email}`);
  });
  process.exit();
}
checkUsers();
