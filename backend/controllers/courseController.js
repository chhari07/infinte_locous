import Course from "../models/Course.js";
import  Feedback  from "../models/Feedback.js";

// Create Course (Admin only)
export const createCourse = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const course = await Course.create({ title, description, image });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses with avg rating
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    const result = await Promise.all(
      courses.map(async (course) => {
        const feedbacks = await Feedback.find({ course: course._id });
        const avgRating =
          feedbacks.length > 0
            ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length
            : 0;
        return { ...course._doc, avgRating };
      })
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Course (Admin only)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
