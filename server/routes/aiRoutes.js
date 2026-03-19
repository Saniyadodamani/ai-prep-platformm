import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

/* ─── SYSTEM PROMPT ─── */
const FAANG_COACH_SYSTEM = `You are InterviewIQ-AI, an elite FAANG interview coach with 10+ years of experience helping engineers land offers at Google, Meta, Amazon, Apple, Netflix and Microsoft.

Your expertise covers:
- Data Structures & Algorithms (arrays, trees, graphs, DP, etc.)
- System Design (scalability, distributed systems, databases)
- CS Theory (OS, DBMS, Computer Networks, OOPS)
- Behavioral / HR interviews (STAR method, leadership principles)

Always respond in pure plaintext. DO NOT use any markdown formatting (no asterisks **, no hashes ##). Use basic newlines for separation. Keep answers focused and FAANG-relevant.`;

/* ─── helper: single-turn ─── */
async function llamaChat(prompt) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: FAANG_COACH_SYSTEM },
      { role: "user", content: prompt }
    ],
    model: DEFAULT_MODEL,
    temperature: 0.5,
    max_tokens: 1024,
  });
  return completion.choices[0].message.content;
}

/* ─────────────────────────────────────────
   POST /api/ai/dsa-explain
   Body: { title, statement, example, topic }
───────────────────────────────────────── */
router.post("/dsa-explain", async (req, res) => {
  const { title, statement, example, topic } = req.body;

  const prompt = `You are an expert FAANG interview coach specialising in Data Structures & Algorithms.

Explain the following DSA problem in detail for a FAANG interview candidate.

Problem: ${title}
Topic: ${topic}
Statement: ${statement}
Example: ${example}

Provide EXTREMELY BRIEF and CONCISE response (MAX 50 WORDS TOTAL):
1. Problem breakdown (1 sentence)
2. Optimal approach (2 short points)
3. Time & Space complexity
4. 1 Common pitfall

Use pure plaintext without any markdown formatting.`;

  try {
    const reply = await llamaChat(prompt);
    res.json({ explanation: reply });
  } catch (err) {
    console.error("DSA explain error:", err.message);
    res.status(500).json({ error: "Groq request failed", details: err.message });
  }
});

/* ─────────────────────────────────────────
   POST /api/ai/dsa-evaluate
   Body: { title, statement, topic, code, language, type }
───────────────────────────────────────── */
router.post("/dsa-evaluate", async (req, res) => {
  const { title, statement, topic, code, language, type } = req.body;

  const prompt = `You are a senior software engineer conducting a FAANG coding interview.

Evaluate the following ${language} solution.

Problem: ${title}
Topic: ${topic}
Description: ${statement}

Candidate's Code (${language}):
\`\`\`${language}
${code}
\`\`\`

Evaluation type: ${type === "Submit" ? "Full submission review" : "Quick run / sanity check"}

${type === "Submit"
  ? `Respond in pure plaintext with these exact sections. YOU MUST INVENT 3 SPECIFIC TEST CASES with concrete Input/Output data (do not just say "Test 1 Passed", write the actual input numbers/strings/arrays). DO NOT USE MARKDOWN:

TEST CASES
Total cases passed: [Number]/3
- Case 1 (Basic)
  Input: [...]
  Expected Output: [...]
  Actual Output: [...]
  Result: [Passed/Failed]
- Case 2 (Edge case)
  Input: [...]
  Expected Output: [...]
  Actual Output: [...]
  Result: [Passed/Failed]
- Case 3 (Large input)
  Input: [...]
  Expected Output: [...]
  Actual Output: [...]
  Result: [Passed/Failed]

COMPLEXITY
- Time Complexity: O(?)
- Space Complexity: O(?)

PERFORMANCE
- Estimated Runtime: ~?ms (Beats ~?%)

FINAL VERDICT
[Accepted or Wrong Answer] — [One sentence reason]

SUGGESTIONS
- [One precise improvement idea]`
  : `Respond in pure plaintext (no markdown formatting) with:

RUN RESULT
- Correctness: Brief assessment
- Time Complexity: O(?)
- Space Complexity: O(?)
- Bugs / Issues: Any syntax or logic errors found
- Improvements: 1-2 short points
- Score: X / 100`
}

Be specific — reference the actual code the candidate wrote.`;

  try {
    const reply = await llamaChat(prompt);
    res.json({ feedback: reply });
  } catch (err) {
    console.error("DSA evaluate error:", err.message);
    res.status(500).json({ error: "Groq request failed", details: err.message });
  }
});

/* ─────────────────────────────────────────
   POST /api/ai/system-design-explain
   Body: { title, description, difficulty, functionalRequirements, nonFunctionalRequirements }
───────────────────────────────────────── */
router.post("/system-design-explain", async (req, res) => {
  const { title, description, difficulty, functionalRequirements, nonFunctionalRequirements } = req.body;

  const prompt = `You are a principal engineer at a FAANG company with deep expertise in distributed systems and system design interviews.

Give a structured interview-preparation guide for the following system design problem.

Problem: ${title} (${difficulty})
Context: ${description}
Functional Requirements: ${(functionalRequirements || []).join(", ")}
Non-Functional Requirements: ${(nonFunctionalRequirements || []).join(", ")}

Cover BRIEFLY (MAX 60 WORDS TOTAL):
1. Capacity estimates (1 line)
2. High-level architecture (2 lines)
3. Database & Scalability (2 lines)
4. 1 Key trade-off

Use pure plaintext without any markdown formatting.`;

  try {
    const reply = await llamaChat(prompt);
    res.json({ explanation: reply });
  } catch (err) {
    console.error("SD explain error:", err.message);
    res.status(500).json({ error: "Groq request failed", details: err.message });
  }
});

/* ─────────────────────────────────────────
   POST /api/ai/system-design-evaluate
   Body: { title, description, answer }
───────────────────────────────────────── */
router.post("/system-design-evaluate", async (req, res) => {
  const { title, description, answer } = req.body;

  const prompt = `You are a principal engineer interviewing a candidate for a senior role at a FAANG company.

Evaluate this system design answer.

Problem: ${title}
Problem Context: ${description}

Candidate's Answer:
"""
${answer}
"""

Provide EXTREMELY SHORT feedback (MAX 60 WORDS TOTAL):
1. Strengths & Gaps (2 points)
2. Architecture & Scalability review (1 sentence)
3. Score out of 100

Use pure plaintext without any markdown formatting.`;

  try {
    const reply = await llamaChat(prompt);
    res.json({ feedback: reply });
  } catch (err) {
    console.error("SD evaluate error:", err.message);
    res.status(500).json({ error: "Groq request failed", details: err.message });
  }
});

/* ─────────────────────────────────────────
   POST /api/ai/theory-explain
   Body: { question, options, correctOptionIndex, selectedOptionIndex, explanation }
───────────────────────────────────────── */
router.post("/theory-explain", async (req, res) => {
  const { question, options, correctOptionIndex, selectedOptionIndex, explanation } = req.body;

  const isCorrect = selectedOptionIndex === correctOptionIndex;
  const correctAnswer = options[correctOptionIndex];
  const selectedAnswer = options[selectedOptionIndex];

  const prompt = `You are an expert CS educator helping candidates prepare for FAANG technical interviews.

A candidate answered a theory MCQ ${isCorrect ? "correctly " : "incorrectly "}.

Question: ${question}
Correct Answer: ${correctAnswer}
Candidate Selected: ${selectedAnswer}
Basic Explanation: ${explanation}

Provide a VERY BRIEF, punchy explanation (MAX 40 WORDS TOTAL):
1. Why "${correctAnswer}" is correct or "${selectedAnswer}" is wrong (1 sentence)
2. The concept in 1 sentence
3. A quick memory trick

Use pure plaintext without any markdown formatting.`;

  try {
    const reply = await llamaChat(prompt);
    res.json({ explanation: reply });
  } catch (err) {
    console.error("Theory explain error:", err.message);
    res.status(500).json({ error: "Groq request failed", details: err.message });
  }
});

/* ─────────────────────────────────────────
   POST /api/ai/chat
   Body: { messages: [{role, content}] }
   Multi-turn chat using Groq
───────────────────────────────────────── */
router.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  try {
    const formattedMessages = [
      { role: "system", content: FAANG_COACH_SYSTEM },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: DEFAULT_MODEL,
      temperature: 0.5,
      max_tokens: 1024,
    });
    
    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Groq request failed", details: err.message });
  }
});

/* ─────────────────────────────────────────
   POST /api/ai/suggestions
   Body: { dsa, theory, systemDesign, bookmarks, overallScore }
───────────────────────────────────────── */
router.post("/suggestions", async (req, res) => {
  const { dsa = 0, theory = 0, systemDesign = 0, bookmarks = 0, overallScore = 0 } = req.body;

  const prompt = `You are an elite FAANG interview coach reviewing a student's progress.

Student Progress:
- DSA problems solved: ${dsa}
- Theory MCQs answered: ${theory}
- System Design submissions: ${systemDesign}
- Bookmarked questions: ${bookmarks}
- Overall score: ${overallScore}%

Give 4-5 personalised, actionable study suggestions.
Each suggestion should reference their actual numbers and give a concrete next step.
Be motivating and FAANG-interview focused.
Use pure plaintext without any markdown formatting (no asterisks (**), no hashes (##)).`;

  try {
    const reply = await llamaChat(prompt);
    res.json({ suggestions: reply });
  } catch (err) {
    console.error("Suggestions error:", err.message);
    res.status(500).json({ error: "Groq request failed", details: err.message });
  }
});

export default router;
