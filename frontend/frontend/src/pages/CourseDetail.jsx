import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
