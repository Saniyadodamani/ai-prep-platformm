import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import systemDesignRoutes from "./routes/systemDesignRoutes.js";
import theoryRoutes from "./routes/theoryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

/* =========================
   CREATE EXPRESS APP FIRST
========================= */
const app = express();

/* =========================
   CONNECT DATABASE
========================= */
connectDB();

/* =========================
   MIDDLEWARE
========================= */
const allowedOrigins = [
   "https://ai-prep-platformm.vercel.app",
   "http://localhost:5173",
   process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
   origin: allowedOrigins,
   credentials: true
}));

app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/system-design", systemDesignRoutes);
app.use("/api/theory", theoryRoutes);
app.use("/api/ai", aiRoutes);

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
   res.send("Backend Working ");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT} `);
});