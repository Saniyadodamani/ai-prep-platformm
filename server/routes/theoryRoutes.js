import express from "express";
import Theory from "../models/Theory.js";

const router = express.Router();

// Get all topics
router.get("/topics", async (req, res) => {
  try {
    const topics = await Theory.distinct("topic");
    res.json(topics.filter((t) => t)); // Filter out null/undefined
  } catch (err) {
    res.status(500).json({ message: "Error fetching topics", error: err.message });
  }
});

// Get questions by topic and difficulty
router.get("/topic/:topic/difficulty/:difficulty", async (req, res) => {
  try {
    const questions = await Theory.find({ 
      topic: req.params.topic,
      difficulty: req.params.difficulty 
    }).sort({ questionNumber: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
});

// Get all questions by topic
router.get("/topic/:topic", async (req, res) => {
  try {
    const questions = await Theory.find({ topic: req.params.topic }).sort({ questionNumber: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
});

// Get single question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Theory.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question", error: err.message });
  }
});

export default router;
