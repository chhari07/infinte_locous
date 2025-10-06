import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/login");
    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded-t-2xl   ">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign up to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
