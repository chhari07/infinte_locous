import { Link } from "react-router-dom";

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome, Admin 
      </h2>
      <p className="text-gray-600 mb-6">
        Manage courses and analyze student feedback data.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/manage-courses"
          className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition"
        >
          Manage Courses
        </Link>
        <Link
          to="/view-feedbacks"
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
        >
          View Analytics
        </Link>
      </div>

      <div className="mt-8 text-gray-500 text-sm">
        © 2025 Student Feedback System. All rights reserved.
      </div>
    </div>
  </div>
);

export default AdminDashboard;
