import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
    const result = await model.generateContent("Say 'hello world'");
    fs.writeFileSync("test_output6.txt", "SUCCESS: " + result.response.text(), "utf8");
  } catch (err) {
    fs.writeFileSync("test_output6.txt", "ERROR: " + err.message + "\n\n" + JSON.stringify(err, null, 2), "utf8");
  }
}
test();
