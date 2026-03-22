import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb+srv://saniyadodamani:InterviewIQ123@cluster0.flhsigy.mongodb.net/interviewIQ"
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;




