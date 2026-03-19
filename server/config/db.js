import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saniyadodamani:InterviewIQ123@cluster0.flhsigy.mongodb.net/interviewIQ"
      
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;




