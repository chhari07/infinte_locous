import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white m-4 rounded-2xl shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/">
            <div className="text-2xl font-bold text-white">SFS</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6   items-center">
            {user?.role === "student" && (
              <>
                <Link className="hover:text-indigo-300 transition" to="/student-dashboard">
                  Dashboard
                </Link>
                <Link className="hover:text-indigo-300 transition" to="/courses">
                  Courses
                </Link>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <Link className="hover:text-indigo-300 transition" to="/admin-dashboard">
                  Dashboard
                </Link>
                <Link className="hover:text-indigo-300 transition" to="/manage-courses">
                  Manage Courses
                </Link>
                <Link className="hover:text-indigo-300 transition" to="/view-feedbacks">
                  View Feedbacks
                </Link>
              </>
            )}
            {user?.token ? (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 transition px-3 py-1 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="px-3 py-1    text-white    rounded-full hover:underline   transition" to="/">
                  Home
                </Link>
                <Link className="px-3 py-1 p-4    bg-blue-500 text-white rounded-full   hover:bg-blue-600 transition" to="/login">
                  Login
                </Link>
                <Link className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition" to="/register">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black rounded-2xl px-4 pt-2 pb-4 space-y-2 mt-2">
          {user?.role === "student" && (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                to="/student-dashboard"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                to="/courses"
              >
                Courses
              </Link>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                to="/admin-dashboard"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                to="/manage-courses"
              >
                Manage Courses
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                to="/view-feedbacks"
              >
                View Feedbacks
              </Link>
            </>
          )}
          {user?.token ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded text-red-400 hover:bg-gray-700 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                to="/"
              >
                Home
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-blue-500 transition"
                to="/login"
              >
                Login
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-green-500 transition"
                to="/register"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
