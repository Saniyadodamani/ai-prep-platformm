import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const total = await Question.countDocuments();
console.log(`\n Total questions in database: ${total}`);

const byCompany = await Question.aggregate([
  { $group: { _id: "$company", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

console.log('\n Questions per company:');
byCompany.forEach(item => {
  console.log(`  ${item._id}: ${item.count} questions`);
});

const byDifficulty = await Question.aggregate([
  { $match: { company: "Amazon" } },
  { $group: { _id: "$difficulty", count: { $sum: 1 } } },
  { $sort: { _id: -1 } }
]);

console.log('\n Difficulty breakdown (Amazon):');
byDifficulty.forEach(item => {
  console.log(`  ${item._id}: ${item.count}`);
});

process.exit();
