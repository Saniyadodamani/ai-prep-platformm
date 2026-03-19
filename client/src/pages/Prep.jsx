import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Prep() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [initials, setInitials] = useState("U");

  // Load profile avatar and name from localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem(`profileAvatar_${localStorage.getItem('userId') || 'guest'}`);
    if (savedAvatar) setAvatar(savedAvatar);

    try {
      const uId = localStorage.getItem('userId') || 'guest';
      const profileData = JSON.parse(localStorage.getItem(`profileData_${uId}`) || "{}");
      let first = profileData.firstName?.[0] ?? "";
      let last = profileData.lastName?.[0] ?? "";
      
      if (!first && !last) {
        const fallbackName = localStorage.getItem(`userName_${uId}`);
        if (fallbackName && fallbackName !== "User") {
          first = fallbackName[0];
        }
      }
      
      setInitials((first + last).toUpperCase() || "U");
    } catch {
      setInitials("U");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-slate-100">

      {/* =============================== STICKY TOP BAR =============================== */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex justify-end items-center">

        {/* RIGHT: PROFILE DROPDOWN */}
        <div className="relative group">
          <button className="flex items-center gap-2 text-slate-200 hover:text-indigo-400 transition">
            {/* Avatar circle */}
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold overflow-hidden ring-2 ring-indigo-400/40">
              {avatar
                ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                : <span>{initials}</span>
              }
            </div>
            <span className="hidden sm:block text-sm">My Profile</span>
          </button>

          {/* DROPDOWN */}
          <div className="absolute right-0 mt-3 w-40 bg-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded-t-xl"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
            >
              Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                navigate("/login");
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded-b-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* =============================== MAIN CONTENT =============================== */}
      <div className="px-8 py-16 pt-16">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-wide">
            InterviewIQ<span className="text-indigo-400">-AI</span>
          </h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Prepare for FAANG interviews with AI-powered practice
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* DSA CARD */}
          <div className="bg-slate-800/90 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4">DSA Interviews</h3>
            <p className="text-slate-300 mb-5">
              Practice Data Structures & Algorithms questions asked by FAANG companies.
            </p>
            <ul className="text-sm text-slate-400 space-y-2 mb-6">
              <li>• Arrays, Strings, HashMaps</li>
              <li>• Trees, Graphs, Dynamic Programming</li>
              <li>• Time & Space Complexity</li>
            </ul>
            <button
              type="button"
              onClick={() => navigate("/dsa")}
              className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded font-medium"
            >
              Start DSA Practice
            </button>
          </div>

          {/* SYSTEM DESIGN CARD */}
          <div className="bg-slate-800/90 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4">System Design</h3>
            <p className="text-slate-300 mb-5">
              Design scalable systems like Google, Amazon, and Netflix.
            </p>
            <ul className="text-sm text-slate-400 space-y-2 mb-6">
              <li>• High-level architecture</li>
              <li>• Scalability & trade-offs</li>
              <li>• Real FAANG case studies</li>
            </ul>
            <button
              type="button"
              onClick={() => navigate("/system-design")}
              className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded font-medium"
            >
              Start System Design
            </button>
          </div>

          {/* THEORY CARD */}
          <div className="bg-slate-800/90 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4">Theory & CS Basics</h3>
            <p className="text-slate-300 mb-5">
              Revise OS, DBMS, CN, OOPS, and HR interview questions.
            </p>
            <ul className="text-sm text-slate-400 space-y-2 mb-6">
              <li>• Operating Systems</li>
              <li>• DBMS & Computer Networks</li>
              <li>• OOPS & Behavioral</li>
            </ul>
            <button
              type="button"
              onClick={() => navigate("/theory")}
              className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded font-medium"
            >
              Start Theory Preparation
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Prep;
