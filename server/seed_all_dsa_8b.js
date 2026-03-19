import mongoose from "mongoose";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import Question from "./models/Question.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const FALLBACK_MODEL = "llama-3.1-8b-instant";

const companies = ["Facebook", "Amazon", "Apple", "Netflix", "Google", "Microsoft", "Meta", "Flipkart"];
const difficulties = ["Easy", "Medium", "Hard"];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function seedAllUnique8B() {
  console.log("Wiping existing DSA questions...");
  await Question.deleteMany({});
  console.log("Wiped successfully.");

  let totalInserted = 0;
  const usedTitles = new Set();
  
  for (const company of companies) {
    for (const difficulty of difficulties) {
      console.log(`Generating 10 unique ${difficulty} questions for ${company}...`);
      
      let success = false;
      let retries = 0;

      while (!success && retries < 3) {
        const banList = Array.from(usedTitles).join(", ");
        const prompt = `You are a FAANG interview expert. Generate exactly 10 DISTINCT Data Structures and Algorithms (DSA) interview questions that evaluate candidates at a ${difficulty} level for ${company}.
        
        CRITICAL RULE: You MUST NOT generate any problem that is the same or similar to the following titles: 
        [${banList}]
        
        Return a JSON array of exactly 10 objects. Do NOT use markdown blocks. Respond ONLY with the raw JSON array.
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
              console.log(`Successfully inserted ${uniqueBatch.length} unique questions. Retry: ${retries} Total: ${totalInserted}/240`);
              success = true;
            } else {
              console.log("LLM completely ignored the ban list. Retrying...");
              retries++;
            }
          }
        } catch (err) {
          console.error(`Error/JSON Parse Error on retry ${retries}: ${err.message}`);
          retries++;
        }
        await delay(3000); 
      }
    }
  }

  console.log(`Finished! Total Unique DSA Questions Seeded using 8B: ${totalInserted}`);
  const finalCount = await Question.countDocuments();
  console.log(`Final true Database verification count: ${finalCount} / 240`);
  mongoose.disconnect();
}

seedAllUnique8B();
