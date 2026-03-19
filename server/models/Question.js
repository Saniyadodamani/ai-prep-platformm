import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: String,
  statement: String,
  example: String,
  company: String,
  difficulty: String,
  topic: String,
});

const Question = mongoose.model("Question", questionSchema);

export default Question;