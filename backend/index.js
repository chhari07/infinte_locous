import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB connection
connectDB();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/students", studentRoutes);

// Serve frontend build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// SPA fallback: only serve index.html for routes NOT starting with /api
app.get((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 404 for unmatched API routes
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
