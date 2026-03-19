import { useState, useEffect } from "react";
import axios from "axios";

function Theory() {
  const [topics, setTopics] = useState([]);
  const [difficulties] = useState(["Easy", "Medium", "Hard"]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // Initialize with default (1 min)
  const [isPaused, setIsPaused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [bookmarkedTitles, setBookmarkedTitles] = useState(new Set());

  // Get initial time based on difficulty (in seconds)
  const getTimeLimit = (difficulty) => {
    const timeLimits = {
      Easy: 1 * 60,      // 1 minute
      Medium: 3 * 60,    // 3 minutes
      Hard: 10 * 60      // 10 minutes
    };
    return timeLimits[difficulty] || 60;
  };

  // Fetch topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/theory/topics");
        setTopics(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
        setLoading(false);
      }
    };
    fetchTopics();
    const uId = localStorage.getItem("userId") || "guest";
    const bms = JSON.parse(localStorage.getItem(`bookmarkedQuestions_${uId}`) || "[]");
    setBookmarkedTitles(new Set(bms.map(b => b.title)));
  }, []);

  // Fetch questions when topic AND difficulty changes
  useEffect(() => {
    setSelectedIndex(-1);
    setSelectedAnswer(null);
    setExplanation("");
    setSubmitted(false);
    setScore(0);
    setAnsweredCount(0);

    if (!selectedTopic || !selectedDifficulty) {
      setQuestions([]);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/theory/topic/${selectedTopic}/difficulty/${selectedDifficulty}`
        );
        setQuestions(response.data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, [selectedTopic, selectedDifficulty]);

  // Reset and start timer when question index changes
  useEffect(() => {
    setShowNotification(false); // Always clear notification first
    if (selectedIndex >= 0 && selectedDifficulty) {
      const initialTime = getTimeLimit(selectedDifficulty);
      setTimeRemaining(initialTime);
      setIsPaused(false);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [selectedIndex, selectedDifficulty]);

  // Timer countdown effect
  useEffect(() => {
    if (!timerActive || isPaused || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setShowNotification(true);
          setTimerActive(false);
          setIsPaused(true);
          setTimeout(() => setShowNotification(false), 5000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, isPaused, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const generateExplanation = (question, isCorrect) => {
    const correctAnswer = question.options[question.correctOptionIndex];
    return `${isCorrect ? "Correct!" : "Incorrect"}\n\nCorrect Answer: ${correctAnswer}\n\nExplanation: ${question.explanation}`;
  };

  const submitAnswer = async () => {
    if (selectedAnswer === null) {
      setExplanation("Please select an answer before submitting!");
      return;
    }

    const question = questions[selectedIndex];
    const isCorrect = selectedAnswer === question.correctOptionIndex;

    if (isCorrect) setScore(score + 1);
    setAnsweredCount(answeredCount + 1);
    setIsPaused(true);
    setSubmitted(true);

    // Show basic explanation immediately
    const correctAnswer = question.options[question.correctOptionIndex];
    setExplanation(`${isCorrect ? "Correct!" : "Incorrect"}\n\nCorrect Answer: ${correctAnswer}\n\nLoading AI deep-dive explanation...`);

    // Fetch rich AI explanation
    setIsExplaining(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/theory-explain", {
        question: question.question,
        options: question.options,
        correctOptionIndex: question.correctOptionIndex,
        selectedOptionIndex: selectedAnswer,
        explanation: question.explanation,
      });
      setExplanation(res.data.explanation);
    } catch (err) {
      // Fall back to static explanation if AI fails
      setExplanation(`${isCorrect ? "Correct!" : "Incorrect"}\n\nCorrect Answer: ${correctAnswer}\n\nExplanation: ${question.explanation}`);
      console.error(err);
    } finally {
      setIsExplaining(false);

      const uId = localStorage.getItem("userId") || "guest";

      // 1. Recent Activity
      const actKey = `recentActivity_${uId}`;
      const activity = JSON.parse(localStorage.getItem(actKey) || "[]");
      activity.unshift({ type: "Theory", question: question.question, timestamp: new Date().toLocaleString() });
      localStorage.setItem(actKey, JSON.stringify(activity.slice(0, 20)));

      // 2. Track Solved & Progress Stats
      const solvedKey = `solvedProblems_${uId}`;
      const solvedList = JSON.parse(localStorage.getItem(solvedKey) || "[]");

      if (!solvedList.includes(question.question)) {
        solvedList.push(question.question);
        localStorage.setItem(solvedKey, JSON.stringify(solvedList));

        // Update global Theory stat
        const statsKey = `userStats_${uId}`;
        const currentStats = JSON.parse(localStorage.getItem(statsKey) || '{"dsa":0,"theory":0,"systemDesign":0}');
        currentStats.theory = (currentStats.theory || 0) + 1;
        localStorage.setItem(statsKey, JSON.stringify(currentStats));

        // Update Company-wise stat (randomly assigned since Theory lacks company tags)
        const compKey = `companyWiseProgress_${uId}`;
        const compProg = JSON.parse(localStorage.getItem(compKey) || '{"dsa":{},"systemDesign":{},"theory":{}}');
        const companies = ["google", "amazon", "microsoft", "facebook", "apple", "netflix"];
        const rndComp = companies[Math.floor(Math.random() * companies.length)];
        compProg.theory[rndComp] = (compProg.theory[rndComp] || 0) + 1;
        localStorage.setItem(compKey, JSON.stringify(compProg));
      }
    }
  };

  const goToNext = () => {
    if (selectedIndex < questions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedAnswer(null);
      setExplanation("");
      setSubmitted(false);
    }
  };

  const toggleBookmark = () => {
    const problem = selectedIndex >= 0 ? questions[selectedIndex] : null;
    if (!problem) return;
    const uId = localStorage.getItem("userId") || "guest";
    const key = `bookmarkedQuestions_${uId}`;
    const bms = JSON.parse(localStorage.getItem(key) || "[]");

    const exists = bms.some(b => b.title === problem.question);
    let updated;
    if (exists) {
      updated = bms.filter(b => b.title !== problem.question);
    } else {
      updated = [{ title: problem.question, section: "Theory", difficulty: problem.difficulty, topic: selectedTopic }, ...bms];
    }
    localStorage.setItem(key, JSON.stringify(updated));
    setBookmarkedTitles(new Set(updated.map(b => b.title)));
  };
  const goToPrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedAnswer(null);
      setExplanation("");
      setSubmitted(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p>Loading theory questions...</p>
        </div>
      </div>
    );
  }

  const problem = selectedIndex >= 0 ? questions[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-slate-100">
      {/* TIME'S UP NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-lg shadow-2xl font-bold text-xl z-50">
          Time's up!
        </div>
      )}

      {/* TIMER DISPLAY */}
      {selectedIndex >= 0 && selectedDifficulty && (
        <div className="fixed top-8 right-8 bg-indigo-600 px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-4 z-40">
          <span>{formatTime(timeRemaining)}</span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="bg-indigo-700 hover:bg-indigo-800 px-4 py-1 rounded text-sm font-semibold transition"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Theory & CS Fundamentals</h1>
        <p className="text-slate-300 mt-2">
          Practice MCQ questions from core CS topics
        </p>
      </div>

      {/* SELECTORS */}
      <div className="max-w-6xl mx-auto bg-slate-800/90 p-6 rounded-2xl shadow-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic Selector */}
          <div>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            >
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            >
              <option value="">Select Difficulty</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {selectedIndex === -1 && selectedTopic && selectedDifficulty ? (
        <div className="max-w-5xl mx-auto text-center py-20">

          <button
            onClick={() => setSelectedIndex(0)}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 py-3 px-8 rounded-lg font-semibold transition"
          >
            Start Quiz ({selectedTopic} - {selectedDifficulty})
          </button>
        </div>
      ) : selectedIndex === -1 ? (
        <div className="max-w-5xl mx-auto text-center py-20">

        </div>
      ) : problem ? (
        <div className="max-w-5xl mx-auto">
          {/* QUESTION CARD */}
          <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-indigo-400 flex-1">
                Q{selectedIndex + 1}: {problem.question}
              </h2>
              <div className="flex items-center gap-4 ml-4">
                <button onClick={toggleBookmark} className="text-2xl hover:scale-110 transition flex-shrink-0">
                  {bookmarkedTitles.has(problem.question) ? (
                    <svg className="w-8 h-8 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  ) : (
                    <svg className="w-8 h-8 text-slate-500 hover:text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  )}
                </button>
                <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm flex-shrink-0">
                  {problem.difficulty}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm italic">
              Question {selectedIndex + 1} of {questions.length}
            </p>
          </div>

          {/* OPTIONS */}
          <div className="space-y-3 mb-8">
            {problem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                disabled={isExplaining}
                className={`w-full p-4 rounded-xl text-left transition border-2 ${selectedAnswer === index
                  ? "border-indigo-500 bg-indigo-900/30"
                  : "border-slate-700 bg-slate-800/90 hover:border-indigo-500/50"
                  } ${isExplaining ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAnswer === index
                      ? "border-indigo-500 bg-indigo-500"
                      : "border-slate-600"
                      }`}
                  >
                    {selectedAnswer === index && (
                      <span className="text-white text-sm font-bold"></span>
                    )}
                  </div>
                  <span className="text-slate-300">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={submitAnswer}
            disabled={isExplaining}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 py-3 rounded-lg font-semibold mb-8 text-white transition"
          >
            {isExplaining ? "Evaluating..." : "Submit"}
          </button>

          {/* EXPLANATION */}
          {explanation && (
            <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                AI Explanation
              </h3>
              <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                {explanation}
              </p>
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={goToPrevious}
              disabled={selectedIndex === 0}
              className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-900 disabled:text-slate-600 py-3 rounded-lg font-semibold transition"
            >
              ← Back
            </button>
            <button
              onClick={goToNext}
              disabled={selectedIndex === questions.length - 1}
              className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-900 disabled:text-slate-600 py-3 rounded-lg font-semibold transition"
            >
              Next →
            </button>
          </div>
        </div>
      ) : selectedTopic && selectedDifficulty ? (
        <div className="max-w-5xl mx-auto text-center py-20">
          <p className="text-slate-400 text-lg">No questions available</p>
        </div>
      ) : null}
    </div>
  );
}

export default Theory;
