import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company: String,
  topic: String,
  difficulty: String,
  language: String,
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Progress", progressSchema);
