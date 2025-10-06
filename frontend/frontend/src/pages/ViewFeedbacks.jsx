import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axiosInstance from "../api/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ViewFeedbacks = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("/feedback/analytics");
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
        Loading feedback analytics...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white    text-black    p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-black">
           Feedback Analytics
        </h2>

        {analytics.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No feedback analytics available yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {analytics.map((c) => {
              // eslint-disable-next-line no-unused-vars
              const totalVotes = Object.values(c.ratingDistribution).reduce(
                (a, b) => a + b,
                0
              );

              const barData = {
                labels: Object.keys(c.ratingDistribution),
                datasets: [
                  {
                    label: "Number of Votes",
                    data: Object.values(c.ratingDistribution),
                    backgroundColor: [
                      "#f87171",
                      "#facc15",
                      "#fbbf24",
                      "#22c55e",
                      "#16a34a",
                    ],
                  },
                ],
              };

              const pieData = {
                labels: Object.keys(c.ratingDistribution),
                datasets: [
                  {
                    data: Object.values(c.ratingDistribution),
                    backgroundColor: [
                      "#f87171",
                      "#facc15",
                      "#fbbf24",
                      "#22c55e",
                      "#16a34a",
                    ],
                  },
                ],
              };

              return (
                <div
                  key={c.courseId}
                  className="bg-white    rounded-2xl p-6 shadow-2xl  shadow-black   hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold text-black   mb-2">
                    {c.courseName}
                  </h3>

                  <p
                    className={`text-sm text-black   rounded-2xl  font-medium mb-4 ${
                      c.avgRating >= 4
                        ? "bg-green-400"
                        : c.avgRating >= 3
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                  >
                    ⭐ Average Rating:{" "}
                    <span className="text-red-600   font-bold">
                      {c.avgRating.toFixed(1)}
                    </span>
                  </p>

                  <div className="mb-4">
                    <h4 className="text-black   font-medium mb-2">
                      Bar Chart - Rating Distribution
                    </h4>
                    <Bar data={barData} options={{ responsive: true }} />
                  </div>

                  <div>
                    <h4 className="text-black    font-medium mb-2">
                      Pie Chart - Rating Distribution
                    </h4>
                    <Pie data={pieData} options={{ responsive: true }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedbacks;
