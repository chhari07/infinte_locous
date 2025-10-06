import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { BookOpen, ClipboardList, CheckCircle } from "lucide-react";

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    pendingFeedbacks: 0,
    completedFeedbacks: 0,
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, coursesRes] = await Promise.all([
          axiosInstance.get("/students/dashboard-stats"),
          axiosInstance.get("/students/courses"),
        ]);
        setStats(statsRes.data || {});
        setCourses(coursesRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Loading state
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg animate-pulse">
        Loading your dashboard...
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50    text-gray-800">
      {/* Hero Section */}
      <section className=" rounded-b-4xl    bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 text-white py-16 px-6 text-center shadow-md">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome, Student 
        </h1>
        <p className="text-lg mb-6 opacity-90">
          Track your enrolled courses, manage feedback, and monitor progress.
        </p>
        <Link
          to="/courses"
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-md"
        >
          Browse Courses
        </Link>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          {
            icon: <BookOpen size={40} />,
            value: stats.coursesEnrolled,
            label: "Courses Enrolled",
            color: "from-blue-500 to-indigo-500",
          },
          {
            icon: <ClipboardList size={40} />,
            value: stats.pendingFeedbacks,
            label: "Pending Feedbacks",
            color: "from-yellow-400 to-orange-500",
          },
          {
            icon: <CheckCircle size={40} />,
            value: stats.completedFeedbacks,
            label: "Completed Feedbacks",
            color: "from-green-500 to-emerald-500",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl text-white bg-gradient-to-r ${card.color} flex flex-col items-center justify-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300`}
          >
            {card.icon}
            <h3 className="text-3xl font-bold mt-3">{card.value}</h3>
            <p className="text-lg opacity-90 mt-1">{card.label}</p>
          </div>
        ))}
      </section>

      {/* Courses Section */}
      <section className="max-w-6xl mx-auto px-6 mt-14">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Your Courses
        </h2>

        {courses.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You’re not enrolled in any courses yet. Start learning today!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <img
                  src={
                    course.image
                      ? `${
                          import.meta.env.VITE_API_BASE_URL ||
                          "http://localhost:5000"
                        }/uploads/${course.image}`
                      : "https://images.unsplash.com/photo-1555529669-233948ba7b1d?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={course.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                      {course.name || "Untitled Course"}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {course.description || "No description available."}
                    </p>
                  </div>
                  <div className="mt-4">
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback Section */}
      <section className="max-w-6xl mx-auto px-6 mt-16 mb-12 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Feedback & Improvement
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Share your feedback for completed courses to help improve the learning
          experience for everyone.
        </p>
        
      </section>
    </div>
  );
};

export default StudentDashboard;
