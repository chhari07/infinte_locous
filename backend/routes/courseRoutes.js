import express from "express";
import {
  createCourse,
  getCourses,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin can create or delete courses
router.post("/", protect, adminOnly, createCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

// All logged-in users can get courses
router.get("/", protect, getCourses);

export default router;
