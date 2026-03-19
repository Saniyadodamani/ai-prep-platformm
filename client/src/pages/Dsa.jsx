import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

export default function DSA() {

  /* ================= STATE ================= */

  const [company, setCompany] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [language, setLanguage] = useState("");

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [bookmarkedTitles, setBookmarkedTitles] = useState(new Set());

  const [feedback, setFeedback] = useState("");
  const [explanation, setExplanation] = useState("");
  const [canNext, setCanNext] = useState(false);

  const [code, setCode] = useState("");
  const [savedCodes, setSavedCodes] = useState({}); // { [index]: codeString }
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRunClicked, setIsRunClicked] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(600); // Initialize with default
  const [isPaused, setIsPaused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // Get time limit based on difficulty (in seconds)
  const getTimeLimit = (diff) => {
    const timeLimits = {
      Easy: 10 * 60,     // 10 minutes
      Medium: 25 * 60,   // 25 minutes
      Hard: 40 * 60      // 40 minutes
    };
    return timeLimits[diff] || 600;
  };

  /* ================= CODE TEMPLATE ================= */

  const template = (lang) => {
    if (lang === "python") return "def solve():\n    pass";
    if (lang === "cpp") return "#include <iostream>\nint main(){\n}";
    if (lang === "c") return "#include <stdio.h>\nint main(){\n}";
    return "function solve(){\n}";
  };

  useEffect(() => {
    if (language) setCode(template(language));
  }, [language]);

  useEffect(() => {
    const uId = localStorage.getItem("userId") || "guest";
    const bms = JSON.parse(localStorage.getItem(`bookmarkedQuestions_${uId}`) || "[]");
    setBookmarkedTitles(new Set(bms.map(b => b.title)));
  }, []);

  /* ================= FETCH QUESTIONS ================= */

  useEffect(() => {
    const fetchQuestions = async () => {

      if (!company || !difficulty || !language) return;

      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/questions?company=${company}&difficulty=${difficulty}`
        );

        setQuestions(res.data || []);
        setIndex(0);
        setFeedback("");
        setExplanation("");
        setCanNext(false);
        setSavedCodes({});

      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [company, difficulty, language]);

  // Reset timer when questions load or any filter changes
  useEffect(() => {
    setShowNotification(false); // Always clear notification first
    if (questions.length > 0 && difficulty) {
      const initialTime = getTimeLimit(difficulty);
      setTimeRemaining(initialTime);
      setIsPaused(false);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [index, questions.length, difficulty, company, language]);

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

  const q = questions[index];

  // Load saved code when index changes, or use template
  useEffect(() => {
    if (questions.length > 0) {
      setCode(savedCodes[index] || template(language));
    }
  }, [index, language, questions.length]);

  /* ================= GENERATE EXPLANATION FOR QUESTION ================= */

  const generateExplanation = async () => {
    if (!q) return;
    setIsExplaining(true);
    setExplanation("");
    try {
      const res = await axios.post("http://localhost:5000/api/ai/dsa-explain", {
        title: q.title,
        statement: q.statement,
        example: q.example,
        topic: q.topic,
      });
      setExplanation(res.data.explanation);
    } catch (err) {
      setExplanation("⚠️ AI explanation unavailable. Please try again.");
      console.error(err);
    } finally {
      setIsExplaining(false);
    }
  };

  /* ================= AI EVALUATION BASED ON CODE ================= */

  const evaluate = async (type) => {
    if (!code.trim() || code === template(language)) {
      setFeedback("⚠️ Please write some code before evaluating.");
      return;
    }
    setIsEvaluating(true);
    setIsPaused(true);
    setFeedback("");
    try {
      const res = await axios.post("http://localhost:5000/api/ai/dsa-evaluate", {
        title: q.title,
        statement: q.statement,
        topic: q.topic,
        code,
        language,
        type,
      });
      setFeedback(res.data.feedback);
      if (type === "Run") {
        setCanNext(true);
        setIsRunClicked(true);
      }
      if (type === "Submit") {
        const uId = localStorage.getItem("userId") || "guest";
        
        // 1. Recent Activity
        const actKey = `recentActivity_${uId}`;
        const activity = JSON.parse(localStorage.getItem(actKey) || "[]");
        activity.unshift({ type: "DSA", question: q.title, timestamp: new Date().toLocaleString() });
        localStorage.setItem(actKey, JSON.stringify(activity.slice(0, 20)));

        // 2. Track Solved & Progress Stats
        const solvedKey = `solvedProblems_${uId}`;
        const solvedList = JSON.parse(localStorage.getItem(solvedKey) || "[]");
        
        if (!solvedList.includes(q.title)) {
          solvedList.push(q.title);
          localStorage.setItem(solvedKey, JSON.stringify(solvedList));
          
          // Update global DSA stat
          const statsKey = `userStats_${uId}`;
          const currentStats = JSON.parse(localStorage.getItem(statsKey) || '{"dsa":0,"theory":0,"systemDesign":0}');
          currentStats.dsa = (currentStats.dsa || 0) + 1;
          localStorage.setItem(statsKey, JSON.stringify(currentStats));

          // Update Company-wise stat
          if (q.company) {
            const compKey = `companyWiseProgress_${uId}`;
            const compProg = JSON.parse(localStorage.getItem(compKey) || '{"dsa":{},"systemDesign":{},"theory":{}}');
            const cLower = q.company.toLowerCase();
            compProg.dsa[cLower] = (compProg.dsa[cLower] || 0) + 1;
            localStorage.setItem(compKey, JSON.stringify(compProg));
          }
        }
      }
    } catch (err) {
      setFeedback("⚠️ AI evaluation unavailable. Please try again.");
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  /* ================= NAVIGATION & BOOKMARKS ================= */

  const toggleBookmark = () => {
    if (!q) return;
    const uId = localStorage.getItem("userId") || "guest";
    const key = `bookmarkedQuestions_${uId}`;
    const bms = JSON.parse(localStorage.getItem(key) || "[]");
    
    const exists = bms.some(b => b.title === q.title);
    let updated;
    if (exists) {
      updated = bms.filter(b => b.title !== q.title);
    } else {
      updated = [{ title: q.title, section: "DSA", difficulty: q.difficulty, company: q.company }, ...bms];
    }
    localStorage.setItem(key, JSON.stringify(updated));
    setBookmarkedTitles(new Set(updated.map(b => b.title)));
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setSavedCodes(prev => ({ ...prev, [index]: code }));
      setIndex(index + 1);
      setFeedback("");
      setExplanation("");
      setCanNext(false);
      setIsRunClicked(false);
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setSavedCodes(prev => ({ ...prev, [index]: code }));
      setIndex(index - 1);
      setFeedback("");
      setExplanation("");
      setCanNext(false);
      setIsRunClicked(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-slate-100">
      {/* TIME'S UP NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-lg shadow-2xl font-bold text-xl z-50">
          Time's up!
        </div>
      )}

      {/* TIMER DISPLAY */}
      {questions.length > 0 && difficulty && (
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
        <h1 className="text-3xl font-bold">DSA Problem Practice</h1>
        <p className="text-slate-300 mt-2">
          Practice Data Structures and Algorithms with company-specific problems
        </p>
      </div>

      {/* SELECTORS */}
      <div className="max-w-6xl mx-auto bg-slate-800/90 p-6 rounded-2xl shadow-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Company Selector */}
          <div>

            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            >
              <option value="">Select Company</option>
              <option>Facebook</option>
              <option>Amazon</option>
              <option>Apple</option>
              <option>Netflix</option>
              <option>Google</option>
              <option>Microsoft</option>
              <option>Meta</option>
              <option>Flipkart</option>
            </select>
          </div>

          {/* Difficulty Selector */}
          <div>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            >
              <option value="">Select Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Language Selector */}
          <div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            >
              <option value="">Select Language</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
            </select>
          </div>

        </div>
      </div>

      {/* NO QUESTIONS MESSAGE */}
      {company && difficulty && language && (
        isLoading ? (
          <div className="max-w-5xl mx-auto text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-slate-400 text-lg">Fetching questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="max-w-5xl mx-auto text-center py-20">
            <p className="text-slate-400 text-lg">No questions found for this combination</p>
          </div>
        ) : null
      )}

      {/* INITIAL STATE MESSAGE */}
      {(!company || !difficulty || !language) && (
        <div className="max-w-5xl mx-auto text-center py-20">

        </div>
      )}

      {/* QUESTION AREA */}
      {q && (
        <div className="max-w-5xl mx-auto">
          {/* QUESTION CARD */}
          <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-indigo-400 flex-1">
                Q{index + 1}: {q.title}
              </h2>
              <div className="flex items-center gap-4 ml-4">
                <button onClick={toggleBookmark} className="text-2xl hover:scale-110 transition flex-shrink-0">
                  {bookmarkedTitles.has(q.title) ? (
                    <svg className="w-8 h-8 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ) : (
                    <svg className="w-8 h-8 text-slate-500 hover:text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  )}
                </button>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm flex-shrink-0">
                    {q.company}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm flex-shrink-0 font-semibold ${q.difficulty === 'Easy'
                      ? 'bg-green-900 text-green-200'
                      : q.difficulty === 'Medium'
                        ? 'bg-yellow-900 text-yellow-200'
                        : 'bg-red-900 text-red-200'
                    }`}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm italic mb-4">
              Question {index + 1} of {questions.length}
            </p>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed">{q.statement}</p>
            </div>
            {q.example && (
              <div className="mt-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-xs font-semibold mb-2">Example:</p>
                <p className="text-slate-300 text-sm font-mono whitespace-pre-wrap">{q.example}</p>
              </div>
            )}
          </div>

          {/* EXPLANATION BUTTON */}
          <button
            onClick={generateExplanation}
            disabled={isExplaining}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 py-3 rounded-lg font-semibold mb-8 text-white transition"
          >
            {isExplaining ? "AI is thinking..." : "AI Explain Problem"}
          </button>

          {/* AI EXPLANATION */}
          {explanation && (
            <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                AI Explanation
              </h3>
              <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                {explanation}
              </pre>
            </div>
          )}

          {/* CODE EDITOR SECTION */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Write Your Code:</h3>
            <div className="border border-slate-700 rounded-lg overflow-hidden shadow-xl">
              <Editor
                height="400px"
                theme="vs-dark"
                language={language || "javascript"}
                value={code}
                onChange={(v) => setCode(v)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => evaluate("Run")}
              disabled={isEvaluating}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-700 disabled:text-slate-500 py-3 rounded-lg font-semibold transition"
            >
              {isEvaluating ? "Running..." : " Run Code"}
            </button>

            <button
              onClick={() => {
                if (isRunClicked) evaluate("Submit");
                else setFeedback("Please Run the code first before submitting.");
              }}
              disabled={isEvaluating}
              className={`flex-1 py-3 rounded-lg font-semibold transition text-white ${isRunClicked ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              {isEvaluating ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* FEEDBACK */}
          {feedback && (
            <div className="bg-slate-800/90 p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-lg font-semibold text-green-400 mb-4">
                AI Evaluation Result
              </h3>
              <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                {feedback}
              </pre>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-4 mb-8">
            <button
              disabled={index === 0}
              onClick={prevQuestion}
              className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-900 disabled:text-slate-600 py-3 rounded-lg font-semibold transition"
            >
              ← Back
            </button>

            <button
              disabled={index >= questions.length - 1}
              onClick={nextQuestion}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-900 disabled:text-slate-600 py-3 rounded-lg font-semibold transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}