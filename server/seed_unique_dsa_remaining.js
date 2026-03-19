import mongoose from "mongoose";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import Question from "./models/Question.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Switch to a completely different model with a fresh rate bucket!
const FALLBACK_MODEL = "llama-3.1-8b-instant"; 

const missingPairs = [
  { company: "Meta", difficulty: "Medium" },
  { company: "Meta", difficulty: "Hard" },
  { company: "Flipkart", difficulty: "Easy" },
  { company: "Flipkart", difficulty: "Medium" },
  { company: "Flipkart", difficulty: "Hard" },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function seedRemainingUnique() {
  console.log("Fetching currently used titles from MongoDB...");
  const existingQuestions = await Question.find({});
  const usedTitles = new Set();
  
  existingQuestions.forEach(q => usedTitles.add(q.title.toLowerCase().trim()));
  
  console.log(`Found ${usedTitles.size} existing unique distinct titles. Starting generation...`);
  
  let totalInserted = 0;

  for (const { company, difficulty } of missingPairs) {
    console.log(`Generating 10 unique ${difficulty} questions for ${company} via Mixtral...`);
    
    const banList = Array.from(usedTitles).join(", ");
    const prompt = `You are a FAANG interview expert. Generate exactly 10 DISTINCT Data Structures and Algorithms (DSA) interview questions that evaluate candidates at a ${difficulty} level for ${company}.
    
    CRITICAL RULE: You MUST NOT generate any problem that is the same or similar to the following titles: 
    [${banList}]
    
    Invent completely new or extremely obscure algorithmic variations if needed.
    
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
        model: FALLBACK_MODEL,
        temperature: 0.7,
      });

      let text = completion.choices[0].message.content.trim();
      if (text.startsWith("\`\`\`json")) text = text.replace(/^\`\`\`json/, "");
      if (text.startsWith("\`\`\`")) text = text.replace(/^\`\`\`/, "");
      if (text.endsWith("\`\`\`")) text = text.replace(/\`\`\`$/, "");
      text = text.trim();

      const data = JSON.parse(text);
      if (Array.isArray(data) && data.length > 0) {
        let uniqueBatch = [];
        data.forEach(q => {
           const lowerTitle = q.title ? q.title.toLowerCase().trim() : "";
           if (!usedTitles.has(lowerTitle) && lowerTitle !== "") {
              usedTitles.add(lowerTitle);
              uniqueBatch.push(q);
           }
        });

        if (uniqueBatch.length > 0) {
          await Question.insertMany(uniqueBatch);
          totalInserted += uniqueBatch.length;
          console.log(`Successfully inserted ${uniqueBatch.length} unique questions.`);
        } else {
          console.log(`Model generated only existing titles for ${company} ${difficulty}.`);
        }
      }
    } catch (err) {
      console.error(`Error generating for ${company} ${difficulty}:`, err.message);
    }
    
    await delay(2000); 
  }

  console.log(`Finished! Total Unique DSA Questions Seeded in this run: ${totalInserted}`);
  const finalCount = await Question.countDocuments();
  console.log(`Final Database verification count: ${finalCount} / 240`);
  mongoose.disconnect();
}

seedRemainingUnique();
