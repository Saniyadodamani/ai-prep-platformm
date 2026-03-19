import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

async function checkUniqueness() {
  const all = await Question.find({});
  const titles = new Set();
  const duplicates = [];

  for (const q of all) {
    const t = q.title.toLowerCase().trim();
    if (titles.has(t)) {
      duplicates.push({ title: q.title, company: q.company, difficulty: q.difficulty, id: q._id });
    } else {
      titles.add(t);
    }
  }

  console.log(`Total questions: ${all.length}`);
  console.log(`Unique titles: ${titles.size}`);
  console.log(`Duplicate entries detected: ${duplicates.length}`);
  
  // Print some examples
  if (duplicates.length > 0) {
    console.log("Examples of duplicates:", duplicates.slice(0, 10).map(d => `${d.title} (${d.company} ${d.difficulty})`));
  }

  process.exit();
}

checkUniqueness();
