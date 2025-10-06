import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProctectdRoute";
import Navbar from "../components/Navbar";
import CourseList from "../pages/CourseList";
import CourseDetail from "../pages/CourseDetail"; // ✅ New page for course details
import FeedbackForm from "../pages/FeedbackForm";
import ManageCourses from "../pages/ManageCourse";
import ViewFeedbacks from "../pages/ViewFeedbacks";
import Home from "../pages/Home";
import Footer from "../components/Footer";

const AppRouter = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <ProtectedRoute role="student">
            <CourseList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute role="student">
            <CourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback/:courseId"
        element={
          <ProtectedRoute role="student">
            <FeedbackForm />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-courses"
        element={
          <ProtectedRoute role="admin">
            <ManageCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-feedbacks"
        element={
          <ProtectedRoute role="admin">
            <ViewFeedbacks />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route for unmatched paths */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen text-red-500 text-lg">
            404 | Page Not Found
          </div>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default AppRouter;
