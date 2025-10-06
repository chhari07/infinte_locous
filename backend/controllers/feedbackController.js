import Feedback from "../models/Feedback.js";
import Course from "../models/Course.js";

// Submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    if (!courseId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const feedback = new Feedback({
      student: req.user.id,
      course: courseId,
      rating,
      comment,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    console.error("Submit feedback error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get feedback stats for a single course (admin only)
export const getFeedbackStats = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate ObjectId
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const feedbacks = await Feedback.find({ course: courseId });
    if (!feedbacks.length) return res.json({ avgRating: 0, ratingDistribution: {} });

    const ratingDistribution = {};
    let total = 0;

    feedbacks.forEach((f) => {
      total += f.rating;
      ratingDistribution[f.rating] = (ratingDistribution[f.rating] || 0) + 1;
    });

    const avgRating = total / feedbacks.length;
    const course = await Course.findById(courseId);

    res.json({ courseId, courseName: course.title, avgRating, ratingDistribution });
  } catch (err) {
    console.error("Get feedback stats error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get feedback stats for all courses (analytics) (admin only)
export const getAllFeedbackStats = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const courses = await Course.find();

    const analytics = courses.map(course => {
      const courseFeedbacks = feedbacks.filter(f => f.course.toString() === course._id.toString());
      const totalRating = courseFeedbacks.reduce((acc, f) => acc + f.rating, 0);
      const avgRating = courseFeedbacks.length ? totalRating / courseFeedbacks.length : 0;

      const ratingDistribution = {};
      courseFeedbacks.forEach(f => {
        ratingDistribution[f.rating] = (ratingDistribution[f.rating] || 0) + 1;
      });

      return {
        courseId: course._id,
        courseName: course.title,
        avgRating,
        ratingDistribution,
      };
    });

    res.json(analytics);
  } catch (err) {
    console.error("Get all feedback stats error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
