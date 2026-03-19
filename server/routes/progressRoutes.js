import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const progress = await Progress.create(req.body);
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Error saving progress" });
  }
});

export default router;
