import mongoose from "mongoose";
import dotenv from "dotenv";
import Theory from "./models/Theory.js";

dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const topics = await Theory.distinct("topic");
  console.log("Topics in DB:", topics);
  
  for (const topic of topics) {
    const easy = await Theory.countDocuments({ topic, difficulty: "Easy" });
    const medium = await Theory.countDocuments({ topic, difficulty: "Medium" });
    const hard = await Theory.countDocuments({ topic, difficulty: "Hard" });
    console.log(`Topic: ${topic} | Easy: ${easy}, Medium: ${medium}, Hard: ${hard}`);
  }
  process.exit();
}

check();
