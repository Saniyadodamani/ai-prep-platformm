import express from "express";
import SystemDesignQuestion from "../models/SystemDesign.js";

const router = express.Router();

// Get all categories/topics
router.get("/topics", async (req, res) => {
  try {
    const topics = await SystemDesignQuestion.distinct("category");
    res.json(topics.filter((t) => t)); // Filter out null/undefined
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get questions by category/topic
router.get("/topic/:topic", async (req, res) => {
  try {
    const questions = await SystemDesignQuestion.find({ category: req.params.topic }).sort({ difficulty: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all system design questions
router.get("/", async (req, res) => {
  try {
    const questions = await SystemDesignQuestion.find().sort({ difficulty: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await SystemDesignQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get questions by difficulty
router.get("/difficulty/:difficulty", async (req, res) => {
  try {
    const questions = await SystemDesignQuestion.find({
      difficulty: req.params.difficulty
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
