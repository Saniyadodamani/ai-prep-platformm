import mongoose from "mongoose";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import Question from "./models/Question.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

const companies = ["Facebook", "Amazon", "Apple", "Netflix", "Google", "Microsoft", "Meta", "Flipkart"];
const difficulties = ["Easy", "Medium", "Hard"];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function seedUniqueDSA() {
  console.log("Wiping existing DSA questions...");
  await Question.deleteMany({});
  console.log("Wiped successfully.");

  let totalInserted = 0;
  const usedTitles = new Set();
  
  // A predefined list of 240 explicit FAANG questions could be best, but we'll try prompting the LLM with a dynamic ban-list:
  for (const company of companies) {
    for (const difficulty of difficulties) {
      console.log(`Generating 10 unique ${difficulty} questions for ${company}...`);
      
      const banList = Array.from(usedTitles).join(", ");
      const prompt = `You are a FAANG interview expert. Generate exactly 10 DISTINCT Data Structures and Algorithms (DSA) interview questions that evaluate candidates at a ${difficulty} level for ${company}.
      
      CRITICAL RULE: You MUST NOT generate any problem that is the same or similar to the following titles: 
      [${banList}]
      
      Invent completely new or extremely obscure variations if needed.
      
      Return a JSON array of 10 objects. Do NOT use markdown blocks. Respond ONLY with the raw JSON array.
      Object format:
      [
        {
          "title": "String",
          "statement": "String",
          "example": "String",
          "company": "${company}",
          "difficulty": "${difficulty}",
          "topic": "String"
        }
      ]`;

      try {
        const completion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: DEFAULT_MODEL,
          temperature: 0.7, // increased temp for more variety
        });

        let text = completion.choices[0].message.content.trim();
        if (text.startsWith("\`\`\`json")) text = text.replace(/^\`\`\`json/, "");
        if (text.startsWith("\`\`\`")) text = text.replace(/^\`\`\`/, "");
        if (text.endsWith("\`\`\`")) text = text.replace(/\`\`\`$/, "");
        text = text.trim();

        const data = JSON.parse(text);
        if (Array.isArray(data) && data.length > 0) {
          // Double check the array itself for duplicates against our Set
          const uniqueData = data.filter(q => {
            const lowerTitle = q.title.toLowerCase().trim();
            if (usedTitles.has(lowerTitle)) return false;
            usedTitles.add(lowerTitle);
            return true;
          });
          
          if (uniqueData.length > 0) {
            await Question.insertMany(uniqueData);
            totalInserted += uniqueData.length;
            console.log(`Successfully inserted ${uniqueData.length} unique questions. Total DB: ${totalInserted}/240`);
          } else {
            console.log("LLM completely ignored the ban list and generated 10 duplicates. Skipping batch.");
          }
        }
      } catch (err) {
        console.error(`Error generating for ${company} ${difficulty}:`, err.message);
      }
      
      await delay(2000); // Prevent 429
    }
  }

  console.log(`Finished! Total Unique DSA Questions Seeded: ${totalInserted}`);
  
  // Quick validation
  const finalCount = await Question.countDocuments();
  console.log(`Final Database count: ${finalCount}`);
  mongoose.disconnect();
}

seedUniqueDSA();
