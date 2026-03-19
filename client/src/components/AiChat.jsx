import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const SUGGESTED = [
  "How do I solve Two Sum optimally?",
  "Explain LRU Cache with code",
  "How to approach system design interviews?",
  "What is the STAR method for behavioral rounds?",
  "Difference between BFS and DFS?",
];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // [{role, content}]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const updated = [...messages, { role: "user", content: userText }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        messages: updated,
      });
      setMessages([...updated, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: " Sorry, I couldn't reach the AI. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ── FLOATING BUTTON ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-2xl shadow-indigo-900/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        title="Ask InterviewIQ-AI"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {/* unread dot */}
        {!open && messages.length === 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-950 animate-pulse" />
        )}
      </button>

      {/* ── CHAT PANEL ── */}
      <div className={`fixed bottom-24 right-6 z-[199] w-[360px] max-h-[540px] flex flex-col rounded-2xl shadow-2xl shadow-black/50 border border-slate-700/60 bg-slate-900 transition-all duration-300 origin-bottom-right ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>

        {/* header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/60 bg-slate-800/80 rounded-t-2xl">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">InterviewIQ-AI</p>
            <p className="text-[10px] text-green-400 font-medium">● Online · FAANG Coach</p>
          </div>
          <button
            onClick={() => { setMessages([]); }}
            className="ml-auto text-xs text-slate-500 hover:text-slate-300 transition"
            title="Clear chat"
          >
            Clear
          </button>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0 max-h-[380px] scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">

          {/* welcome */}
          {messages.length === 0 && (
            <div className="space-y-3">
              <div className="bg-slate-800 rounded-xl rounded-tl-none px-4 py-3 text-sm text-slate-300 leading-relaxed">
                 Hi! I'm your AI FAANG Interview Coach. Ask me anything about DSA, System Design, CS Theory, or Behavioral interviews!
              </div>
              <p className="text-[11px] text-slate-500 px-1">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-[11px] bg-slate-800 hover:bg-indigo-900/50 border border-slate-700 hover:border-indigo-500 text-slate-300 px-3 py-1.5 rounded-full transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* conversation */}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none whitespace-pre-wrap"
                    : "bg-slate-800 text-slate-200 rounded-bl-none"
                }`}
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}

          {/* typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 rounded-xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div className="px-4 py-3 border-t border-slate-700/60 bg-slate-800/60 rounded-b-2xl flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about DSA, System Design..."
            className="flex-1 resize-none bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-28 overflow-y-auto transition"
            style={{ lineHeight: "1.4" }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="w-9 h-9 flex-shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 flex items-center justify-center transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
