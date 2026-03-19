import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DSA_COMPANIES = ["Facebook", "Amazon", "Apple", "Netflix", "Google", "Microsoft", "Meta", "Flipkart"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const THEORY_TOPICS = ["Operating Systems", "DBMS", "Computer Networks", "OOPS", "Behavioral/HR"];

const Dsa = mongoose.model('DsaQuestion', new mongoose.Schema({ company: String, difficulty: String, title: String, statement: String, example: String, topic: String }, { collection: 'dsa_questions'}));
const Theory = mongoose.model('TheoryQuestion', new mongoose.Schema({ topic: String, difficulty: String, question: String, options: [String], correctOptionIndex: Number, explanation: String }, { collection: 'theory_questions'}));
const SystemDesign = mongoose.model('SystemDesignQuestion', new mongoose.Schema({ difficulty: String, title: String, description: String, functionalRequirements: [String], nonFunctionalRequirements: [String] }, { collection: 'systemdesign_questions'}));

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // 1. CLEAR COLLECTIONS
  await Dsa.deleteMany({});
  await Theory.deleteMany({});
  await SystemDesign.deleteMany({});
  
  // 2. SEED DSA (240 questions)
  const dsaDocs = [];
  const verbs = ["Find", "Reverse", "Optimize", "Count", "Sort", "Merge", "Detect", "Balance", "Search", "Calculate"];
  const objects = ["Elements", "Paths", "Nodes", "Cycles", "Subarrays", "Sequences", "Duplicates", "Distances", "Values", "Sums"];
  const structures = ["Array", "Binary Tree", "Graph", "Linked List", "Matrix", "String", "Heap", "Hash Map", "Stack", "Queue"];
  let id = 0;
  
  for (const company of DSA_COMPANIES) {
    for (const diff of DIFFICULTIES) {
      for (let i = 0; i < 10; i++) {
        const title = `${verbs[i % verbs.length]} ${objects[(i + id) % objects.length]} in a ${structures[(i*2 + id) % structures.length]} for ${company}`;
        dsaDocs.push({
          company,
          difficulty: diff,
          title: title,
          topic: structures[(i*2 + id) % structures.length],
          statement: `Given a dataset, implement an algorithm to solve the "${title}" problem. Ensure edge cases like null inputs and zero-length arrays are handled correctly. Your solution should be optimized for Time and Space.`,
          example: `Input: [1, 2, 3]\nOutput: [Expected Result]\nExplanation: Standard processing yields the target result for ${company}.`
        });
        id++;
      }
    }
  }
  await Dsa.insertMany(dsaDocs);
  console.log(`✅ Seeded ${dsaDocs.length} DSA questions!`);

  // 3. SEED THEORY (150 questions)
  const theoryDocs = [];
  let tid = 0;
  for (const topic of THEORY_TOPICS) {
    for (const diff of DIFFICULTIES) {
      for (let i = 0; i < 10; i++) {
        theoryDocs.push({
          topic,
          difficulty: diff,
          question: `Which of the following is the most accurate description of concept #${tid} relating to ${topic}?`,
          options: [
            `Option A: Standard definition of concept ${tid}`,
            `Option B: Inverse of concept ${tid}`,
            `Option C: A completely unrelated concept`,
            `Option D: Theoretical boundary condition associated with ${diff} constraints`
          ],
          correctOptionIndex: i % 4,
          explanation: `The correct aspect of ${topic} follows standard Computer Science definitions. Option ${['A','B','C','D'][i % 4]} encapsulates this perfectly.`
        });
        tid++;
      }
    }
  }
  await Theory.insertMany(theoryDocs);
  console.log(`✅ Seeded ${theoryDocs.length} Theory questions!`);

  // 4. SEED SYSTEM DESIGN (30 questions)
  const sdDocs = [];
  const products = ["Messaging App", "Video Streaming Service", "Ride-Sharing Platform", "E-commerce Website", "Global Key-Value Store", "Social Media Feed", "Search Engine", "Payment Gateway", "File Storage System", "Live Auction Platform"];
  for (const diff of DIFFICULTIES) {
    for (let i = 0; i < 10; i++) {
      sdDocs.push({
        difficulty: diff,
        title: `Design a ${products[i]} (${diff})`,
        description: `Design the architecture for a highly scalable ${products[i]}. Discuss constraints, tradeoffs, and CAP theorem considerations.`,
        functionalRequirements: [
          "Users should be able to instantly interact with the core capability.",
          "The system should store historical data securely.",
          "It must support advanced search and filtering."
        ],
        nonFunctionalRequirements: [
          "High Availability (99.99%)",
          `Latency under ${diff === 'Hard' ? '50' : '200'}ms`,
          "Eventual Consistency acceptable depending on data access patterns"
        ]
      });
    }
  }
  await SystemDesign.insertMany(sdDocs);
  console.log(`✅ Seeded ${sdDocs.length} System Design questions!`);
  
  mongoose.connection.close();
}

run().catch(console.error);
