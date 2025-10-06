// backend/routes/studentRoutes.js
import express from "express";
import Course from "../models/Course.js";
import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Route: GET /api/students/dashboard-stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalFeedbacks = await Feedback.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });

    res.json({
      totalCourses,
      totalFeedbacks,
      totalStudents,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

// ✅ Route: GET /api/students/courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to load courses" });
  }
});

export default router;
