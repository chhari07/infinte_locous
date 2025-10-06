import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-white text-lg">
        Loading courses...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-black">
          Explore Our Courses
        </h2>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No courses available yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Course Image */}
                <div className="relative h-48">
                  <img
                    src={
                      course.image
                        ? `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/uploads/${course.image}`
                        : "https://images.unsplash.com/photo-1555529669-233948ba7b1d?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent hover:from-black/20 transition-all"></div>
                </div>

                {/* Course Info */}
                <div className="p-5 flex flex-col justify-between h-[220px]">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                      {course.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <span className="text-yellow-500 text-sm font-medium">
                      ⭐ {course.avgRating?.toFixed(1) || "No ratings yet"}
                    </span>

                    <Link
                      to={`/feedback/${course._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all"
                    >
                      Give Feedback
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
