import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_FIELDS = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  graduationYear: "",
  jobProfile: "",
  college: "",
  degree: "",
  branch: "",
  city: "",
  github: "",
  linkedin: "",
  bio: "",
};

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(null); // base64 or null
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [saved, setSaved] = useState(false);
  const [viewingPic, setViewingPic] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const uId = localStorage.getItem("userId") || "guest";
    try {
      const savedData = localStorage.getItem(`profileData_${uId}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed && typeof parsed === 'object') {
          setFields(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      console.error(e);
    }
    const savedAvatar = localStorage.getItem(`profileAvatar_${uId}`);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  /* ─── avatar upload ─── */
  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  /* ─── form ─── */
  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const uId = localStorage.getItem("userId") || "guest";
    localStorage.setItem(`profileData_${uId}`, JSON.stringify(fields));
    if (avatar) localStorage.setItem(`profileAvatar_${uId}`, avatar);
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  /* ─── initials fallback ─── */
  const initials =
    ((fields?.firstName?.[0] ?? "") + (fields?.lastName?.[0] ?? "")) || "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-slate-100">

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/prep")}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Prep
        </button>

        <div className="w-20" />
      </div>

      {/* ── MAIN ── */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* ── AVATAR CARD ── */}
        <div className="flex flex-col items-center mb-10">
          {/* Round picture */}
          <div className={`relative group ${isEditing ? 'cursor-pointer' : ''}`} onClick={() => isEditing && handleAvatarClick()}>
            <div className="w-28 h-28 rounded-full ring-4 ring-indigo-500 shadow-2xl overflow-hidden bg-indigo-700 flex items-center justify-center text-4xl font-bold select-none">
              {avatar
                ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                : <span>{initials.toUpperCase()}</span>
              }
            </div>
            {/* Overlay on hover */}
            {isEditing && (
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-[10px] font-semibold">Change</span>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* View profile picture button */}
          {avatar && (
            <button
              onClick={() => setViewingPic(true)}
              className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 underline transition"
            >
              View Profile Picture
            </button>
          )}


        </div>

        {/* ── FORM ── */}
        <form onSubmit={handleSave} className="space-y-8">

          {/* Personal Details */}
          <Section title="Personal Details" icon="👤">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="First Name" name="firstName" value={fields.firstName} onChange={handleChange} placeholder="e.g. Arjun" disabled={!isEditing} />
              <Field label="Last Name" name="lastName" value={fields.lastName} onChange={handleChange} placeholder="e.g. Sharma" disabled={!isEditing} />
              <Field label="Email" name="email" value={fields.email} onChange={handleChange} placeholder="you@example.com" type="email" disabled={!isEditing} />
              <Field label="Contact" name="contact" value={fields.contact} onChange={handleChange} placeholder="+91 9876543210" type="tel" disabled={!isEditing} />
              <Field label="City" name="city" value={fields.city} onChange={handleChange} placeholder="e.g. Bangalore" disabled={!isEditing} />
            </div>
          </Section>

          {/* Academic Details */}
          <Section title="Academic Details" icon="🎓">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="College / University" name="college" value={fields.college} onChange={handleChange} placeholder="e.g. IIT Bombay" disabled={!isEditing} />
              <Field label="Degree" name="degree" value={fields.degree} onChange={handleChange} placeholder="e.g. B.Tech" disabled={!isEditing} />
              <Field label="Branch" name="branch" value={fields.branch} onChange={handleChange} placeholder="e.g. Computer Science" disabled={!isEditing} />
              <Field label="Graduation Year" name="graduationYear" value={fields.graduationYear} onChange={handleChange} placeholder="e.g. 2026" type="number" disabled={!isEditing} />
            </div>
          </Section>

          {/* Professional Details */}
          <Section title="Professional Details" icon="💼">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Job Profile / Role" name="jobProfile" value={fields.jobProfile} onChange={handleChange} placeholder="e.g. Software Engineer" disabled={!isEditing} />
              <Field label="GitHub" name="github" value={fields.github} onChange={handleChange} placeholder="github.com/username" disabled={!isEditing} />
              <Field label="LinkedIn" name="linkedin" value={fields.linkedin} onChange={handleChange} placeholder="linkedin.com/in/username" disabled={!isEditing} />
            </div>
            <div className="mt-5">
              <label className="block text-sm text-slate-400 mb-1 font-medium">Bio / About Me</label>
              <textarea
                name="bio"
                value={fields.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell a little about yourself..."
                className={`w-full border rounded-xl px-4 py-3 resize-none transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${!isEditing ? 'bg-slate-900 border-slate-800 text-slate-400 cursor-not-allowed' : 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500'}`}
              />
            </div>
          </Section>

          {/* Save button */}
          <div className="flex justify-end gap-3 mt-8">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-8 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/40 text-white"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    const uId = localStorage.getItem("userId") || "guest";
                    const savedData = localStorage.getItem(`profileData_${uId}`);
                    if (savedData) setFields(JSON.parse(savedData));
                  }}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium border border-slate-600 text-slate-300 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-500 transition shadow-lg shadow-green-900/40 text-white"
                >
                  {saved ? "Saved!" : "Save Profile"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* ── FULL-SCREEN PICTURE VIEWER ── */}
      {viewingPic && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setViewingPic(false)}
        >
          <div className="relative max-w-sm w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <img
              src={avatar}
              alt="Profile preview"
              className="rounded-3xl w-full shadow-2xl ring-4 ring-indigo-500"
            />
            <button
              onClick={() => setViewingPic(false)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-slate-800 border border-slate-600 text-slate-300 hover:text-white flex items-center justify-center text-lg transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── helpers ─── */
function Section({ title, icon, children }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
      <h2 className="text-base font-semibold text-indigo-300 mb-5 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text", disabled }) {
  return (
    <div>
      <label className="block text-sm text-slate-400 mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border rounded-xl px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${disabled ? 'bg-slate-900 border-slate-800 text-slate-400 cursor-not-allowed' : 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500'}`}
      />
    </div>
  );
}

export default Profile;
