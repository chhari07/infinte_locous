import { useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/login", form);
      login(data);
      navigate(
        data.role === "admin" ? "/admin-dashboard" : "/student-dashboard"
      );
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded-t-2xl">
      <div className="bg-white      rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
