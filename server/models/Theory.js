import mongoose from "mongoose";

const theorySchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      enum: ["Operating Systems", "DBMS", "Computer Networks", "OOPS", "Behavioral"]
    },
    questionNumber: {
      type: Number,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length === 4,
        message: "Must have exactly 4 options"
      }
    },
    correctOptionIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3
    },
    explanation: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Theory", theorySchema);
