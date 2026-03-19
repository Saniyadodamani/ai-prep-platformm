import dotenv from "dotenv";
dotenv.config();

const key = process.env.GEMINI_API_KEY;

async function run() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  if (data.error) {
    console.error("API ERROR:", JSON.stringify(data.error, null, 2));
  } else {
    console.log("AVAILABLE MODELS:");
    data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods.join(", ")})`));
  }
}

run();
