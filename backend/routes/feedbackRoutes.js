import express from "express";
import { submitFeedback, getFeedbackStats, getAllFeedbackStats } from "../controllers/feedbackController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit feedback (any logged-in user)
router.post("/", protect, submitFeedback);

// Get feedback stats for a specific course (admin only)
router.get("/course/:courseId", protect, adminOnly, getFeedbackStats);

// Get analytics for all courses (admin only)
router.get("/analytics", protect, adminOnly, getAllFeedbackStats);

export default router;
