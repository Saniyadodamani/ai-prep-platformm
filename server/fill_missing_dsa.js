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
const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function fillMissing() {
  console.log("Fetching DB state...");
  const allExisting = await Question.find({});
  const usedTitles = new Set();
  
  const counts = {};
  for(const c of companies) {
    for(const d of difficulties) {
      counts[`${c}-${d}`] = 0;
    }
  }
  
  for(const q of allExisting) {
    if (q.title && q.company && q.difficulty) {
        usedTitles.add(q.title.toLowerCase().trim());
        counts[`${q.company}-${q.difficulty}`]++;
    }
  }

  for(const c of companies) {
    for(const d of difficulties) {
      let needed = 10 - counts[`${c}-${d}`];
      
      let retries = 0;
      while (needed > 0 && retries < 5) {
        console.log(`[${c} ${d}] Needs ${needed} more unique questions. Attempt ${retries+1}`);
        const banList = Array.from(usedTitles).join(", ");
        const prompt = `You are a FAANG interview expert. Generate exactly ${needed} DISTINCT Data Structures and Algorithms interview questions at a ${d} level for ${c}.
        
        CRITICAL RULE: DO NOT use any of these titles (they are already used in our database!): 
        [${banList}]
        
        Return a JSON array of exactly ${needed} objects. No markdown.
        [{"title":"Distinct Title","statement":"String","example":"String","company":"${c}","difficulty":"${d}","topic":"String"}]`;

        try {
          const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: FALLBACK_MODEL,
            temperature: 0.8,
          });

          let text = completion.choices[0].message.content.trim();
          if (text.startsWith("\`\`\`json")) text = text.replace(/^\`\`\`json/, "");
          if (text.startsWith("\`\`\`")) text = text.replace(/^\`\`\`/, "");
          if (text.endsWith("\`\`\`")) text = text.replace(/\`\`\`$/, "");
          
          const data = JSON.parse(text.trim());
          if (Array.isArray(data)) {
            let uniqueBatch = [];
            data.forEach(q => {
               const lowerTitle = q.title ? q.title.toLowerCase().trim() : "";
               if (!usedTitles.has(lowerTitle) && lowerTitle !== "") {
                  usedTitles.add(lowerTitle);
                  
                  // Enforce current filter values
                  q.company = c;
                  q.difficulty = d;
                  if(!q.topic) q.topic = "General";
                  
                  uniqueBatch.push(q);
               }
            });

            // If we generated more unique than needed, truncate!
            if (uniqueBatch.length > needed) {
              uniqueBatch = uniqueBatch.slice(0, needed);
            }

            if (uniqueBatch.length > 0) {
              await Question.insertMany(uniqueBatch);
              needed -= uniqueBatch.length;
              console.log(`+ Added ${uniqueBatch.length} valid unique questions. (Still need ${needed})`);
            } else {
              console.log("- LLM generated entirely duplicate titles. Retrying...");
              retries++;
            }
          } else {
            retries++;
          }
        } catch(err) {
          console.error(`- Error/Bad JSON: ${err.message}`);
          retries++;
        }
        await delay(3000);
      }
    }
  }
  const finalCount = await Question.countDocuments();
  console.log(`DONE. Database has ${finalCount} / 240 distinct questions.`);
  process.exit();
}
fillMissing();
