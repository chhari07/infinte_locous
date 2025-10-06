import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // new field for course image URL
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
