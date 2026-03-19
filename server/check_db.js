import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

async function check() {
  const dsaCount = await Question.countDocuments();
  console.log("Total DSA Questions:", dsaCount);
  
  const netflixHard = await Question.countDocuments({ company: "Netflix", difficulty: "Hard" });
  console.log("Netflix Hard Questions:", netflixHard);

  // Group by company and difficulty
  const counts = await Question.aggregate([
    { $group: { _id: { company: "$company", difficulty: "$difficulty" }, count: { $sum: 1 } } }
  ]);
  
  console.log(counts);
  process.exit();
}

check();
