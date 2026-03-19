import mongoose from "mongoose";

const systemDesignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    functionalRequirements: [String],
    nonFunctionalRequirements: [String],
    interviewerExpectations: [String],
    keyConsiderations: [String],
    architecture: {
      overview: String,
      components: [String],
      flow: String
    },
    databaseSchema: String,
    scalabilityApproach: String,
    tradeOffs: [String],
    estimations: {
      throughput: String,
      storage: String,
      latency: String
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium"
    },
    category: String,
    relatedTopics: [String]
  },
  { timestamps: true }
);

const SystemDesignQuestion = mongoose.model("SystemDesignQuestion", systemDesignSchema);

export default SystemDesignQuestion;
