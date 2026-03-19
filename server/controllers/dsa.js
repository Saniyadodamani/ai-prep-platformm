import { dsaQuestions } from "../data/questions.js";

export const getQuestion = (req, res) => {
  const { company, level, index } = req.body;

  const list = dsaQuestions[company]?.filter(q => q.level === level);
  if (!list || list.length === 0)
    return res.status(404).json({ error: "No questions found" });

  const question = list[index % list.length];
  res.json({ question });
};

export const evaluate = (req, res) => {
  const { code } = req.body;

  // AI Placeholder
  res.json({
    score: Math.floor(Math.random() * 40) + 60,
    feedback:
      "Good approach  Time complexity can be improved. Try optimizing loops."
  });
};
