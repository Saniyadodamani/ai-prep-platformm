import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { company, difficulty } = req.query;

    let filter = {};

    if (company) filter.company = company;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter);

    res.json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;