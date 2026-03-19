import { useState, useEffect } from "react";
import axios from "axios";

/* ===============================
   SYSTEM DESIGN COMPONENT
   =============================== */
function SystemDesign() {
  const [questions, setQuestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [bookmarkedTitles, setBookmarkedTitles] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(1200); // Initialize with default
  const [isPaused, setIsPaused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // Get time limit based on difficulty (in seconds)
  const getTimeLimit = (difficulty) => {
    const timeLimits = {
      Easy: 20 * 60,     // 20 minutes
      Medium: 40 * 60,   // 40 minutes
      Hard: 60 * 60      // 60 minutes
    };
    return timeLimits[difficulty] || 1200;
  };

  // Fetch all questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/system-design`);
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch system design questions:", err);
        setLoading(false);
      }
    };
    fetchQuestions();
    const uId = localStorage.getItem("userId") || "guest";
    const bms = JSON.parse(localStorage.getItem(`bookmarkedQuestions_${uId}`) || "[]");
    setBookmarkedTitles(new Set(bms.map(b => b.title)));
  }, []);

  // Reset form and generate AI explanation when question changes
  useEffect(() => {
    setAnswer("");
    setFeedback("");
    setSubmitted(false);
    setShowNotification(false); // Always clear notification first
    if (selectedIndex >= 0) {
      generateExplanation();
      // Reset timer
      const initialTime = getTimeLimit(questions[selectedIndex]?.difficulty);
      setTimeRemaining(initialTime);
      setIsPaused(false);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [selectedIndex]);

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

  const generateExplanation = async () => {
    const problem = questions[selectedIndex];
    if (!problem) return;
    setIsExplaining(true);
    setExplanation("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/system-design-explain`, {
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        functionalRequirements: problem.functionalRequirements,
        nonFunctionalRequirements: problem.nonFunctionalRequirements,
      });
      setExplanation(res.data.explanation);
    } catch (err) {
      setExplanation("⚠️ AI explanation unavailable. Please try again.");
      console.error(err);
    } finally {
      setIsExplaining(false);
    }
  };

  const submitDesign = async () => {
    if (!answer.trim()) {
      setFeedback("Please write your system design before submitting!");
      return;
    }
    setIsEvaluating(true);
    setIsPaused(true);
    setSubmitted(true);
    try {
      const problem = questions[selectedIndex];
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/system-design-evaluate`, {
        title: problem.title,
        description: problem.description,
        answer,
      });
      setFeedback(res.data.feedback);
      
      const uId = localStorage.getItem("userId") || "guest";
      
      // 1. Recent Activity
      const actKey = `recentActivity_${uId}`;
      const activity = JSON.parse(localStorage.getItem(actKey) || "[]");
      activity.unshift({ type: "System Design", question: problem.title, timestamp: new Date().toLocaleString() });
      localStorage.setItem(actKey, JSON.stringify(activity.slice(0, 20)));

      // 2. Track Solved & Progress Stats
      const solvedKey = `solvedProblems_${uId}`;
      const solvedList = JSON.parse(localStorage.getItem(solvedKey) || "[]");
      
      if (!solvedList.includes(problem.title)) {
        solvedList.push(problem.title);
        localStorage.setItem(solvedKey, JSON.stringify(solvedList));
        
        // Update global System Design stat
        const statsKey = `userStats_${uId}`;
        const currentStats = JSON.parse(localStorage.getItem(statsKey) || '{"dsa":0,"theory":0,"systemDesign":0}');
        currentStats.systemDesign = (currentStats.systemDesign || 0) + 1;
        localStorage.setItem(statsKey, JSON.stringify(currentStats));

        // Update Company-wise stat (randomly assigned since SD lacks company tags)
        const compKey = `companyWiseProgress_${uId}`;
        const compProg = JSON.parse(localStorage.getItem(compKey) || '{"dsa":{},"systemDesign":{},"theory":{}}');
        const companies = ["google", "amazon", "microsoft", "facebook", "apple", "netflix"];
        const rndComp = companies[Math.floor(Math.random() * companies.length)];
        compProg.systemDesign[rndComp] = (compProg.systemDesign[rndComp] || 0) + 1;
        localStorage.setItem(compKey, JSON.stringify(compProg));
      }

    } catch (err) {
      setFeedback("⚠️ AI evaluation unavailable. Please try again.");
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex < questions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const toggleBookmark = () => {
    const problem = questions[selectedIndex];
    if (!problem) return;
    const uId = localStorage.getItem("userId") || "guest";
    const key = `bookmarkedQuestions_${uId}`;
    const bms = JSON.parse(localStorage.getItem(key) || "[]");
    
    const exists = bms.some(b => b.title === problem.title);
    let updated;
    if (exists) {
      updated = bms.filter(b => b.title !== problem.title);
    } else {
      updated = [{ title: problem.title, section: "System Design", difficulty: problem.difficulty }, ...bms];
    }
    
    localStorage.setItem(key, JSON.stringify(updated));
    setBookmarkedTitles(new Set(updated.map(b => b.title)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p>Loading system design questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">No system design questions available</p>
        </div>
      </div>
    );
  }

  const problem = questions[selectedIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-slate-100">
      {/* TIME'S UP NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-lg shadow-2xl font-bold text-xl z-50">
          Time's up!
        </div>
      )}

      {/* TIMER DISPLAY */}
      {selectedIndex >= 0 && (
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
        <h1 className="text-3xl font-bold">
          System Design Practice
        </h1>
        <p className="text-slate-300 mt-2">
          Design real-world systems used by FAANG companies
        </p>
      </div>

      {/* QUESTION SELECTOR */}
      <div className="max-w-6xl mx-auto bg-slate-800/90 p-6 rounded-2xl shadow-xl mb-8">

        <select
          value={selectedIndex}
          onChange={(e) => {
            setSelectedIndex(Number(e.target.value));
            setAnswer("");
            setFeedback("");
            setSubmitted(false);
          }}
          className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
        >
          <option value={-1}>Select Question </option>
          {questions.map((q, index) => (
            <option key={index} value={index}>
              {index + 1}. {q.title} ({q.difficulty})
            </option>
          ))}
        </select>
      </div>

      {/* SHOW MESSAGE IF NO QUESTION SELECTED */}
      {selectedIndex === -1 ? (
        <div className="max-w-5xl mx-auto text-center py-20">

        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          {/* PROBLEM DESCRIPTION */}
          <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-indigo-400 flex-1">
                {problem.title}
              </h2>
              <div className="flex items-center gap-4 ml-4">
                <button onClick={toggleBookmark} className="text-2xl hover:scale-110 transition flex-shrink-0">
                  {bookmarkedTitles.has(problem.title) ? (
                    <svg className="w-8 h-8 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ) : (
                    <svg className="w-8 h-8 text-slate-500 hover:text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  )}
                </button>
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-sm">
                  {problem.difficulty}
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {problem.description}
            </p>

            {/* FUNCTIONAL REQUIREMENTS */}
            {problem.functionalRequirements && problem.functionalRequirements.length > 0 && (
              <div className="mb-6 pb-6 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                  Functional Requirements
                </h3>
                <ul className="space-y-2">
                  {problem.functionalRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-indigo-400 mt-1"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* NON-FUNCTIONAL REQUIREMENTS */}
            {problem.nonFunctionalRequirements && problem.nonFunctionalRequirements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                  Non-Functional Requirements
                </h3>
                <ul className="space-y-2">
                  {problem.nonFunctionalRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-orange-400 mt-1"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AI EXPLANATION */}
          {explanation && (
            <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">AI Explanation</h3>
              <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{explanation}</p>
            </div>
          )}

          {/* AI Thinking indicator */}
          {isExplaining && (
            <div className="bg-slate-800/90 p-6 rounded-2xl shadow-xl mb-8 flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-400"></div>
              <span className="text-slate-300 text-sm">AI is generating explanation...</span>
            </div>
          )}

          {/* ANSWER INPUT */}
          <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Your System Design</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isEvaluating}
              placeholder="Write your system design here. Include:&#10;- High-level architecture&#10;- Database schema&#10;- Scalability approach&#10;- Trade-offs and considerations&#10;- Load estimations"
              className="w-full h-64 bg-slate-900 text-slate-100 p-4 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none disabled:opacity-50"
            />
            <p className="text-slate-400 text-xs mt-2">
              {answer.split(" ").length} words
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={submitDesign}
            disabled={isEvaluating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 py-3 rounded-lg font-semibold text-white transition mb-8"
          >
            {isEvaluating ? "Evaluating..." : "Submit"}
          </button>

          {/* AI FEEDBACK */}
          {feedback && (
            <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-lg font-semibold text-indigo-400 mb-4"> AI Evaluation Feedback</h3>
              <p className="text-slate-200 whitespace-pre-wrap">{feedback}</p>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-4">
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
      )}

    </div>
  );
}

export default SystemDesign;
