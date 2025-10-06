import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative rounded-t-4xl   flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      {/* Background gradient / overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 dark:opacity-20"></div>

      <div className="relative z-10 max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200">
          <span className="block mb-2">Student  Feedback  System   </span>
         
          <span className="block mt-2 text-blue-600 relative">
            
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-3/4 left-1/2 transform -translate-x-1/2 h-[0.58em] w-fit fill-pink-400/50"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
          </span>
        </h1>

        {/* Subheading / Description */}
        <p className="mt-10  text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
          Collect, analyze, and improve student learning experiences efficiently. Empower students
          and admins with insightful feedback.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-full hover:bg-yellow-400 transition transform hover:-translate-y-1"
          >
            Get Started
          </Link>
          <Link
            to="/courses"
            className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition transform hover:-translate-y-1"
          >
            View Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
