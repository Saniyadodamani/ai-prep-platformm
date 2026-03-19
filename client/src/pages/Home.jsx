import { Link } from "react-router-dom";

function Home() {
  return (
    <Link to="/login" className="block">
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 flex items-center justify-center px-8 cursor-pointer">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl w-full">

          {/* LEFT – VISUAL CARD */}
          <div className="flex justify-center">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 w-80 h-56 shadow-2xl rotate-[-6deg]">
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-400 rounded"></div>
                <div className="w-8 h-8 bg-blue-400 rounded"></div>
                <div className="w-8 h-8 bg-sky-400 rounded"></div>
                <div className="w-8 h-8 bg-cyan-400 rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="h-3 bg-slate-600 rounded w-3/4"></div>
                <div className="h-3 bg-slate-600 rounded w-2/3"></div>
                <div className="h-3 bg-slate-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* RIGHT – TEXT */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold text-slate-100 leading-tight">
                <span className="text-slate-200">InterviewIQ</span>
              <span className="text-indigo-400">-AI</span>
             
            </h1>

            <p className="mt-6 text-slate-300 text-lg max-w-xl">
              Practice coding, system design, and interviews
              with AI-driven feedback tailored for faang companies.
            </p>

            <p className="mt-10 text-slate-400 italic text-sm">
              Click anywhere to get started →
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default Home;
