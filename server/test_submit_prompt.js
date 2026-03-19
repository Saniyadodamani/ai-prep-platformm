import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const prompt = `You are a senior software engineer conducting a FAANG coding interview.

Evaluate the following python solution.

Problem: Two Sum
Topic: Arrays
Description: Given an array of integers nums and an integer target...

Candidate's Code (python):
\`\`\`python
def twoSum(nums, target): return [0, 1]
\`\`\`

Evaluation type: Full submission review

Provide EXACTLY this LeetCode-style output format and nothing else:
**Test Cases**
- Test 1 (Basic): Passed 
- Test 2 (Edge case): Passed 
- Test 3 (Large input): Passed 

**Metrics**
- Runtime: 45ms (Beats 82%)
- Memory: 16.2 MB (Beats 65%)

**Final Result**: Accepted 

Be specific – reference the actual code the candidate wrote.`;

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are InterviewIQ-AI...",
    });
    const result = await model.generateContent(prompt);
    console.log("SUCCESS:", result.response.text());
  } catch (err) {
    console.error("ERROR MATCH:", err.message);
  }
}
run();
