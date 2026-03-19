import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, TrendingUp, BookOpen, Code, Bookmark, Activity, BarChart3, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loginDates, setLoginDates] = useState([]);
  const [stats, setStats] = useState({ dsa: 0, theory: 0, systemDesign: 0 });
  const [userName, setUserName] = useState('User');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [companyWiseProgress, setCompanyWiseProgress] = useState({
    dsa: { google: 0, amazon: 0, microsoft: 0, facebook: 0, apple: 0, netflix: 0 },
    systemDesign: { google: 0, amazon: 0, microsoft: 0, facebook: 0, apple: 0, netflix: 0 },
    theory: { google: 0, amazon: 0, microsoft: 0, facebook: 0, apple: 0, netflix: 0 }
  });
  const [totalSolved, setTotalSolved] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  // AI Suggestions
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const loadData = useCallback(() => {
    const savedLoginDates = localStorage.getItem(`loginDates_${localStorage.getItem('userId') || 'guest'}`);
    const savedStats = localStorage.getItem(`userStats_${localStorage.getItem('userId') || 'guest'}`);
    const savedBookmarks = localStorage.getItem(`bookmarkedQuestions_${localStorage.getItem('userId') || 'guest'}`);
    const savedActivity = localStorage.getItem(`recentActivity_${localStorage.getItem('userId') || 'guest'}`);
    const savedCompanyProgress = localStorage.getItem(`companyWiseProgress_${localStorage.getItem('userId') || 'guest'}`);

    // Get name from profile data
    let name = 'User';
    try {
      const uId = localStorage.getItem('userId') || 'guest';
      const fallbackName = localStorage.getItem(`userName_${uId}`);
      if (fallbackName && fallbackName !== "User") {
        name = fallbackName;
      } else {
        const profileData = JSON.parse(localStorage.getItem(`profileData_${uId}`) || '{}');
        if (profileData && profileData.firstName) name = profileData.firstName;
      }
    } catch { /* ignore */ }

    if (savedLoginDates) {
      setLoginDates(JSON.parse(savedLoginDates));
    } else {
      setLoginDates([]);
    }

    if (savedStats) {
      const s = JSON.parse(savedStats);
      setStats(s);
    } else {
      setStats({ dsa: 0, theory: 0, systemDesign: 0 });
    }

    const savedSolved = localStorage.getItem(`solvedProblems_${localStorage.getItem('userId') || 'guest'}`);
    let solvedCount = 0;
    if (savedSolved) {
      const arr = JSON.parse(savedSolved);
      solvedCount = arr.length;
    }
    setTotalSolved(solvedCount);
    setOverallScore(Math.round(Math.min(100, (solvedCount / 405) * 100)));

    setUserName(name);
    if (savedBookmarks) {
      setBookmarkedQuestions(JSON.parse(savedBookmarks));
    } else {
      setBookmarkedQuestions([]);
    }
    if (savedActivity) {
      setRecentActivity(JSON.parse(savedActivity).slice(0, 6));
    } else {
      setRecentActivity([]);
    }
    if (savedCompanyProgress) {
      const parsed = JSON.parse(savedCompanyProgress);
      setCompanyWiseProgress(prev => ({
        dsa: { ...prev.dsa, ...(parsed.dsa || {}) },
        systemDesign: { ...prev.systemDesign, ...(parsed.systemDesign || {}) },
        theory: { ...prev.theory, ...(parsed.theory || {}) }
      }));
    } else {
      setCompanyWiseProgress({
        dsa: { google: 0, amazon: 0, microsoft: 0, facebook: 0, apple: 0, netflix: 0 },
        systemDesign: { google: 0, amazon: 0, microsoft: 0, facebook: 0, apple: 0, netflix: 0 },
        theory: { google: 0, amazon: 0, microsoft: 0, facebook: 0, apple: 0, netflix: 0 }
      });
    }
  }, []);

  useEffect(() => {
    // Always dark
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';

    loadData();
    trackLoginDate();

    // Reload on tab focus (picks up bookmark/activity changes from other pages)
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, [loadData]);

  const trackLoginDate = () => {
    const today = new Date().toDateString();
    setLoginDates(prev => {
      const updated = [...new Set([...prev, today])];
      localStorage.setItem(`loginDates_${localStorage.getItem('userId') || 'guest'}`, JSON.stringify(updated));
      return updated;
    });
  };

  /* ─── Fetch AI Suggestions ─── */
  const fetchAiSuggestions = async () => {
    setLoadingSuggestions(true);
    setSuggestionsVisible(true);
    setAiSuggestions('');
    try {
      const res = await axios.post('http://localhost:5000/api/ai/suggestions', {
        dsa: stats.dsa,
        theory: stats.theory,
        systemDesign: stats.systemDesign,
        bookmarks: bookmarkedQuestions.length,
        overallScore
      });
      setAiSuggestions(res.data.suggestions);
    } catch {
      // Fallback to local suggestions
      const local = [];
      if (stats.dsa < 10) local.push(' Try 5 more DSA problems from Google to build fundamentals.');
      if (stats.theory < 5) local.push(' Review OS & DBMS theory — these are frequently tested at FAANG.');
      if (stats.systemDesign < 2) local.push(' Start with URL Shortener in System Design — a classic entry point.');
      if (stats.dsa > 10 && stats.systemDesign < 3) local.push(' Great DSA progress! Balance with System Design practice.');
      if (overallScore >= 50) local.push(' You are halfway there! Keep the momentum going.');
      if (bookmarkedQuestions.length > 0) local.push(` You have ${bookmarkedQuestions.length} bookmarked questions — revisit them for revision.`);
      setAiSuggestions(local.join('\n\n') || ' Keep practicing daily to unlock more personalized suggestions!');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  /* ─── Calendar ─── */
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    return days;
  };
  const hasLogin = (date) => !date ? false : loginDates.includes(date.toDateString());
  const isToday = (date) => !date ? false : date.toDateString() === new Date().toDateString();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HEADER */}
      <div className="bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Welcome back, <span className="font-semibold text-white">{userName}</span>
          </p>
          <button
            onClick={loadData}
            className="text-xs text-gray-500 hover:text-gray-300 transition px-3 py-1 rounded-lg border border-gray-700 hover:border-gray-500"
          >
             Refresh Stats
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* OVERALL PROGRESS */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-gray-300">Keep grinding, you're doing amazing!</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold text-blue-300">{overallScore}%</div>
              <div className="text-sm mt-2 text-gray-300">Complete ({totalSolved} / 405 solved)</div>
            </div>
          </div>
          <div className="mt-4 w-full bg-blue-950 rounded-full h-3">
            <div className="bg-blue-400 h-3 rounded-full transition-all duration-500" style={{ width: `${overallScore}%` }} />
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div onClick={() => navigate('/dsa')} className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105">
            <Code size={24} className="text-blue-400 mb-3" />
            <h3 className="font-semibold text-lg">DSA Practice</h3>
            <p className="text-2xl font-bold text-blue-300 mt-1">{stats.dsa}</p>
            <p className="text-xs text-gray-400">Problems Solved</p>
          </div>
          <div onClick={() => navigate('/theory')} className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105">
            <BookOpen size={24} className="text-purple-400 mb-3" />
            <h3 className="font-semibold text-lg">Theory</h3>
            <p className="text-2xl font-bold text-purple-300 mt-1">{stats.theory}</p>
            <p className="text-xs text-gray-400">MCQs Answered</p>
          </div>
          <div onClick={() => navigate('/system-design')} className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105">
            <TrendingUp size={24} className="text-emerald-400 mb-3" />
            <h3 className="font-semibold text-lg">System Design</h3>
            <p className="text-2xl font-bold text-emerald-300 mt-1">{stats.systemDesign}</p>
            <p className="text-xs text-gray-400">Designs Submitted</p>
          </div>
          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6">
            <Bookmark size={24} className="text-orange-400 mb-3" />
            <h3 className="font-semibold text-lg">Bookmarks</h3>
            <p className="text-2xl font-bold text-orange-300 mt-1">{bookmarkedQuestions.length}</p>
            <p className="text-xs text-gray-400">Questions Saved</p>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* CALENDAR */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Calendar</h2>
              <div className="flex gap-1">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">←</button>
                <span className="px-2 py-1 text-xs font-semibold">{monthName}</span>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">→</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['S','M','T','W','T','F','S'].map((day, i) => (
                <div key={i} className="text-center font-bold text-xs py-1 text-gray-400">{day}</div>
              ))}
              {calendarDays.map((date, idx) => (
                <div key={idx} className={`aspect-square flex items-center justify-center rounded text-xs font-semibold transition-all ${!date ? 'opacity-0' : hasLogin(date) ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'} ${isToday(date) ? 'ring-2 ring-blue-500' : ''}`}>
                  {date && date.getDate()}
                </div>
              ))}
            </div>
            <div className="text-xs space-y-1 text-gray-400">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-600" /><span>Practice Day</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded ring-2 ring-blue-500" /><span>Today</span></div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold flex items-center gap-2"><Activity size={20} /> Recent Activity</h2>
              <button onClick={loadData} className="text-xs text-gray-500 hover:text-gray-300">↻</button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentActivity.length > 0 ? recentActivity.map((activity, idx) => (
                <div key={idx} className="bg-gray-700 p-2 rounded text-sm border-l-4 border-blue-500">
                  <p className="font-semibold text-xs text-blue-300">{activity.type}</p>
                  <p className="text-xs mt-0.5 text-gray-300">{activity.question}</p>
                  <p className="text-xs mt-0.5 text-gray-500">{activity.timestamp}</p>
                </div>
              )) : (
                <p className="text-sm text-gray-400">No recent activity. Start practicing!</p>
              )}
            </div>
          </div>

          {/* AI SUGGESTIONS — BUTTON TRIGGERED */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Zap size={20} className="text-yellow-400" /> AI Suggestions</h2>
            <button
              onClick={fetchAiSuggestions}
              disabled={loadingSuggestions}
              className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:text-gray-500 py-2 rounded-lg text-sm font-semibold transition mb-3"
            >
              {loadingSuggestions ? ' Generating...' : ' Get AI Suggestions'}
            </button>

            {suggestionsVisible && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {loadingSuggestions ? (
                  <div className="flex items-center gap-2 text-gray-400 text-sm py-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400" />
                    <span>AI is analyzing your progress...</span>
                  </div>
                ) : aiSuggestions ? (
                  aiSuggestions.split('\n\n').filter(Boolean).map((s, idx) => (
                    <div key={idx} className="bg-gray-700 border-l-4 border-yellow-500 p-2 rounded text-sm text-gray-200">
                      {s.replace(/[*#`_]+/g, '').trim()}
                    </div>
                  ))
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* COMPANY PROGRESS */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><BarChart3 size={24} /> Company-Wise Practice Track</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-blue-400">DSA Problems</h3>
              <div className="space-y-2">
                {Object.entries(companyWiseProgress.dsa || {}).map(([comp, count]) => (
                  <div key={comp}>
                    <div className="flex justify-between text-sm mb-1"><span className="capitalize text-gray-300">{comp}</span><span className="font-bold">{count}</span></div>
                    <div className="w-full h-2 rounded-full bg-gray-700">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min((count / 30) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-emerald-400">System Design</h3>
              <div className="space-y-2">
                {Object.entries(companyWiseProgress.systemDesign || {}).map(([comp, count]) => (
                  <div key={comp}>
                    <div className="flex justify-between text-sm mb-1"><span className="capitalize text-gray-300">{comp}</span><span className="font-bold">{count}</span></div>
                    <div className="w-full h-2 rounded-full bg-gray-700">
                      <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min((count / 30) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-purple-400">Theory Topics</h3>
              <div className="space-y-2">
                {Object.entries(companyWiseProgress.theory || {}).map(([comp, count]) => (
                  <div key={comp}>
                    <div className="flex justify-between text-sm mb-1"><span className="capitalize text-gray-300">{comp}</span><span className="font-bold">{count}</span></div>
                    <div className="w-full h-2 rounded-full bg-gray-700">
                      <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${Math.min((count / 30) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOOKMARKED QUESTIONS */}
        {bookmarkedQuestions.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bookmark size={24} className="text-yellow-400" /> Bookmarked Questions
              <span className="ml-auto text-sm font-normal text-gray-400">{bookmarkedQuestions.length} total</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedQuestions.map((q, idx) => (
                <div key={idx} className="bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-semibold text-sm text-gray-100">{q.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400 bg-gray-600 px-2 py-0.5 rounded">{q.section}</span>
                    {q.difficulty && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        q.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                        q.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}>{q.difficulty}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;