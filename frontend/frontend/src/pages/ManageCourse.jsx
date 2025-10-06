import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const loadCourses = async () => {
    const res = await axiosInstance.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleAddCourse = async () => {
    try {
      let imageUrl = "";

      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await axiosInstance.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.url; // ✅ backend returns { url }
      }

      await axiosInstance.post("/courses", { ...newCourse, image: imageUrl });
      setNewCourse({ title: "", description: "", image: "" });
      setImageFile(null);
      loadCourses();
    } catch (err) {
      console.error(err);
      alert("Error adding course");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    await axiosInstance.delete(`/courses/${id}`);
    loadCourses();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Courses</h2>

      {/* Add Course Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Add New Course</h3>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
            className="p-2 rounded flex-1 text-black border"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            className="p-2 rounded flex-1 text-black border"
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="p-2 rounded text-black border"
          />
          <button
            onClick={handleAddCourse}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
          >
            Add
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            {course.image ? (
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                {course.description}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
