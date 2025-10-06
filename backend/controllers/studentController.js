import Course from "../models/Course.js";
import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

// Example: dashboard stats (dummy + real data mix)
export const getDashboardStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalFeedbacks = await Feedback.countDocuments();

    res.json({
      success: true,
      stats: {
        totalCourses,
        totalStudents,
        totalFeedbacks,
        message: "Dashboard stats fetched successfully",
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Example: get all courses (student view)
export const getStudentCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
